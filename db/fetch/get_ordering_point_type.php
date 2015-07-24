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

    if(isset($_GET['facility_id'])&&isset($_GET['program_id']))
    {
        $facility_id = $_GET['facility_id'];
        $program_id = $_GET['program_id'];

        $query ="SELECT classification FROM facility_program_mapping WHERE facility_id = '$facility_id' AND program_id = '$program_id'";;
        $answer = mysqli_query($conn,$query);
        if($answer){
            $row = mysqli_fetch_assoc($answer);
            $return = (string)$row['classification'];
            echo $return;
        }
        else{

            echo "Undefined";
        }

    }

    mysqli_close($conn);
}
?>