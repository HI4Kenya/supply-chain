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

        $program = $_GET['program'];
        $data = array();
        $programs = "SELECT * FROM programs WHERE program_id = '$program'";
        $result = mysqli_query($conn,$programs);
        if(mysqli_num_rows($result)>0)
        {
            while($row = mysqli_fetch_assoc($result)) 
            {
                $data[] = $row;
            }
            $return = json_encode($data);
            echo $return;
        }
    	mysqli_close($conn);
    }
?> 