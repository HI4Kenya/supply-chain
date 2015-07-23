<?php
    /*
    NOTES: MESSAGE CODES
           -1 - Error
            0 - Successful login
            1 - Wrong password
           10 - Account is deactivated
    */
	require '../db_auth/db_con.php';

	$username = $_POST['user'];
	$password = md5($_POST['password']);

    $query = "SELECT * FROM login WHERE username = '$username' AND password = '$password'";
    $result = mysqli_query($conn,$query);
    if(mysqli_num_rows($result)>0)
    {
        // Echo success message
        while($row = mysqli_fetch_assoc($result)) 
        {
            // Check if account is deactivated
            if($row['account_status']=="ACTIVE")
            {
                // Set session
                require 'sess_set.php';

                // Update last login date
                $this_user = $row['user_id'];
                $last_login = date("l")." ".date("Y-m-d")." ".date("h:i:sa");

                $update_last_login = "UPDATE login SET last_login = '$last_login' WHERE
                user_id = '$this_user'";
                $update = mysqli_query($conn,$update_last_login);
                if($update)
                {
                    echo 0;
                }

            }
            else
            {
                // Account is deactivated
                echo 10;
            }
        }
    }

    // User not found or wrong password
    else
    {
        $existing_user_name = "SELECT * FROM login WHERE username = '$username'";
        $user_exists = mysqli_query($conn,$existing_user_name);
        if(mysqli_num_rows($user_exists)>0)
        {
            // Username exists but the password does not match
            echo 1;
        }
        else
        {
            // User does not exist
            echo -1;
        }
    }
    mysqli_close($conn);	
?>