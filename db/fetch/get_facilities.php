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
        NOTES: ORG. LEVELS
        4 - Facility level
        3 - Sub-County Level
        2 - County level
        1 - Kenya

        */
        $id = $_GET['id'];
        $org_level = $_GET['type'];

        //Facility Level
        if($org_level==4)
        {
            $data = array();
            $facilities = "SELECT * FROM facilities WHERE facility_id='$id' ORDER BY facility_name";
            $result = mysqli_query($conn,$facilities);
            if(mysqli_num_rows($result)>0)
            {
                while($row = mysqli_fetch_assoc($result)) 
                {
                    $data[] = $row;
                }
                $return = json_encode($data);
                echo $return;
            }
        }

        //Sub-County Level
        else if($org_level==3)
        {
            $data = array();
            $facilities = "SELECT * FROM facilities WHERE parent_id='$id' ORDER BY facility_name";
            $result = mysqli_query($conn,$facilities);
            if(mysqli_num_rows($result)>0)
            {
                while($row = mysqli_fetch_assoc($result)) 
                {
                    $data[] = $row;
                }
                $return = json_encode($data);
                echo $return;
            }

        }

        //County Level
        else if($org_level==2)
        {
            $data = array();
            // Fetch all sub counties whose parent are the current county
            $sub_counties_query = "SELECT * FROM sub_counties WHERE parent_id = '$id'";
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
                for($i=0;$i<$count;$i++)
                {
                    $parent_id = $sc_id[$i];
                    // Fetch all the facilities for the identified sub-counties
                    $facilities_query = "SELECT * FROM facilities WHERE parent_id = '$parent_id' ORDER BY facility_name";
                    $result = mysqli_query($conn,$facilities_query);
                    if(mysqli_num_rows($result)>0)
                    {
                        while($the_row = mysqli_fetch_assoc($result))
                        {
                            $data[] = $the_row;
                        }
                    }
                }
                $return = json_encode($data);
                echo $return;
            }
        }

        //Country Level (Kenya)
        else if($org_level==1)
        {
            $data = array();
            //For testing purposes : WHERE parent_id = 'NHRktMsAkO1'
            $facilities = "SELECT * FROM facilities WHERE parent_id = 'NHRktMsAkO1' ORDER BY facility_name ";
            $result = mysqli_query($conn,$facilities);
            if(mysqli_num_rows($result)>0)
            {
                while($row = mysqli_fetch_assoc($result)) 
                {
                    $data[] = $row;
                }
                $return = json_encode($data);
                echo $return;
            }

        }
    	mysqli_close($conn);
    }
?> 