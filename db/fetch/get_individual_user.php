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

        $user = $_GET['user'];
        $data = array();
        $users = "SELECT * FROM users WHERE user_identifier = '$user'";
        $result = mysqli_query($conn,$users);
        if(mysqli_num_rows($result)>0)
        {
            while($row = mysqli_fetch_assoc($result)) 
            {
                $data[] = $row;
            }

            $login_details = "SELECT * FROM login WHERE user_id = '$user'";
            $response = mysqli_query($conn,$login_details);
            if(mysqli_num_rows($response)>0)
            {
                while($the_row = mysqli_fetch_assoc($response)) 
                {
                    $data[] = $the_row;
                }
            }
            
            $return = json_encode($data);
            echo $return;
        }
        mysqli_close($conn);

    }
?> 