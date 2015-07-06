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
			   
			   ORDER OF DELETION
			   Table datasets
			   Table facility_program_mapping
			   Table programs
		*/

		require '../db_auth/db_con.php';

		$program_id = $_POST['program_id'];

		// Delete datasets first
		$delete_datasets_query = "DELETE FROM datasets WHERE program_id = '$program_id'";
		$run_datasets_query = mysqli_query($conn,$delete_datasets_query);
		if($run_datasets_query)
		{
			// Delete the mapping of this program and facilities
			$delete_mapping_query = "DELETE FROM facility_program_mapping WHERE program_id = '$program_id'";
			$run_mapping_query = mysqli_query($conn,$delete_mapping_query);
			if($run_mapping_query)
			{
				// Delete the program
				$delete_program_query = "DELETE FROM programs WHERE program_id = '$program_id'";
				$run_program_query = mysqli_query($conn,$delete_program_query);
				if($run_program_query)
				{
					// Successful deletion
					echo 0;
				}
				else
				{
					echo -1;
				}
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

		mysqli_close($conn);
	}
?> 