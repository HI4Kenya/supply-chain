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
			    0 - Password updated
		*/

		require '../db_auth/db_con.php';

		$user_id = $_POST['theUser'];

		// Logged in user changing their password
		if($user_id == "LOGGED IN USER")
		{
			$user = $_SESSION["user_id"];
			$password_status = "UPDATED";
		}
		else
		{
			$user = $user_id;
			$password_status = "NEW";
		}

		$password = md5($_POST['password']);

		// Date created
		$date_updated = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
		// Expiry date. After 2 months
        $password_expiry = date('Y-m-d', strtotime("+2 months", strtotime($date_updated)));
        // User creating this account
        $updated_by = $_SESSION["user_id"];

		$updatePassword = "UPDATE login SET password = '$password', password_status = '$password_status',
		password_last_updated = '$date_updated', password_last_updated_by = '$updated_by', 
		password_expiry = '$password_expiry' WHERE user_id = '$user'";
		if(mysqli_query($conn,$updatePassword))
		{
			echo 0;
		}
		else
		{
			echo -1;
		}

		mysqli_close($conn);
	}
?> 