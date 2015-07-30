<?php
# Include system config file
require '../system/config.php';

session_start();
// Validate a user has logged in
// If not logged in, redirect to the log in page
if(!isset($_SESSION['login_id']))
{
    header('Location:'.$base_path.'');
}
else
{
    # API login Credentials
    $username = $access_user;
    $password = $access_password;

    //HTTP GET request -Using Curl -Response JSON
    if(isset($_GET['dataSet'])&&isset($_GET['period'])&&isset($_GET['orgUnits'])){

        $dataset =$_GET['dataSet'];
        $period = $_GET['period'];
        $orgUnits =$_GET['orgUnits'];
        $reporting_report=array();

        foreach($orgUnits as $orgUnit){

            $satellites=get_satellite_sites($orgUnit);
            if(!is_null($satellites)){
                $reports_expected=sizeof($satellites);

                $count_reported=0;
                $count_not_reported=0;
                $reporting_percentage=0;

                $metadata=array();
                foreach($satellites as $satellite){

                    $url = $dhis_url."/api/dataValueSets?";
                    $data = array("dataSet" => "$dataset","period" => "$period", "orgUnit" => $satellite['facility_id']);
                    $data_string = http_build_query($data);
                    $url.="$data_string";

                    // initailizing curl
                    $ch = curl_init();
                    //curl options
                    curl_setopt($ch, CURLOPT_POST, false);
                    curl_setopt($ch, CURLOPT_URL, $url);
                    curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
                    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
                    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
                    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
                    //execute
                    $result = curl_exec($ch);
                    //close connection
                    curl_close($ch);

                    if ($result){
                        $data=json_decode($result,true);
                        $expected=1;
                        $reported=0;
                        if(isset($data['dataValues'])&&is_array($data['dataValues']))
                        {
                            $reported=1;
                            $count_reported=$count_reported+1;
                        }

                        if(!isset($data['dataValues'])&&is_array($data))
                        {
                            $reported=0;
                            $count_not_reported=$count_not_reported+1;
                        }
                        if($expected==0){
                            $reporting_rate_satellite=0;
                        }
                        else{

                            $reporting_rate_satellite=bcdiv($reported,$expected, 4)*100;
                        }

                        array_push($metadata,array(
                            'satellite'=>$satellite['facility_name'],
                            'expected'=>$expected,
                            'reported'=>$reported,
                            'reporting_rate'=>$reporting_rate_satellite));
                    }
                    else{

                        echo -1;
                    }
                }

                if($reports_expected==0){

                    $reporting_percentage=0;
                }
                else{

                    $reporting_percentage=bcdiv($count_reported,$reports_expected, 4)*100;
                }

                $data=array('orgUnit'=>$orgUnit,
                    'reports'=>$reports_expected,
                    'reported'=>$count_reported,
                    'reporting_rate'=>$reporting_percentage,
                    'metadata'=>$metadata);

                array_push($reporting_report,$data);
            }
        }

        echo json_encode($reporting_report);
    }
    else{

        echo -1;
    }

}

//Function to fetch satellite sites
/**
 * @param $central_id
 * @param $program
 * @return array
 */
function get_satellite_sites($central_id){

    # Include system config file
    require '../system/config.php';

    # Database connection parameters
    $servername = $server;
    $username = $user;
    $authentication = $password;
    $dbname = $database;

    # Create connection
    $conn = new mysqli($servername, $username, $authentication, $dbname);

    # Check connection
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }
    else{

        $program_like="%art%";
        $query ="SELECT program_id FROM programs WHERE program_name like '$program_like'";
        $answer = mysqli_query($conn,$query);
        if($answer) {
            $row = mysqli_fetch_assoc($answer);
            $program = $row['program_id'];
            $classification = "Satellite Site";
            $central_id = $central_id;

            $data = array();
            $facility_data=array();

            $query = "SELECT * FROM satelite_site WHERE central_id='$central_id'";
            $result = mysqli_query($conn,$query);
            if(mysqli_num_rows($result)>0)
            {
                $count = 0;
                while($row = mysqli_fetch_assoc($result))
                {
                    $the_id = $row['satelite_id'];

                    $check_mapping = "SELECT * FROM facility_program_mapping WHERE (facility_id = '$the_id'
                AND program_id = '$program' AND classification = '$classification')";
                    $mapping_response = mysqli_query($conn,$check_mapping);
                    if(mysqli_num_rows($mapping_response)>0)
                    {
                        while($this_row = mysqli_fetch_assoc($mapping_response))
                        {
                            $data[] = $this_row['facility_id'];
                            $count++;
                        }
                    }
                }

                $i=0;
                for($i=0;$i<$count;$i++)
                {
                    $id=$data[$i];
                    $facility_name = "SELECT * FROM facilities WHERE facility_id = '$id'";
                    $response= mysqli_query($conn,$facility_name);
                    if(mysqli_num_rows($response)>0)
                    {
                        while($the_row = mysqli_fetch_assoc($response))
                        {
                            $facility_data[$i]= $the_row;
                        }
                    }

                }

                return $facility_data;
            }
            mysqli_close($conn);
        }

    }

}
?>
