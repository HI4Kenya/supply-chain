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
    $period = $_GET['period'];
    $orgUnits = $_GET['orgUnits'];
    $dataSet=$_GET['dataSet'];

    $report=array();

    //Data Elements for categories in the fmaps
    $adult_art=["kPUVrR4hLjx","CvOEFjqdGh2","mh8BLhdNzdZ","UQk2hdsxir2","RneKH4t8Hzy","tDjLfAvYqYS","b33NtMTTcC4","EFDEUHkxzKB","TkEY0zNqaYo","snbVXDbpUF0","LJb2HSFIQuU","znYbpnCa6t3","lUS0kJXARKL","IZnj0MXr30T","Xqj87ejoK2r","nWMbhxjbknm","joELlaMQo7j","QFkkTIHbWrD","hDfkoAaboVw","VjmbzaSKx0q","MHuhCGyz7P3"];
    $paediatric_art=["ZZQLLja9m8c","LIYpaaiCoS6","VzegwuXxtNN","ykZAwAFkUEA","BffFPleu7MH","ogRuIwsR0lr","mYkiONvI23L","EZV0Q1fyQFj","oU9OZgMjond","ph0PryLXeCS","r3Kf6sPuDHn","lEzr1gedQGu","r0E8J8KIGZ6","rZLbSmsQqHv","BIwgCP7wtx4","wsCnhc5syHj","YPh9BcoHBg2","WHObTtNPTz4","xXCeXxqiI2P","hD80zz7ynKz","f8KSdSdme6E","jjcgIypy9FA","xRt6IRXbivG","uWbJ9XXlLjh","I06quRMoeEQ"];
    $pmtct_women=["g5QgaRkiKg8","FDPpGRWpkV3","qAj0qKswbHS","U0DL2lUqfaC","LlavjZZJjBW","AoiKY3ozod7","zR8b86x7l6B","geIZzm3VO7q","db4Qxqi0s5U","jNzJ7qvRuzR","Crxn59lWzbm","og5mj1LeGr0","SjEjsaipkXU","HLsMEHL1IGJ","G7DrnEsuRj9","S7uMA5RTk07","w8ERj0ZHO7A"];
    $pep_adults=["aHIBeT6B2Ur","rG8hRyaNhs5","lxMlZNqu9sr","vhJCIrppEXK","u72zpZXXK0u"];
    $pep_children=["pH3vWHFUsw1","WtPR96wMbPP","VKXBk9e5xyx"];
    $universal_prophylaxis=["YhbOpqt259d","TYMEDvibXVr","KdHTK5xeYXx","OYM1kxmXrSa"];
    $ipt=["NVoegMliKZ8","Y6jYqmO8xmN"];
    $diflucan_donation=["Orw6vLQQlNI","bYf0JZfBkoU","YdaFnP7rjcf","kz7vSNfh6xL","fiZfUd3ognF","NOUjq4bav6e"];

    foreach($orgUnits as $orgUnit){

        $sum_adult_art=0;
        $sum_paediatric_art=0;
        $sum_pep_adults=0;
        $sum_diflucan_donation=0;
        $sum_pmtct_women=0;
        $sum_ipt=0;
        $sum_pep_children=0;
        $sum_universal_prophylaxis=0;

        $url = $dhis_url."/api/dataValueSets?";

        $data = array("dataSet" => "$dataSet", "period" => "$period", "orgUnit" => "$orgUnit");
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
        $result=json_decode($result,true);

        if (array_key_exists('dataValues', $result)){

            $data_values=$result["dataValues"];

            foreach ($data_values as $data_value){

                if (in_array($data_value["dataElement"], $adult_art)) {
                    $sum_adult_art=$sum_adult_art+intval($data_value["value"]);
                }

                if (in_array($data_value["dataElement"], $paediatric_art)) {
                    $sum_paediatric_art=$sum_paediatric_art+intval($data_value["value"]);
                }

                if (in_array($data_value["dataElement"], $pep_adults)) {
                    $sum_pep_adults=$sum_pep_adults+intval($data_value["value"]);
                }

                if (in_array($data_value["dataElement"], $pep_children)) {
                    $sum_pep_children=$sum_pep_children+intval($data_value["value"]);
                }

                if (in_array($data_value["dataElement"], $pmtct_women)) {
                    $sum_pmtct_women=$sum_pmtct_women+intval($data_value["value"]);
                }
                if (in_array($data_value["dataElement"], $universal_prophylaxis)) {
                    $sum_universal_prophylaxis=$sum_universal_prophylaxis+intval($data_value["value"]);
                }

                if (in_array($data_value["dataElement"], $ipt)) {
                    $sum_ipt=$sum_ipt+intval($data_value["value"]);
                }

                if (in_array($data_value["dataElement"], $diflucan_donation)) {
                    $sum_diflucan_donation=$sum_diflucan_donation+intval($data_value["value"]);
                }
            }

        }
        else{
            //Do Nothing
        }

        $data=array(
            'orgUnit'=>$orgUnit,
            'data'=>array(
                'adult_art'=>$sum_adult_art,
                'paediatric_art'=>$sum_paediatric_art,
                'pmtct_women'=>$sum_pmtct_women,
                'pep_children'=>$sum_pep_children,
                'pep_adults'=>$sum_pep_adults,
                'universal_prophylaxis'=>$sum_universal_prophylaxis,
                'ipt'=>$sum_ipt,
                'diflucan_donation'=>$sum_diflucan_donation)
            );

        array_push($report,$data);
    }

    echo json_encode($report);



}

?>
