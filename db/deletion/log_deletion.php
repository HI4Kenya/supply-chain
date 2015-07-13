<?php	

	//Insert details of a deletion into the deletion_logs table
	$log_query = "INSERT INTO deletion_logs (deleted_item_id, number_deleted, deleted_item_name, deleted_item_description,
	date_deleted, deleted_by) 
	VALUES ('$deleted_item_id', '$number_deleted', '$deleted_item_name', '$deleted_item_description', '$date_deleted', '$deleted_by')";
	$run_log_query = mysqli_query($conn,$log_query);
	if($run_log_query)
	{
		// Successful deletion and logging
		echo 0;
	}

?>