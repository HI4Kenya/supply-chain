<?php
	# Include system config file
	require '../system/config.php';

	session_start();
    // Validate a user has logged in
    // If not logged in, redirect to the log in page
    if(!isset($_SESSION['login_id']))
    {
        header('Location:'.$base_path.'');
    }
    else
    {
		# API login Credentials
		$username = $access_user;
		$password = $access_password;

		// Url to get the organisation units from the API
		$url = $dhis_url."/api/dataSets?paging=false";

		// initailizing curl
		$ch = curl_init();
		//curl options
		curl_setopt($ch, CURLOPT_POST, false);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_TIMEOUT, 60);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
		//execute
		$result = curl_exec($ch);

		//close connection
		curl_close($ch);


		if ($result)
		{
			$data= json_decode($result,true);
			$dataSets = $data["dataSets"];

			foreach ($dataSets as $value) 
		    {	
		    	$id= $value["id"];
				$name = str_replace("'", "",$value["name"]);
				$href = $value["href"];
				$code = $value["code"];

		    	// Require the insert script
		    	//require 'get_dataset_details.php';
		    	require '../db/insertion/insert_datasets.php';
		    }
		    echo 0;
		}
		else
		{
		    echo -1;
		}
	}
?>
