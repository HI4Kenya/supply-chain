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
			    0 - Program Name and Datasets Updated
			    1 - Program Name Updated
			   10 - Program datasets updated
		*/

		require '../db_auth/db_con.php';
		$program_dataset = array();
		$program_id = $_POST['program_id'];
		$program_name = str_replace("'", "",$_POST['program_name']);
		$program_dataset = $_POST['program_datasetID'];

		// Date updated
		$date_updated = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
        // User updating this account
        $updated_by = $_SESSION["user_id"];

		if($program_name == "")
		{
			// No changes on the name of the program
			// Update only the datasets

			// Delete the existing datasets first, then update
			$delete_datasets_query = "DELETE FROM datasets WHERE program_id = '$program_id'";
			$run_datasets_query = mysqli_query($conn,$delete_datasets_query);
			if($run_datasets_query)
			{
				// Reset the AI of this table
				$reset_ai = "ALTER TABLE datasets AUTO_INCREMENT = 1";
				mysqli_query($conn,$reset_ai);

				foreach ($program_dataset as $dataset_to_update) 
				{
		        	// Insert this new dataset
		        	$insert_dataset = "INSERT INTO datasets(dataset_id,program_id,created_on,created_by)
					VALUES ('$dataset_to_update','$program_id', '$date_updated', '$updated_by')";
					mysqli_query($conn, $insert_dataset);
				}

				echo 10;
			}
			else
			{
				echo -1;
			}

		}

		else
		{
			// Delete the existing datasets first, then update
			$delete_datasets_query = "DELETE FROM datasets WHERE program_id = '$program_id'";
			$run_datasets_query = mysqli_query($conn,$delete_datasets_query);
			if($run_datasets_query)
			{
				// Changes on the program name
				$updateProgramName = "UPDATE programs SET program_name = '$program_name', date_updated = '$date_updated',
				updated_by = '$updated_by' WHERE program_id = '$program_id'";
				if(mysqli_query($conn,$updateProgramName))
				{
					// Reset the AI of this table
					$reset_ai = "ALTER TABLE datasets AUTO_INCREMENT = 1";
					mysqli_query($conn,$reset_ai);

					foreach ($program_dataset as $dataset_to_update) 
					{
						// Insert this new dataset
			        	$insert_dataset = "INSERT INTO datasets(dataset_id,program_id,created_on,created_by)
						VALUES ('$dataset_to_update','$program_id', '$date_updated', '$updated_by')";
						mysqli_query($conn, $insert_dataset);
					}
					echo 0;
				}
			}
			else
			{
				echo -1;
			}
		}

		mysqli_close($conn);
	}
?> 