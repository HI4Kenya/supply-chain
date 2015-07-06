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

    	/*
        NOTES: 4 - Facilities Level
               3 - Sub County Level
               2 - County Level
        */

        $level = $_GET['level'];

        if($level == 4)
        {
            $data = array();
            $number = "SELECT * FROM facilities";
            $result = mysqli_query($conn,$number);
            if(mysqli_num_rows($result)>0)
            {
                while ($row = mysqli_fetch_assoc($result))
                {
                    $data[] = $row;
                }
            }

            $the_data = json_encode($data);
            echo $the_data;
        }

        else if($level == 3)
        {
            $data = array();
            $number = "SELECT * FROM sub_counties";
            $result = mysqli_query($conn,$number);
            if(mysqli_num_rows($result)>0)
            {
                while ($row = mysqli_fetch_assoc($result))
                {
                    $data[] = $row;
                }
            }

            $the_data = json_encode($data);
            echo $the_data;

        }

        else if ($level == 2)
        {
            $data = array();
            $number = "SELECT * FROM counties";
            $result = mysqli_query($conn,$number);
            if(mysqli_num_rows($result)>0)
            {
                while ($row = mysqli_fetch_assoc($result))
                {
                    $data[] = $row;
                }
            }

            $the_data = json_encode($data);
            echo $the_data;

        }

        else if($level = "datasets")
        {
            $data = array();
            $number = "SELECT * FROM dhis_datasets";
            $result = mysqli_query($conn,$number);
            if(mysqli_num_rows($result)>0)
            {
                while ($row = mysqli_fetch_assoc($result))
                {
                    $data[] = $row;
                }
            }

            $the_data = json_encode($data);
            echo $the_data;

        }

        mysqli_close($conn);
    }
?> 