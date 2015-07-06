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
			    0 - Program Name and Dataset Updated
			    1 - Program Name Updated
			    2 - New Dataset Inserted
			   10 - No Changes
		*/

		require '../db_auth/db_con.php';

		$program_id = $_POST['program_id'];
		$program_name = str_replace("'", "",$_POST['program_name']);
		$program_dataset = $_POST['program_datasetID'];

		if($program_name == "")
		{
			// No changes on the name of the program
			// Update only the datasets
			// Check if the program has datasets already
	        $datasetExists = "SELECT * FROM datasets WHERE dataset_id = '$program_dataset' 
	        AND program_id = '$program_id'";
	        $received = mysqli_query($conn,$datasetExists);
	        if(mysqli_num_rows($received)>0)
	        {
	        	echo 10;
	        }
	        else
	        {
	        	// Insert this new dataset
	        	$insert_dataset = "INSERT INTO datasets(dataset_id,program_id)
				VALUES ('$program_dataset','$program_id')";
				if (mysqli_query($conn, $insert_dataset)) 
				{
					echo 2;
				}
				else
				{
					echo -1;
				}
	        }

		}

		else
		{
			// Changes on the program name
			$updateProgramName = "UPDATE programs SET program_name = '$program_name' WHERE
			program_id = '$program_id'";
			if(mysqli_query($conn,$updateProgramName))
			{
				// Check if the program has datasets alreadt
		        $datasetExists = "SELECT * FROM datasets WHERE dataset_id = '$program_dataset' 
		        AND program_id = '$program_id'";
		        $received = mysqli_query($conn,$datasetExists);
		        if(mysqli_num_rows($received)>0)
		        {
		        	echo 1;
		        }
		        else
		        {
		        	// Insert this new dataset
		        	$insert_dataset = "INSERT INTO datasets(dataset_id,program_id)
					VALUES ('$program_dataset','$program_id')";
					if (mysqli_query($conn, $insert_dataset)) 
					{
						echo 0;
					}
					else
					{
						echo -1;
					}
		        }

			}
		}

		mysqli_close($conn);
	}
?> 