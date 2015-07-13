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
			    0 - Successful
			   10 - Cannot activate a logged in user
		*/

		require '../db_auth/db_con.php';

		$user_id = $_POST['user'];
		$account_status = "ACTIVE";

		if($user_id == $_SESSION['user_id'])
		{
			echo 10;
		}

		else
		{
			// Date updated
			$date_updated = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
	        // User updating this account
	        $updated_by = $_SESSION["user_id"];

			//activate login account
			$activate_query = "UPDATE login SET account_status = '$account_status', account_status_last_updated = 
			'$date_updated', account_status_updated_by = '$updated_by' WHERE user_id = '$user_id'";
			$run_activate_query = mysqli_query($conn,$activate_query);
			if($run_activate_query)
			{
				echo 0;
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