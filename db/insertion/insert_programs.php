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
		require '../db_auth/db_con.php';

		$program_name = str_replace("'", "",$_POST['program_name']);
		$program_dataset = $_POST['program_datasetID'];

		// Date updated
		$date_created = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
        // User updating this account
        $created_by = $_SESSION["user_id"];

        $comment = "CREATED";

		//Check if program exists
		$exists = "SELECT * FROM programs WHERE program_name = '$program_name'";
		$result = mysqli_query($conn,$exists);
		if(mysqli_num_rows($result)>0)
		{
			while($row = mysqli_fetch_assoc($result)) 
	        {
	           $the_program_id = $row['program_id'];
	        }

	        // Check if the program has datasets that have been selected
	        $datasetExists = "SELECT * FROM datasets WHERE dataset_id = '$program_dataset' 
	        AND program_id = '$the_program_id'";
	        $received = mysqli_query($conn,$datasetExists);
	        if(mysqli_num_rows($received)>0)
	        {
	        	echo 1;
	        }
	        else
	        {
	        	// Update Dataset
				$insert_dataset = "INSERT INTO datasets(dataset_id, program_id, created_on, created_by, comment)
				VALUES ('$program_dataset','$the_program_id', '$date_created', '$created_by', '$comment')";
				if (mysqli_query($conn, $insert_dataset, $comment)) 
				{
					echo 10;
				}
				else
				{
					echo -1;
				}

	        }
		}

		else
		{
			$sql = "INSERT INTO programs(program_name, date_created, created_by, date_updated, updated_by, comment)
			VALUES ('$program_name', '$date_created', '$created_by', '$date_created', '$created_by', '$comment')";

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
					$insert_dataset = "INSERT INTO datasets(dataset_id, program_id, created_on, created_by, comment)
					VALUES ('$program_dataset', '$the_program_id', '$date_created', '$created_by', '$comment')";
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
			else 
			{
			    echo -1;
			}

		}

		mysqli_close($conn);
	}
?> 