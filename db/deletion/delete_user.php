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
		/*
		NOTES: MESSAGE CODES
			   -1 - Error
			    0 - Successful deletion
			   10 - Cannot delete a logged in user
			   
			   ORDER OF DELETION
			   Table login
			   Table users
		*/

		require '../db_auth/db_con.php';

		$user_id = $_POST['user'];

		if($user_id == $_SESSION['user_id'])
		{
			echo 10;
		}

		else
		{
			// Delete from login
			$delete_login_credentials_query = "DELETE FROM login WHERE user_id = '$user_id'";
			$run_delete_login_credentials_query = mysqli_query($conn,$delete_login_credentials_query);
			if($run_delete_login_credentials_query)
			{
				// Delete from table users
				$delete_user_query = "DELETE FROM users WHERE user_identifier = '$user_id'";
				$run_delete_user_query = mysqli_query($conn,$delete_user_query);
				if($run_delete_user_query)
				{
					// Successful deletion
					echo 0;
				}
				else
				{
					// Error message
					echo -1;
				}

			}
			else
			{
				// Error message
				echo -1;
			}

		}

		mysqli_close($conn);
	}
?> 