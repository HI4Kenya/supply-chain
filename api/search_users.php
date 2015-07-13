<?php
	// Include system config file
	//require 'system/config.php';

	//API login Credentials
	$username = "kayeli";
	$password = "Kdenno25@gmail";

	//HTTP GET request -Using Curl -Response JSON
	$user_name =$_GET['name'];

	$url="http://test.hiskenya.org/api/users";

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
	curl_setopt($ch, CURLOPT_TIMEOUT, 20);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
	//execute
	$result = curl_exec($ch);

	//close connection
	curl_close($ch);


	if ($result)
	{
		$user_name = "mohamed";
		$data= json_decode($result,true);
		$users = $data["users"];

		$search_key = strtolower($user_name);

	    foreach ($users as $key => $value) 
	    {
	    	$search_data = strtolower($value["name"]);

	        if((stripos($search_data,$search_key))===true) 
	        {
	            echo "found".$key;
	        }
	        else
	        {
	        	echo "NONE".$key."<br>";
	        }
	    }
	}

	else
	{
	    echo -1;
	}

?>
