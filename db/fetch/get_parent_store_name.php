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

        $satellite_id = $_GET['satellite_store_id'];
        $data = array();
        $facility_data = array();
        $query = "SELECT * FROM satelite_site WHERE satelite_id = '$satellite_id'";
        $result = mysqli_query($conn,$query);
        if(mysqli_num_rows($result)>0)
        {
            $count = 0;
            while($row = mysqli_fetch_assoc($result)) 
            {
                $data[] = $row['central_id'];
                $count++;
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
                        $facility_data[]= $the_row;
                    }
                }
            }
            // Attach the satellite site whose central store (parent) is being returned
            // The satellite site is attached in the last positon of the array so that it is recognizable
            $parent = "SELECT * FROM satelite_site WHERE satelite_id = '$satellite_id'";
            $parent_data= mysqli_query($conn,$parent);
            if(mysqli_num_rows($parent_data)>0)
            {
                while($the_parent = mysqli_fetch_assoc($parent_data)) 
                {
                    $facility_data[$i]= $the_parent;
                }
            }
            $return = json_encode($facility_data);
            echo $return;
        }
    	mysqli_close($conn);
    }
?> 