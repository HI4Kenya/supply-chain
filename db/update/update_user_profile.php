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

		$update_type = $_POST['update'];

		if($update_type == "User Update")
		{
			$user_id = $_POST['user'];
			$name = str_replace("'", "",$_POST['user_name']);
			$username = str_replace("'", "",$_POST['login_name']);
			$email = $_POST['user_email'];
			$phone = $_POST['user_phone'];

			// Date updated
			$date_updated = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
	        // User updating this account
	        $updated_by = $_SESSION["user_id"];

	        // Check for changes
	        $users = "SELECT * FROM users WHERE user_identifier = '$user_id'";
	        $result = mysqli_query($conn,$users);
	        if(mysqli_num_rows($result)>0)
	        {
	            while($row = mysqli_fetch_assoc($result)) 
	            {
	                $name_of_user = $row['name'];
	                $email_of_user = $row['email'];
	                $phone_of_user = $row['mobile_no'];
	            }

	            $login_details = "SELECT * FROM login WHERE user_id = '$user_id'";
	            $response = mysqli_query($conn,$login_details);
	            if(mysqli_num_rows($response)>0)
	            {
	                while($the_row = mysqli_fetch_assoc($response)) 
	                {
	                    $username_of_user = $the_row['username'];
	                }
	            }
	        }

	        if(($name == $name_of_user)&&($username == $username_of_user)&&($email == $email_of_user)&&($phone == $phone_of_user))
	        {
	        	echo 10;
	        }
	        else
	        {
	        	if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) 
	        	{
				  	echo 12;
				} 
				else 
				{
					if(!(preg_match('/^0\d{9}$/', $test)))
					{
						echo 13;
					}
					else
					{
						$updateProfile = "UPDATE users SET name = '$name', email = '$email', mobile_no = '$phone', 
				        details_last_updated = '$date_updated ', details_updated_by = '$updated_by'
				        WHERE user_identifier = '$user_id'";
						if(mysqli_query($conn,$updateProfile))
						{
							$updateUserName = "UPDATE login SET username = '$username', details_last_updated = '$date_updated',
							details_last_updated_by = '$updated_by'	WHERE user_id = '$user_id'";
							if(mysqli_query($conn,$updateUserName))
							{
								// Reset user session
								$query = "SELECT * FROM login WHERE user_id = '$user_id'";
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
							                require '../user_auth/sess_set.php';
							            }
							        }
							    }
								echo 0;
							}

							else
							{
								echo -1;
							}

						}
						
						else
						{
							echo -1;
						}
					}
				  
				}
	        }

		}

		else if($update_type == "Admin Edit")
		{
			$user_id = $_POST['user'];
			$name = str_replace("'", "",$_POST['user_name']);
			$username = str_replace("'", "",$_POST['login_name']);
			$gender = $_POST['user_gender'];
			$email = $_POST['user_email'];
			$phone = $_POST['user_phone'];
			$role = $_POST['user_role'];

			// Date created
			$date_updated = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
	        // User creating this account
	        $updated_by = $_SESSION["user_id"];

	        // Check for changes
	        $users = "SELECT * FROM users WHERE user_identifier = '$user_id'";
	        $result = mysqli_query($conn,$users);
	        if(mysqli_num_rows($result)>0)
	        {
	            while($row = mysqli_fetch_assoc($result)) 
	            {
	                $name_of_user = $row['name'];
	                $email_of_user = $row['email'];
	                $phone_of_user = $row['mobile_no'];
	                $gender_of_user = $row['gender'];
	            }

	            $login_details = "SELECT * FROM login WHERE user_id = '$user_id'";
	            $response = mysqli_query($conn,$login_details);
	            if(mysqli_num_rows($response)>0)
	            {
	                while($the_row = mysqli_fetch_assoc($response)) 
	                {
	                    $username_of_user = $the_row['username'];
	                    $role_of_user = $the_row['role'];
	                }
	            }
	        }

	        if(($name == $name_of_user)&&($username == $username_of_user)&&($email == $email_of_user)&&($phone == $phone_of_user)&&($gender == $gender_of_user)&&($role == $role_of_user))
	        {
	        	echo 10;
	        }
	        else
	        {
	        	if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) 
	        	{
				  	echo 12;
				} 
				else 
				{
					if(!(preg_match('/^0\d{9}$/', $test)))
					{
						echo 13;
					}
					else
					{
						$updateProfile = "UPDATE users SET name = '$name', gender = '$gender', email = '$email', mobile_no = '$phone', 
				        details_last_updated = '$date_updated ', details_updated_by = '$updated_by'
				        WHERE user_identifier = '$user_id'";
						if(mysqli_query($conn,$updateProfile))
						{
							$updateUserName = "UPDATE login SET username = '$username', role = '$role', details_last_updated = '$date_updated',
							details_last_updated_by = '$updated_by'	WHERE user_id = '$user_id'";
							if(mysqli_query($conn,$updateUserName))
							{

								echo 0;
							}

							else
							{
								echo -1;
							}

						}
						
						else
						{
							echo -1;
						}
					}
				}
	        }
		}

		mysqli_close($conn);
	}
?> 