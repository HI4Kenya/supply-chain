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
        Get the Central Sites their Satellite Sites and the StandAlone sites for the passed program
        */

        $program = $_GET['program'];
        $classification = $_GET['classification'];
        $central_id = $_GET['central_id'];

        // Central Sites
        if($classification == "Central Site")
        {
            $data = array();
            $facility_data = array();
            $query = "SELECT * FROM central_site";
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
                $number = 0;
                for($i=0;$i<$count;$i++)
                {
                    $id=$data[$i];  
                    $check_mapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
                    AND program_id = '$program' AND classification = '$classification'";
                    $mapping_response = mysqli_query($conn,$check_mapping);
                    if(mysqli_num_rows($mapping_response)>0)
                    {
                        $facility_name = "SELECT * FROM facilities WHERE facility_id = '$id'";
                        $response= mysqli_query($conn,$facility_name);
                        if(mysqli_num_rows($response)>0)
                        {
                            while($the_row = mysqli_fetch_assoc($response)) 
                            {
                                $facility_data[]= $the_row;
                                $number++;
                            }
                        }

                    }
                }
                // Append the program
                $programs = "SELECT * FROM programs WHERE program_id = '$program'";
                $result = mysqli_query($conn,$programs);
                if(mysqli_num_rows($result)>0)
                {
                    while($row = mysqli_fetch_assoc($result)) 
                    {
                        $facility_data[$number] = $row;
                    }
                }
                $return = json_encode($facility_data);
                echo $return;
            }

        }

        // Satellite Sites
        else if($classification == "Satellite Site")
        {
            $data = array();
            $facility_data = array();
            $query = "SELECT * FROM satelite_site WHERE central_id='$central_id'";
            $result = mysqli_query($conn,$query);
            if(mysqli_num_rows($result)>0)
            {
                $count = 0;
                while($row = mysqli_fetch_assoc($result)) 
                {
                    $the_id = $row['satelite_id'];

                    $check_mapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$the_id'
                    AND program_id = '$program' AND classification = '$classification'";
                    $mapping_response = mysqli_query($conn,$check_mapping);
                    if(mysqli_num_rows($mapping_response)>0)
                    {
                        while($this_row = mysqli_fetch_assoc($mapping_response))
                        {
                            $data[] = $this_row['facility_id'];
                            $count++; 
                        }
                    }
                }

                // Get details of the satellite site
                $i=0;
                $number=0;
                for($i=0;$i<$count;$i++)
                {
                    $id=$data[$i];            
                    $facility_name = "SELECT * FROM facilities WHERE facility_id = '$id'";
                    $response= mysqli_query($conn,$facility_name);
                    if(mysqli_num_rows($response)>0)
                    {
                        while($the_row = mysqli_fetch_assoc($response)) 
                        {
                            $facility_data[$i]= $the_row;
                            $number++;
                        }
                    }

                }
                // Attach the central store whose satellites are being returned
                // The parent central store is attached in the last positon of the array so that it is recognizable
                $parent = "SELECT * FROM facilities WHERE facility_id = '$central_id'";
                $parent_data= mysqli_query($conn,$parent);
                if(mysqli_num_rows($parent_data)>0)
                {
                    while($the_parent = mysqli_fetch_assoc($parent_data)) 
                    {
                        $facility_data[$number]= $the_parent;
                    }
                }

                // Append the program
                $programs = "SELECT * FROM programs WHERE program_id = '$program'";
                $result = mysqli_query($conn,$programs);
                if(mysqli_num_rows($result)>0)
                {
                    while($row = mysqli_fetch_assoc($result)) 
                    {
                        $facility_data[$number+1] = $row;
                    }
                }
                // Return the entire array with both satellite sites and their parent (central store details)
                $return = json_encode($facility_data);
                echo $return;
            }
            
        }

        // StandAlone Sites
        else if($classification == "StandAlone")
        {
            $data = array();
            $facility_data = array();
            $query = "SELECT * FROM standalone_site";
            $result = mysqli_query($conn,$query);
            if(mysqli_num_rows($result)>0)
            {
                $count = 0;
                while($row = mysqli_fetch_assoc($result)) 
                {
                    $data[] = $row['standalone_id'];
                    $count++;
                }

                $i=0;
                $number = 0;
                for($i=0;$i<$count;$i++)
                {
                    $id=$data[$i];  
                    $check_mapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
                    AND program_id = '$program' AND classification = '$classification'";
                    $mapping_response = mysqli_query($conn,$check_mapping);
                    if(mysqli_num_rows($mapping_response)>0)
                    {
                        $facility_name = "SELECT * FROM facilities WHERE facility_id = '$id'";
                        $response= mysqli_query($conn,$facility_name);
                        if(mysqli_num_rows($response)>0)
                        {
                            while($the_row = mysqli_fetch_assoc($response)) 
                            {
                                $facility_data[]= $the_row;
                                $number++;
                            }
                        }

                    }
                }
                // Append the program
                $programs = "SELECT * FROM programs WHERE program_id = '$program'";
                $result = mysqli_query($conn,$programs);
                if(mysqli_num_rows($result)>0)
                {
                    while($row = mysqli_fetch_assoc($result)) 
                    {
                        $facility_data[$number] = $row;
                    }
                }
                $return = json_encode($facility_data);
                echo $return;
            }

        }

    	mysqli_close($conn);
    }
?> 