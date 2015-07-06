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

		$employee_id= $_POST['employeeID'];
		$name = str_replace("'", "",$_POST['user_name']);
		$gender = $_POST['user_gender'];
		$email = $_POST['user_email'];
		$phone = $_POST['user_phone'];
		// Date created
		$date_created = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
        // User creating this account
        $created_by = $_SESSION["user_id"];

		//Check if the facility exists
		$exists = "SELECT * FROM users WHERE user_identifier = '$employee_id'";
		$result = mysqli_query($conn,$exists);
		if(mysqli_num_rows($result)>0)
		{
			echo 1;
		}

		else
		{
			$sql = "INSERT INTO users (user_identifier, name, gender, email, mobile_no, date_created, created_by,
			details_last_updated, details_updated_by)
			VALUES ('$employee_id','$name','$gender','$email','$phone', '$date_created', '$created_by',
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