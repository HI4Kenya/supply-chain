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
		$username = str_replace("'", "",$_POST['login_name']);
		$password = md5($_POST['password']);
		$user_role = $_POST['user_role'];
		$user_id= $_POST['user_id'];
		$password_status = "NEW";
		$account_status = "ACTIVE";
		
		// Date created
		$date_created = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
		// Expiry date. After 2 months
        $password_expiry = date('Y-m-d', strtotime("+2 months", strtotime($date_created)));
        // User creating this account
        $created_by = $_SESSION["user_id"];

		//Check if the user exists
		$exists = "SELECT * FROM login WHERE user_id = '$user_id'";
		$result = mysqli_query($conn,$exists);
		if(mysqli_num_rows($result)>0)
		{
			echo 1;
		}

		else
		{
			$sql = "INSERT INTO login (username, password, role, user_id, account_created, account_created_by, 
			details_last_updated, details_last_updated_by, password_expiry, password_status, password_last_updated,
			password_last_updated_by, account_status, account_status_last_updated, account_status_updated_by)
			VALUES ('$username','$password','$user_role','$user_id','$date_created', '$created_by', '$date_created',
			'$created_by', '$password_expiry', '$password_status', '$date_created', '$created_by', '$account_status',
			'$date_created', '$created_by')";

			if (mysqli_query($conn, $sql)) 
			{
			    echo 0;
			} 
			else 
			{
			   	echo -1;
			}

		}

		mysqli_close($conn);
	}
?> 