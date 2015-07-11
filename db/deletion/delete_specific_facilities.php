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
			$programs = "SELECT * FROM programs WHERE program_id = '$program_id'";
	        $result = mysqli_query($conn,$programs);
	        if(mysqli_num_rows($result)>0)
	        {
	            while($row = mysqli_fetch_assoc($result)) 
	            {
	            	$facilities = "SELECT * FROM facilities WHERE facility_id='$facility_id' ORDER BY facility_name";
		            $result = mysqli_query($conn,$facilities);
		            if(mysqli_num_rows($result)>0)
		            {
		            	// Details to log
		            	$number_deleted = mysqli_num_rows($result);
		                while($the_row = mysqli_fetch_assoc($result)) 
		                {
							$deleted_item_id = $classification.":".$facility_id;
							$deleted_item_name = $classification.":".$the_row['facility_name'];
							$deleted_item_description = "Program ID:".$row['program_id']."."."Program Name:".
														$row['program_name'].".".$deleted_item_id;
							$date_deleted = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
							$deleted_by = $_SESSION["user_id"];
							
							// require the insertion script
							require 'log_deletion.php';

							// Reset the AI of this table
							$reset_ai = "ALTER TABLE facility_program_mapping AUTO_INCREMENT = 1";
							mysqli_query($conn,$reset_ai);
		                }
		            }
	            }
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
