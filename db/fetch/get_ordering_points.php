<?php
// Require system config file
require '../../system/config.php';

session_start();
// Validate a user has logged in
// If not logged in, redirect to the log in page
if(!isset($_SESSION['login_id']))
{
    header('Location:../../');
}
else
{
    // If user has logged in
    require '../db_auth/db_con.php';

    //$program =$_GET['program_id'];
    $org_unit = $_GET['org_unit'];
    $org_unit_level = $_GET['org_unit_level'];
    $program_like="%art%";

    $data = array();
    $facility_data = array();
//    SELECT program_id FROM `programs` WHERE program_name like "%art%"
    $query ="SELECT program_id FROM programs WHERE program_name like '$program_like'";
    $answer = mysqli_query($conn,$query);
    if($answer){
        $row = mysqli_fetch_assoc($answer);
        $program =$row['program_id'];

        /*KENYA LEVEL*/
        if($org_unit_level == "national")
        {
            $sites = "SELECT * FROM facility_program_mapping WHERE (classification = 'Central Site'
            OR classification = 'Sub-County Store') AND program_id = '$program'";
            $sites_response = mysqli_query($conn,$sites);
            if(mysqli_num_rows($sites_response)>0)
            {
                while($row = mysqli_fetch_assoc($sites_response))
                {
                    $id = $row['facility_id'];

                    $facility_name = "SELECT * FROM facilities WHERE facility_id = '$id' ORDER BY facility_name";
                    $response= mysqli_query($conn,$facility_name);
                    if(mysqli_num_rows($response)>0)
                    {
                        while($the_row = mysqli_fetch_assoc($response))
                        {
                            $facility_data[]= $the_row;
                        }
                    }
                }
            }
            $return = json_encode($facility_data);
            echo $return;

        }

        /*COUNTY LEVEL*/
        else if($org_unit_level == "county")
        {
            // Fetch all sub counties whose parent are the current county
            $sub_counties_query = "SELECT * FROM sub_counties WHERE parent_id = '$org_unit'";
            $answer = mysqli_query($conn,$sub_counties_query);
            if(mysqli_num_rows($answer)>0)
            {
                $sc_id = array();
                $count = 0;
                while($row = mysqli_fetch_assoc($answer))
                {
                    $sc_id[] = $row['sub_county_id'];
                    $count = $count+1;
                }

                $i=0;
                for($i=0;$i<$count;$i++)
                {
                    $parent_id = $sc_id[$i];
                    $sites = "SELECT * FROM facility_program_mapping WHERE (classification = 'Central Site'
                    OR classification = 'Sub-County Store') AND program_id = '$program'";
                    $sites_response = mysqli_query($conn,$sites);
                    if(mysqli_num_rows($sites_response)>0)
                    {
                        while($row = mysqli_fetch_assoc($sites_response))
                        {
                            $id = $row['facility_id'];

                            $facility_name = "SELECT * FROM facilities WHERE facility_id = '$id' AND parent_id =
                            '$parent_id' ORDER BY facility_name";
                            $response= mysqli_query($conn,$facility_name);
                            if(mysqli_num_rows($response)>0)
                            {
                                while($the_row = mysqli_fetch_assoc($response))
                                {
                                    $facility_data[]= $the_row;
                                }
                            }
                        }
                    }
                }
                $return = json_encode($facility_data);
                echo $return;
            }

        }
        /*SUB COUNTY LEVEL*/
        else if($org_unit_level == "sub_county")
        {
            $sites = "SELECT * FROM facility_program_mapping WHERE (classification = 'Central Site'
            OR  classification = 'Sub-County Store') AND program_id = '$program'";
            $sites_response = mysqli_query($conn,$sites);
            if(mysqli_num_rows($sites_response)>0)
            {
                while($row = mysqli_fetch_assoc($sites_response))
                {
                    $id = $row['facility_id'];

                    $facility_name = "SELECT * FROM facilities WHERE facility_id = '$id' AND parent_id = '$org_unit'
                    ORDER BY facility_name";
                    $response= mysqli_query($conn,$facility_name);
                    if(mysqli_num_rows($response)>0)
                    {
                        while($the_row = mysqli_fetch_assoc($response))
                        {
                            $facility_data[]= $the_row;
                        }
                    }
                }
            }
            $return = json_encode($facility_data);
            echo $return;

        }

        mysqli_close($conn);

    }
}
?>