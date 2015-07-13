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
        $classification = $_GET['classification'];
        $data = array();
        $facility_data = array();

        // Select facilities from 
        $query = "SELECT * FROM sub_county_stores";
        $result = mysqli_query($conn,$query);
        if(mysqli_num_rows($result)>0)
        {
            $count = 0;
            while($row = mysqli_fetch_assoc($result)) 
            {
                $data[] = $row['sub_county_store_id'];
                $count++;
            }

            $i=0;
            for($i=0;$i<$count;$i++)
            {
                $id=$data[$i];

                //Check facility program mapping to verify this facility exists in the program
                $site_program_mapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
                AND program_id = '$program' AND classification = '$classification'";
                $program_site_exists = mysqli_query($conn,$site_program_mapping);
                if(mysqli_num_rows($program_site_exists)>0)
                {
                    $facility_name = "SELECT * FROM facilities WHERE facility_id = '$id'";
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
?> 