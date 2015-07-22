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

    $org_unit = $_GET['org_unit'];
    $org_unit_level = $_GET['org_unit_level'];

    /*KENYA LEVEL*/
    if($org_unit_level == "national")
    {
        $return="Kenya";
        echo $return;
    }

    /*COUNTY LEVEL*/
    else if($org_unit_level == "county")
    {
        // get the County Name
        $counties_query = "SELECT county_name FROM counties WHERE county_id = '$org_unit'";
        $answer = mysqli_query($conn,$counties_query);
        if($answer){
            $row = mysqli_fetch_assoc($answer);
            $return = (string)$row['county_name'];
            echo $return;
        }
    }
    /*SUB COUNTY LEVEL*/
    else if($org_unit_level == "sub_county")
    {
        // get the sub-county Name
        $sub_counties_query = "SELECT sub_county_name FROM sub_counties WHERE sub_county_id = '$org_unit'";
        $answer = mysqli_query($conn,$sub_counties_query);
        if($answer){
            $row = mysqli_fetch_assoc($answer);
            $return = (string)$row['sub_county_name'];
            echo $return;
        }

    }

    mysqli_close($conn);
}
?>