<?php

	// Program ID
	$program_id_string = $retrieve[0];
	$program_id_retrieve = explode(":", $program_id_string);
	$program_id = $program_id_retrieve[1];

	// Program Name
	$program_name_string = $retrieve[1];
	$program_name_retrieve = explode(":", $program_name_string);
	$program_name = $program_name_retrieve[1];

	// DATASETS
	$datasets_desc_string = $retrieve[2];
	$datasets_string_retrieve = explode("/", $datasets_desc_string);
	// Datasets Number
	$datasets_number_string = $datasets_string_retrieve[0];
	$datasets_number_retrieve = explode("=", $datasets_number_string);
	$number_of_datasets = $datasets_number_retrieve[1];

	// Actual datasets
	$datasets_array = array();
	for($count = 1; $count<=$number_of_datasets; $count++)
	{
		$datasets_array[] = $datasets_string_retrieve[$count];
	}

	// CLASSIFICATIONS
	$classifications_desc_string = $retrieve[3];
	$classifications_string_retrieve = explode("/", $classifications_desc_string);
	// Datasets Number
	$classifications_number_string = $classifications_string_retrieve[0];
	$classifications_number_retrieve = explode("=", $classifications_number_string);
	$number_of_classification = $classifications_number_retrieve[1];
	//echo $number_of_classification;

	// Actual classifications
	$classifications_array = array();
	for($count = 1; $count<=$number_of_classification; $count++)
	{
		$classifications_array[] = $classifications_string_retrieve[$count];
	}

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
    		// Program Authenticated
    		// Check if the datasets for that program exist
    		// Actual datasets
        	for($count = 1; $count<=$number_of_datasets; $count++)
        	{
        		$dataset = $datasets_string_retrieve[$count];
        		$program_datasets = "SELECT * FROM datasets WHERE dataset_id = '$dataset' 
        		AND program_id = '$program'_id";
		        $answer = mysqli_query($conn,$program_datasets);
		        if(mysqli_num_rows($answer)>0)
		        {
		        	// Dataset exists
		        	echo 1;
		        }
		        else
		        {
		        	// Restore the dataset
		        	$insert_dataset = "INSERT INTO datasets(dataset_id, program_id, created_on, created_by, comment)
					VALUES ('$dataset','$program_id', '$date_recovered', '$recovered_by', '$comment')";
					if (mysqli_query($conn, $insert_dataset)) 
					{
						// Success
						echo 0;
					}
					else
					{
						// Error
						echo -1;
					}
		        }
        	}

        	// Check if the program sites exist
        	for($count = 1; $count<=$number_of_classification; $count++)
        	{
        		$classification_string = $classifications_string_retrieve[$count];
        		$classification_string_retrieve = explode("#", $classification_string);
        		$site_id = $classification_string_retrieve[0];
        		$site_classification = $classification_string_retrieve[1];
        		// Check if facility_program mapping exists from the facility_program_mapping table
				$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$site_id'
				AND program_id = '$program_id' AND classification = '$site_classification'";
				$mappingResult = mysqli_query($conn,$checkMapping);
				if(mysqli_num_rows($mappingResult)>0)
				{
					// Mapping exists
					echo 1;
				}
				else
				{
					// Restore the mapping
					// Restore
	        		// Insert into the facility_mapping_table
		        	$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
					created_on,created_by,comment)
					VALUES ('$site_id','$program_id','$site_classification','$date_recovered','$recovered_by',
					'$comment')";
					if (mysqli_query($conn, $mappingQuery))
					{
						// Mapping restored
						echo 0;
					}
					else
					{
						// Error
						echo -1;
					}
				}
        	}

        	// DELETE FROM THE LOGS
			$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
			mysqli_query($conn,$delete_log_query);

			// Reset the AI of this table
			$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
			mysqli_query($conn,$reset_ai);
    	}
    	else
    	{
    		// Insert program a fresh
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
	            // Restore the dataset
	        	for($count = 1; $count<=$number_of_datasets; $count++)
	        	{
	        		$dataset = $datasets_string_retrieve[$count];
	        		$program_datasets = "SELECT * FROM datasets WHERE dataset_id = '$dataset' 
	        		AND program_id = '$program'_id";
			        $answer = mysqli_query($conn,$program_datasets);
			        if(mysqli_num_rows($answer)>0)
			        {
			        	// Dataset exists
			        	echo 1;
			        }
			        else
			        {
			        	// Restore the dataset
			        	$insert_dataset = "INSERT INTO datasets(dataset_id, program_id, created_on, created_by, comment)
						VALUES ('$dataset','$the_program_id', '$date_recovered', '$recovered_by', '$comment')";
						if (mysqli_query($conn, $insert_dataset)) 
						{
							// Success
							echo 0;
						}
						else
						{
							// Error
							echo -1;
						}
			        }
	        	}

				// Check if the program sites exist
	        	for($count = 1; $count<=$number_of_classification; $count++)
	        	{
	        		$classification_string = $classifications_string_retrieve[$count];
	        		$classification_string_retrieve = explode("#", $classification_string);
	        		$site_id = $classification_string_retrieve[0];
	        		$site_classification = $classification_string_retrieve[1];
	        		// Insert into the facility_mapping_table
		        	$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
					created_on,created_by,comment)
					VALUES ('$site_id','$the_program_id','$site_classification','$date_recovered','$recovered_by',
					'$comment')";
					if (mysqli_query($conn, $mappingQuery))
					{
						// Mapping restored
						echo 0;
					}
					else
					{
						// Error
						echo -1;
					}
				}
			}

			else
			{
				// Error
				echo -1;
			}

			// DELETE FROM THE LOGS
			$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
			mysqli_query($conn,$delete_log_query);

			// Reset the AI of this table
			$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
			mysqli_query($conn,$reset_ai);
    	}
    }
    // The program id does not exist at all
    else
    {
    	// Use the name to look for the program before inserting
    	$check_name = "SELECT * FROM programs WHERE program_name = '$program_name'";
    	$check_name_result = mysqli_query($conn,$check_name);
    	if(mysqli_num_rows($check_name_result)>0)
    	{
    		while($that_row = mysqli_fetch_assoc($check_name_result))
    		{
    			$the_program_id = $that_row['program_id'];
    		}
    		// Restore the dataset
        	for($count = 1; $count<=$number_of_datasets; $count++)
        	{
        		$dataset = $datasets_string_retrieve[$count];
        		$program_datasets = "SELECT * FROM datasets WHERE dataset_id = '$dataset' 
        		AND program_id = '$program'_id";
		        $answer = mysqli_query($conn,$program_datasets);
		        if(mysqli_num_rows($answer)>0)
		        {
		        	// Dataset exists
		        	echo 1;
		        }
		        else
		        {
		        	// Restore the dataset
		        	$insert_dataset = "INSERT INTO datasets(dataset_id, program_id, created_on, created_by, comment)
					VALUES ('$dataset','$the_program_id', '$date_recovered', '$recovered_by', '$comment')";
					if (mysqli_query($conn, $insert_dataset)) 
					{
						// Success
						echo 0;
					}
					else
					{
						// Error
						echo -1;
					}
		        }
        	}

			// Check if the program sites exist
        	for($count = 1; $count<=$number_of_classification; $count++)
        	{
        		$classification_string = $classifications_string_retrieve[$count];
        		$classification_string_retrieve = explode("#", $classification_string);
        		$site_id = $classification_string_retrieve[0];
        		$site_classification = $classification_string_retrieve[1];
        		// Insert into the facility_mapping_table
	        	$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
				created_on,created_by,comment)
				VALUES ('$site_id','$the_program_id','$site_classification','$date_recovered','$recovered_by',
				'$comment')";
				if (mysqli_query($conn, $mappingQuery))
				{
					// Mapping restored
					echo 0;
				}
				else
				{
					// Error
					echo -1;
				}
			}
    	}
    	// No match found using both the program_id or the program_name
    	else
    	{
    		// Insert program a fresh
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
	            // Restore the dataset
	        	for($count = 1; $count<=$number_of_datasets; $count++)
	        	{
	        		$dataset = $datasets_string_retrieve[$count];
	        		$program_datasets = "SELECT * FROM datasets WHERE dataset_id = '$dataset' 
	        		AND program_id = '$program'_id";
			        $answer = mysqli_query($conn,$program_datasets);
			        if(mysqli_num_rows($answer)>0)
			        {
			        	// Dataset exists
			        	echo 1;
			        }
			        else
			        {
			        	// Restore the dataset
			        	$insert_dataset = "INSERT INTO datasets(dataset_id, program_id, created_on, created_by, comment)
						VALUES ('$dataset','$the_program_id', '$date_recovered', '$recovered_by', '$comment')";
						if (mysqli_query($conn, $insert_dataset)) 
						{
							// Success
							echo 0;
						}
						else
						{
							// Error
							echo -1;
						}
			        }
	        	}

				// Check if the program sites exist
	        	for($count = 1; $count<=$number_of_classification; $count++)
	        	{
	        		$classification_string = $classifications_string_retrieve[$count];
	        		$classification_string_retrieve = explode("#", $classification_string);
	        		$site_id = $classification_string_retrieve[0];
	        		$site_classification = $classification_string_retrieve[1];
	        		// Insert into the facility_mapping_table
		        	$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
					created_on,created_by,comment)
					VALUES ('$site_id','$the_program_id','$site_classification','$date_recovered','$recovered_by',
					'$comment')";
					if (mysqli_query($conn, $mappingQuery))
					{
						// Mapping restored
						echo 0;
					}
					else
					{
						// Error
						echo -1;
					}
				}
			}

			else
			{
				// Error
				echo -1;
			}
    	}

		// DELETE FROM THE LOGS
		$delete_log_query = "DELETE FROM deletion_logs WHERE id = '$log_id'";
		mysqli_query($conn,$delete_log_query);

		// Reset the AI of this table
		$reset_ai = "ALTER TABLE deletion_logs AUTO_INCREMENT = 1";
		mysqli_query($conn,$reset_ai);
    }
?>