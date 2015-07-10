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

		// Details  to log
		// DATASETS
		$the_datasets = "SELECT * FROM datasets WHERE program_id = '$program_id'";
		$run_the_datasets = mysqli_query($conn,$the_datasets);
		if(mysqli_num_rows($run_the_datasets)>0)
		{
			$number_of_datasets = mysqli_num_rows($run_the_datasets);
			$datasets_to_log = "DATASETS=".$number_of_datasets;
			while($datasets_row = mysqli_fetch_assoc($run_the_datasets))
			{
				$datasets_to_log = $datasets_to_log."/".$datasets_row['dataset_id'];
			}
		}

		// FACILITY PROGRAM MAPPING
		$the_mapping = "SELECT * FROM facility_program_mapping WHERE program_id = '$program_id'";
		$run_the_mapping = mysqli_query($conn,$the_mapping);
		if(mysqli_num_rows($run_the_mapping)>0)
		{
			$number_of_mappings = mysqli_num_rows($run_the_mapping);
			$mapping_to_log = "CLASSIFICATIONS=".$number_of_mapping;
			while($mapping_row = mysqli_fetch_assoc($run_the_mapping))
			{
				$mapping_to_log = $mapping_to_log."/".$mapping_row['facility_id']."-".$mapping_row['classification'];
			}
		}

		// Select the program details to log
		$programs = "SELECT * FROM programs WHERE program_id = '$program_id'";
        $result = mysqli_query($conn,$programs);
        if(mysqli_num_rows($result)>0)
        {
        	$number_of_programs = mysqli_num_rows($result);
            while($row = mysqli_fetch_assoc($result)) 
            {
				$deleted_item_id = "program:".$row['program_id'];
				$deleted_item_name = $row['program_name']." program";
				$deleted_item_description = "Program ID:".$row['program_id']."."."Program Name:".
											$row['program_name'].".".$datasets_to_log.".".$mapping_to_log;
				$date_deleted = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
				$deleted_by = $_SESSION["user_id"];
			}
		}

		// Total number of items deleted
		$number_deleted = $number_of_datasets+$number_of_mappings+$number_of_programs;

		// START THE DELETION
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
					// Log the deletion
					// require the log insertion script
					require 'log_deletion.php';				            
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