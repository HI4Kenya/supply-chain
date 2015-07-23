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

        $program = $_GET['program_id'];
        $org_unit = $_GET['org_unit'];
        $org_unit_level = $_GET['org_unit_level'];

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
            $scs_count = 0;
            $cs_count = 0;
            $sa_count = 0;

            for($i=0;$i<$count;$i++)
            {
                $parent_id = $sc_id[$i];

                // Sub-County Stores
                $sub_county_stores = "SELECT * FROM facility_program_mapping WHERE classification = 'Sub-County Store'
                AND program_id = '$program'";
                $sub_county_stores_response = mysqli_query($conn,$sub_county_stores);
                if(mysqli_num_rows($sub_county_stores_response)>0)
                {
                    while($row = mysqli_fetch_assoc($sub_county_stores_response))
                    {
                        $id = $row['facility_id'];

                        $facility_name = "SELECT * FROM facilities WHERE facility_id = '$id' AND parent_id = 
                        '$parent_id' ORDER BY facility_name";
                        $response= mysqli_query($conn,$facility_name);
                        if(mysqli_num_rows($response)>0)
                        {
                            // Number of sub-county stores
                            $scs_count++;
                        }
                    }
                }
                //var_dump($facility_data);


                // Central Sites
                $central_sites = "SELECT * FROM facility_program_mapping WHERE classification = 'Central Site'
                AND program_id = '$program'";
                $central_sites_response = mysqli_query($conn,$central_sites);
                if(mysqli_num_rows($central_sites_response)>0)
                {
                    while($row = mysqli_fetch_assoc($central_sites_response))
                    {
                        $id = $row['facility_id'];

                        $facility_name = "SELECT * FROM facilities WHERE facility_id = '$id' AND parent_id = 
                        '$parent_id' ORDER BY facility_name";
                        $response= mysqli_query($conn,$facility_name);
                        if(mysqli_num_rows($response)>0)
                        {
                            // Number of sub-county stores
                            $cs_count++;
                        }
                    }
                }

                // StandAlone Sites
                $standalone_sites = "SELECT * FROM facility_program_mapping WHERE classification = 'StandAlone'
                AND program_id = '$program'";
                $standalone_sites_response = mysqli_query($conn,$standalone_sites);
                if(mysqli_num_rows($standalone_sites_response)>0)
                {
                    while($row = mysqli_fetch_assoc($standalone_sites_response))
                    {
                        $id = $row['facility_id'];

                        $facility_name = "SELECT * FROM facilities WHERE facility_id = '$id' AND parent_id = 
                        '$parent_id' ORDER BY facility_name";
                        $response= mysqli_query($conn,$facility_name);
                        if(mysqli_num_rows($response)>0)
                        {
                            // Number of sub-county stores
                            $sa_count++;
                        }
                    }
                }
            }

            // Sub-county stores
            $facility_data[] = $scs_count;

            // Central Sites
            $facility_data[] = $cs_count;

            // StandAlone sites
            $facility_data[] = $sa_count;

            // Total
            $Total = $scs_count+$cs_count+$sa_count;
            $facility_data[] = $Total;

            // County ID
            $facility_data[] = $org_unit;
            
            $return = json_encode($facility_data);
            echo $return;
        }
    }
?> 