<?php
// Include system config file
//require 'system/config.php';

//API login Credentials
$username = "kayeli";
$password = "Kdenno25@gmail";

//HTTP GET request -Using Curl -Response JSON
$dataset =$_GET['dataSet'];

$url="http://test.hiskenya.org/api/dataSets/"."$dataset"."/dataEntryForm";

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


if ($result){

    echo $result;
}
else{

    echo -1;
}

?>
