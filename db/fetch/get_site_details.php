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

        $facility_id = $_GET['facility'];
        $program = $_GET['program_id'];
        $type = $_GET['type'];

        $data = array();

        if($type == "Ordering Points")
        {
            $this_facility = "SELECT * FROM facility_program_mapping WHERE facility_id = '$facility_id' AND program_id = '$program'";
            $this_facility_result = mysqli_query($conn,$this_facility);
            if(mysqli_num_rows($this_facility_result)>0)
            {
                while($row = mysqli_fetch_assoc($this_facility_result)) 
                {
                    if($row['classification'] != "Satellite Site")
                    {
                        $data[] = $row['classification'];
                    }
                }
            }
            /*SUB_COUNTYSSS*/
            $sub_county = "SELECT * FROM facilities WHERE facility_id = '$facility_id'";
            $sub_county_result = mysqli_query($conn,$sub_county);
            if(mysqli_num_rows($sub_county_result)>0)
            {
                while($sub_county_row = mysqli_fetch_assoc($sub_county_result)) 
                {
                    $sub_county_id = $sub_county_row['parent_id'];

                    $sub_county_name = "SELECT * FROM sub_counties WHERE sub_county_id = '$sub_county_id'";
                    $sub_county_name_result = mysqli_query($conn,$sub_county_name);
                    if(mysqli_num_rows($sub_county_name_result)>0)
                    {
                        while($name_row = mysqli_fetch_assoc($sub_county_name_result))
                        {
                            $data[] = $name_row['sub_county_name'];

                            $parent_county = $name_row['parent_id'];

                            /*COUNTY*/
                            $county_name = "SELECT * FROM counties WHERE county_id = '$parent_county'";
                            $county_name_result = mysqli_query($conn, $county_name);
                            if(mysqli_num_rows($county_name_result)>0)
                            {
                                while($county_name_row = mysqli_fetch_assoc($county_name_result))
                                {
                                    $data[] = $county_name_row['county_name'];
                                }
                            }
                        }
                    }
                }
            }

            // Facility ID
            $data[] = $facility_id;

            $return = json_encode($data);
            echo $return;
        }

        else if($type == "Service Points")
        {
            $this_facility = "SELECT * FROM facility_program_mapping WHERE facility_id = '$facility_id' AND program_id = '$program'";
            $this_facility_result = mysqli_query($conn,$this_facility);
            if(mysqli_num_rows($this_facility_result)>0)
            {
                if(mysqli_num_rows($this_facility_result) == 2)
                {
                    $data[] = "Dispensing Point";
                }
                else
                {
                    while($row = mysqli_fetch_assoc($this_facility_result)) 
                    {                    
                        $data[] = $row['classification'];
                    }
                }
            }
            /*SUB_COUNTYSSS*/
            $sub_county = "SELECT * FROM facilities WHERE facility_id = '$facility_id'";
            $sub_county_result = mysqli_query($conn,$sub_county);
            if(mysqli_num_rows($sub_county_result)>0)
            {
                while($sub_county_row = mysqli_fetch_assoc($sub_county_result)) 
                {
                    $sub_county_id = $sub_county_row['parent_id'];

                    $sub_county_name = "SELECT * FROM sub_counties WHERE sub_county_id = '$sub_county_id'";
                    $sub_county_name_result = mysqli_query($conn,$sub_county_name);
                    if(mysqli_num_rows($sub_county_name_result)>0)
                    {
                        while($name_row = mysqli_fetch_assoc($sub_county_name_result))
                        {
                            $data[] = $name_row['sub_county_name'];

                            $parent_county = $name_row['parent_id'];

                            /*COUNTY*/
                            $county_name = "SELECT * FROM counties WHERE county_id = '$parent_county'";
                            $county_name_result = mysqli_query($conn, $county_name);
                            if(mysqli_num_rows($county_name_result)>0)
                            {
                                while($county_name_row = mysqli_fetch_assoc($county_name_result))
                                {
                                    $data[] = $county_name_row['county_name'];
                                }
                            }
                        }
                    }
                }
            }

            // Facility ID
            $data[] = $facility_id;

            $return = json_encode($data);
            echo $return;

        }

        mysqli_close($conn);

    }
?> 