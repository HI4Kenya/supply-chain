<?php
	
	// Program ID
	$program_id_string = $retrieve[0];
	$program_id_retrieve = explode(":", $program_id_string);
	$program_id = $program_id_retrieve[1];

	// Program Name
	$program_name_string = $retrieve[1];
	$program_name_retrieve = explode(":", $program_name_string);
	$program_name = $program_name_retrieve[1];

	// SITE
	$site_desc_string = $retrieve[2];
	$site_retrieve = explode(":", $site_desc_string);
	// Classification
	$site_classification = $site_retrieve[0];
	// Facility id
	$site_id = $site_retrieve[1];

	/*ALL DATA READY FOR RECOVERY*/
	// Check whether a program with that id exists
	$check_program = "SELECT * FROM programs WHERE program_id = '$program_id'";
    $check_program_result = mysqli_query($conn,$check_program);
    if(mysqli_num_rows($check_program_result)>0)
    {
    	// There is a program with that ID
    	// Confirm its the same program
    	$check_name = "SELECT * FROM programs WHERE program_name = '$program_name'";
    	$check_name_result = mysqli_query($conn,$check_name);
    	if(mysqli_num_rows($check_name_result)>0)
    	{
    		// The program is confirmed
    		// Check if there is any such classification

    		// Check if facility_program mapping exists from the facility_program_mapping table
			$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$site_id'
			AND program_id = '$program_id' AND classification = '$site_classification'";
			$mappingResult = mysqli_query($conn,$checkMapping);
			if(mysqli_num_rows($mappingResult)>0)
			{
				// Such a classification exists therefore there is no need to restore

				// DELETE FROM THE LOGS
				$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
				mysqli_query($conn,$delete_log_query);

				// Reset the AI of this table
				$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
				mysqli_query($conn,$reset_ai);

				/*ECHO CLASSIFICATION EXISTS*/
				echo 1;
			}
			else
			{
				// Classification does not exist
				// Restore
        		// Insert into the facility_mapping_table
	        	$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
				created_on,created_by,comment)
				VALUES ('$site_id','$program_id','$site_classification','$date_recovered','$recovered_by',
				'$comment')";
				if (mysqli_query($conn, $mappingQuery))
				{
					// DELETE FROM THE LOGS
					$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
					mysqli_query($conn,$delete_log_query);

					// Reset the AI of this table
					$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
					mysqli_query($conn,$reset_ai);

					/*ECHO RESTORED*/
					echo 0;
				}

				else
				{
					/*ERROR OCCURED*/
					//echo -1;
					echo mysql_errno($conn);
				}
			}
    	}
    	else
    	{
    		/*THE PROGRAM CANNOT BE AUTHENTICATED*/
    		// Either do a restore of the program first or do not restore at all

    		$logged_program_id = "program:".$program_id;
    		$logged_program_name = $program_name." program";

    		// First check from the logs if any such program existed and was deleted
    		$check_logs = "SELECT * FROM deletion_logs WHERE deleted_item_id = '$logged_program_id'";
    		$check_logs_result = mysqli_query($conn,$check_logs);
    		if(mysqli_num_rows($check_logs_result))
    		{
    			// A program match found

    			// Confirm using the deleted_item_name field
    			$confirm = "SELECT * FROM deletion_logs WHERE deleted_item_name = '$logged_program_name'";
        		$confirm_result = mysqli_query($conn,$confirm);
        		if(mysqli_num_rows($confirm_result))
        		{
        			/*PROGRAM EXISTED BUT WAS DELETED*/
        			// Do a program restoration first

        			while($deletion_row = mysqli_fetch_assoc($confirm_result))
        			{
        				$identified_program_id = $deletion_row['id'];
        			}

        			//Program restoration first
        			$query = "SELECT * FROM deletion_logs WHERE id = '$identified_program_id'";
			        $result = mysqli_query($conn,$query);
			        if(mysqli_num_rows($result)>0)
			        {
			            while($row = mysqli_fetch_assoc($result)) 
			            {
		        			$recovered = $row['deleted_item_description'];
        					$retrieve = explode(".", $recovered);
		        			require 'program_recovery.php';
		        		}
		        	}

		        	// Restore the facility
		        	// Check if facility_program mapping exists from the facility_program_mapping table
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$site_id'
					AND program_id = '$identified_program_id' AND classification = '$site_classification'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						// Such a classification exists therefore there is no need to restore

						// DELETE FROM THE LOGS
						$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
						mysqli_query($conn,$delete_log_query);

						// Reset the AI of this table
						$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
						mysqli_query($conn,$reset_ai);

						/*ECHO CLASSIFICATION EXISTS*/
						echo 1;
					}
					else
					{
						// Classification does not exist
						// Restore
		        		// Insert into the facility_mapping_table
			        	$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
						created_on,created_by,comment)
						VALUES ('$site_id','$identified_program_id','$site_classification','$date_recovered','$recovered_by',
						'$comment')";
						if (mysqli_query($conn, $mappingQuery))
						{
							// DELETE FROM THE LOGS
							$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
							mysqli_query($conn,$delete_log_query);

							// Reset the AI of this table
							$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
							mysqli_query($conn,$reset_ai);

							/*ECHO RESTORED*/
							echo 0;
						}

						else
						{
							/*ERROR OCCURED*/
							//echo -1;
							echo mysql_errno($conn);
						}
					}

        		}
        		/*INSERT THE PROGRAM A FRESH*/
        		else
        		{
        			// Program match not found
        			// Insert program a fresh
        			// Partial recovery. Program will not have datasets
					$sql = "INSERT INTO programs(program_name, date_created, created_by, date_updated, updated_by, comment)
					VALUES ('$program_name', '$date_recovered', '$recovered_by', '$date_recovered', '$recovered_by', '$comment')";
					if (mysqli_query($conn, $sql)) 
					{
						// Get program ID
						$get_id = "SELECT * FROM programs WHERE program_name = '$program_name'";
						$response = mysqli_query($conn,$get_id);
						if(mysqli_num_rows($response)>0)
						{
							while($row = mysqli_fetch_assoc($response)) 
			                {
			                   $the_program_id = $row['program_id'];
			                }
			            }

			            // Check if facility_program mapping exists from the facility_program_mapping table
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$site_id'
						AND program_id = '$the_program_id' AND classification = '$site_classification'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							// Such a classification exists therefore there is no need to restore

							// DELETE FROM THE LOGS
							$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
							mysqli_query($conn,$delete_log_query);

							// Reset the AI of this table
							$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
							mysqli_query($conn,$reset_ai);

							/*ECHO CLASSIFICATION EXISTS*/
							echo 1;
						}
						else
						{
							// Classification does not exist
							// Restore
			        		// Insert into the facility_mapping_table
				        	$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
							created_on,created_by,comment)
							VALUES ('$site_id','$the_program_id','$site_classification','$date_recovered','$recovered_by',
							'$comment')";
							if (mysqli_query($conn, $mappingQuery))
							{
								// DELETE FROM THE LOGS
								$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
								mysqli_query($conn,$delete_log_query);

								// Reset the AI of this table
								$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
								mysqli_query($conn,$reset_ai);

								/*ECHO RESTORED*/
								echo 0;
							}

							else
							{
								/*ERROR OCCURED*/
								//echo -1;
								echo mysql_errno($conn);
							}
						}
					}
					else
					{
						echo -1;
					}
        		}
    		}

    	}
    }

    // There is no program with such an ID
    // Check if a program with a similar name but a different id exists
    else
    {
    	$check_name = "SELECT * FROM programs WHERE program_name = '$program_name'";
    	$check_name_result = mysqli_query($conn,$check_name);
    	if(mysqli_num_rows($check_name_result)>0)
    	{	

    		// A program with a similar name exists
    		// Fetch the new ID to use for classification
    		while($program_row = mysqli_fetch_assoc($check_name_result))
    		{
    			$new_program_id = $program_row['program_id'];
    		}

    		// Do the restoration
    		// Check if facility_program mapping exists from the facility_program_mapping table
			$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$site_id'
			AND program_id = '$new_program_id' AND classification = '$site_classification'";
			$mappingResult = mysqli_query($conn,$checkMapping);
			if(mysqli_num_rows($mappingResult)>0)
			{
				// Such a classification exists therefore there is no need to restore

				// DELETE FROM THE LOGS
				$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
				mysqli_query($conn,$delete_log_query);

				// Reset the AI of this table
				$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
				mysqli_query($conn,$reset_ai);

				/*ECHO CLASSIFICATION EXISTS*/
				echo 1;
			}
			else
			{
				// Classification does not exist
				// Restore
        		// Insert into the facility_mapping_table
	        	$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
				created_on,created_by,comment)
				VALUES ('$site_id','$new_program_id','$site_classification','$date_recovered','$recovered_by',
				'$comment')";
				if (mysqli_query($conn, $mappingQuery))
				{
					// DELETE FROM THE LOGS
					$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
					mysqli_query($conn,$delete_log_query);

					// Reset the AI of this table
					$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
					mysqli_query($conn,$reset_ai);

					/*ECHO RESTORED*/
					echo 0;
				}

				else
				{
					/*ERROR OCCURED*/
					echo -1;
				}
			}
    		
    	}
    	/*NO SUCH PROGRAM EXISTS*/
    	else
    	{
    		// Either do a programs restoration first or do away with the restoration
    		// Program match not found
			// Insert program a fresh
			// Partial recovery. Program will not have datasets
			$sql = "INSERT INTO programs(program_name, date_created, created_by, date_updated, updated_by, comment)
			VALUES ('$program_name', '$date_recovered', '$recovered_by', '$date_recovered', '$recovered_by', '$comment')";
			if (mysqli_query($conn, $sql)) 
			{
				// Get program ID
				$get_id = "SELECT * FROM programs WHERE program_name = '$program_name'";
				$response = mysqli_query($conn,$get_id);
				if(mysqli_num_rows($response)>0)
				{
					while($row = mysqli_fetch_assoc($response)) 
	                {
	                   $the_program_id = $row['program_id'];
	                }
	            }

	            // Check if facility_program mapping exists from the facility_program_mapping table
				$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$site_id'
				AND program_id = '$the_program_id' AND classification = '$site_classification'";
				$mappingResult = mysqli_query($conn,$checkMapping);
				if(mysqli_num_rows($mappingResult)>0)
				{
					// Such a classification exists therefore there is no need to restore

					// DELETE FROM THE LOGS
					$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
					mysqli_query($conn,$delete_log_query);

					// Reset the AI of this table
					$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
					mysqli_query($conn,$reset_ai);

					/*ECHO CLASSIFICATION EXISTS*/
					echo 1;
				}
				else
				{
					// Classification does not exist
					// Restore
	        		// Insert into the facility_mapping_table
		        	$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
					created_on,created_by,comment)
					VALUES ('$site_id','$the_program_id','$site_classification','$date_recovered','$recovered_by',
					'$comment')";
					if (mysqli_query($conn, $mappingQuery))
					{
						// DELETE FROM THE LOGS
						$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
						mysqli_query($conn,$delete_log_query);

						// Reset the AI of this table
						$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
						mysqli_query($conn,$reset_ai);

						/*ECHO RESTORED*/
						echo 0;
					}

					else
					{
						/*ERROR OCCURED*/
						//echo -1;
						echo mysql_errno($conn);
					}
				}
			}
			else
			{
				echo -1;
			}

    	}
    }
?>