<?php
    //API login Credentials
    $username = "kayeli";
    $password = "Kdenno25@gmail";
//    //Data Elements
    $url_dataElements="http://test.hiskenya.org/api/dataElements?paging=false";
//    // initailizing curl
    $ch = curl_init();
    //curl options
    curl_setopt($ch, CURLOPT_POST, false);
    curl_setopt($ch, CURLOPT_URL, $url_dataElements);
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
    //execute
    $dataElements= curl_exec($ch);
    //close connection
    curl_close($ch);
    if($dataElements){
        file_put_contents('dataElements.json', $dataElements);
        echo "OKAY";
    }

?>