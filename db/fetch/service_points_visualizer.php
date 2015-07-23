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

        $program = 1;

        $facility_data = array();

        $counties = "SELECT * FROM counties ORDER BY county_name";
        $result = mysqli_query($conn,$counties);
        if(mysqli_num_rows($result)>0)
        {
            while($the_row = mysqli_fetch_assoc($result)) 
            {
                $org_unit = $the_row['county_id'];

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
                    $dp_count = 0;
                    $ss_count = 0;
                    $sa_count = 0;

                    for($i=0;$i<$count;$i++)
                    {
                        $parent_id = $sc_id[$i];

                        // Dispensing points
                        $central_sites = "SELECT * FROM facility_program_mapping WHERE classification = 'Satellite Site'
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
                                    // determine whether its a dispensing point
                                    $dispensing_point = "SELECT * FROM satelite_site WHERE satelite_id = '$id' AND central_id = '$id'";
                                    $dp_response = mysqli_query($conn,$dispensing_point);
                                    if(mysqli_num_rows($dp_response)>0)
                                    {
                                        // Number of dispensing points
                                        $dp_count++;
                                    }
                                }
                            }
                        }

                        // Satellite Sites
                        $central_sites = "SELECT * FROM facility_program_mapping WHERE classification = 'Satellite Site'
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
                                    // Total of all facilites marked satellites.
                                    // Includes even dispensing points above so we'll have to differentiate
                                    $ss_count++;
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
                }
                 /*Get the number of actual satellites
                Dispensing points - All Satellites*/
                $real_satellites = $ss_count-$dp_count;

                // Total
                $Total = $dp_count+$real_satellites+$sa_count;
                
                $data= array('y' => $the_row['county_name'],'a'=>$Total);
                array_push($facility_data, $data);
            }
                    
            $return = json_encode($facility_data);
            echo $return;
        }
        mysqli_close($conn);

    }
?> 