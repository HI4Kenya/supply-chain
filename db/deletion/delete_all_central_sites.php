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
			   10 - No item to delete
		*/

		require '../db_auth/db_con.php';

		$program_id = $_POST['program_id'];
		$classification = $_POST['classification'];

		// Check if there are any standalone sites before deleting
		$item_exists = "SELECT * FROM facility_program_mapping WHERE program_id = '$program_id' 
		AND classification = '$classification'";
        $item_exists_result = mysqli_query($conn,$item_exists);
        if(mysqli_num_rows($item_exists_result)>0)
        {
        	// Details to log
        	$number_deleted = mysqli_num_rows($item_exists_result);
        	$to_log = "IDS=".$number_deleted;
        	// Array of sub-county stores to log before deleting
        	while($the_items = mysqli_fetch_assoc($item_exists_result))
        	{
        		$to_log = $to_log.",".$the_items['facility_id'];
        	}
        	$programs = "SELECT * FROM programs WHERE program_id = '$program_id'";
	        $result = mysqli_query($conn,$programs);
	        if(mysqli_num_rows($result)>0)
	        {
	            while($row = mysqli_fetch_assoc($result)) 
	            {
    				$deleted_item_id = "All Central Sites program:".$row['program_id'];
					$deleted_item_name = "All Central Sites in the ".$row['program_name']." program";
					$deleted_item_description = "Program ID:".$row['program_id']."."."Program Name:".
												$row['program_name']."."."Sub-County Stores:".$to_log
												.".".$classification;
					$date_deleted = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
					$deleted_by = $_SESSION["user_id"];
				}
			}

        	// Delete the mapping of this program and facilities
			$delete_mapping_query = "DELETE FROM facility_program_mapping WHERE program_id = '$program_id' 
			AND classification = '$classification'";
			$run_mapping_query = mysqli_query($conn,$delete_mapping_query);
			if($run_mapping_query)
			{
				// Log the deletion
				// require the log insertion script
				require 'log_deletion.php';

				// Reset the AI of this table
				$reset_ai = "ALTER TABLE facility_program_mapping AUTO_INCREMENT = 1";
				mysqli_query($conn,$reset_ai);

			}
			else
			{
				// Error message
				echo -1;
			}

        }
		else
		{
			echo 10;
		}

		mysqli_close($conn);
	}
?> 