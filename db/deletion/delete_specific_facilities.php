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
		*/

		require '../db_auth/db_con.php';

		$program_id = $_POST['program_id'];
		$facility_id = $_POST['facility_id'];
		$classification = $_POST['classification'];

		// Delete the mapping of this program and facilities
		$delete_mapping_query = "DELETE FROM facility_program_mapping WHERE facility_id = '$facility_id'
		AND program_id = '$program_id' AND classification = '$classification'";
		$run_mapping_query = mysqli_query($conn,$delete_mapping_query);
		if($run_mapping_query)
		{
			// Successful deletion
			echo 0;

		}
		else
		{
			// Error message
			echo -1;
		}

		mysqli_close($conn);
	}
?> 
