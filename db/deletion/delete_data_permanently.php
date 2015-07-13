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
    	require '../db_auth/db_con.php';

    	$log_id = $_POST['log_id'];

    	$delete_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
		$run_delete_query = mysqli_query($conn,$delete_query);
		if($run_delete_query)
		{
			echo 0;
		}
		else
		{
			echo -1;
		}
    }
?>