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

        $log_id = $_POST['log_id'];
        $data = array();

        // Date created
		$date_recovered = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
        // User creating
        $recovered_by = $_SESSION["user_id"];
        $comment = "RESTORED";

        $query = "SELECT * FROM deletion_logs WHERE id = '$log_id'";
        $result = mysqli_query($conn,$query);
        if(mysqli_num_rows($result)>0)
        {
            while($row = mysqli_fetch_assoc($result)) 
            {
                $deleted_item_id = $row['deleted_item_id'];

                $item = explode(":",$deleted_item_id);
		        $identity = $item[0];

		        /*SINGLE FACILITY RESTORATION*/
		        /* ----------------------------------------------------------------------------------------------------------------------------- */
		        if(($identity == "Sub-County Store")||($identity == "Central Site")||($identity == "Satellite Site")||($identity == "StandAlone"))
		        {
		        	$recovered = $row['deleted_item_description'];
		        	$retrieve = explode(".", $recovered);

		        	require 'single_facility_recovery.php';

		        }
		        /* ----------------------------------------------------------------------------------------------------------------------------- */
		        /* ----------------------------------------------------------------------------------------------------------------------------- */


		        /*ALL FACILITIES RESTORATION*/
		        /* ----------------------------------------------------------------------------------------------------------------------------- */
		        else if(($identity == "All SubCounty Stores program")||($identity == "All Central Sites program")||($identity == "All StandAlone Sites program"))
		        {
		        	$recovered = $row['deleted_item_description'];
		        	$retrieve = explode(".", $recovered);

		        	require 'all_facilities_recovery.php';

				}
		        /* ----------------------------------------------------------------------------------------------------------------------------- */
		        /* ----------------------------------------------------------------------------------------------------------------------------- */


		        /*PROGRAM RESTORATION*/
		        /* ----------------------------------------------------------------------------------------------------------------------------- */
		        else if($identity == "program")
		        {
		        	$recovered = $row['deleted_item_description'];
		        	$retrieve = explode(".", $recovered);

		        	require 'program_recovery.php';
		        }
		        /* ----------------------------------------------------------------------------------------------------------------------------- */
		        /* ----------------------------------------------------------------------------------------------------------------------------- */
            }
        }
        mysqli_close($conn);
    }
?> 