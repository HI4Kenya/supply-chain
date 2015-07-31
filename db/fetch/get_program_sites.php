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

        //Program ID
        $program = $_GET['program_id'];
        $data = array();
        $facility_data = array();

        //Check facility program mapping to verify this facility exists in the program
        $site_program_mapping = "SELECT * FROM facility_program_mapping WHERE program_id = '$program'";
        $program_site_exists = mysqli_query($conn,$site_program_mapping);
        if(mysqli_num_rows($program_site_exists)>0)
        {
            while($the_row = mysqli_fetch_assoc($program_site_exists)) 
            {
                $facility_data[]= $the_row['facility_id'];
            }
        }

        $return = json_encode($facility_data);
        echo $return;

    	mysqli_close($conn);
    }
?> 