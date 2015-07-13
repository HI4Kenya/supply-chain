<?php

    // Include system config file
    //require 'system/config.php';

    //API login Credentials
    $username = "kayeli";
    $password = "Kdenno25@gmail";

    //HTTP GET request -Using Curl -Response JSON
    $period = $_GET['pe'];
    $orgUnits = $_GET['orgUnits'];
    $categoryCombo = $_GET['co'];
    $dataElement =$_GET['de'];
    $prefix=$_GET['prefix'];
    $prefix_replace=$_GET['prefix_replace'];
   // $prefix=$_GET['prefix'];
    $sum=0;

    //Data Element ID
    $url_dataElement="http://test.hiskenya.org/api/dataElements/"."$dataElement";
    // initailizing curl
    $ch = curl_init();
    //curl options
    curl_setopt($ch, CURLOPT_POST, false);
    curl_setopt($ch, CURLOPT_URL, $url_dataElement);
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
    //execute
    $form_name = curl_exec($ch);
    //close connection
    curl_close($ch);
    $form_name=json_decode($form_name,true);
//   echo $form_name="MOH 730B ".$form_name["formName"];
    $form_name=str_ireplace($prefix_replace, $prefix,$form_name["name"]);

//    //Data Elements
//    $url_dataElements="http://test.hiskenya.org/api/dataElements?paging=false";
//    // initailizing curl
//    $ch = curl_init();
//    //curl options
//    curl_setopt($ch, CURLOPT_POST, false);
//    curl_setopt($ch, CURLOPT_URL, $url_dataElements);
//    curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
//    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
//    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
//    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
//    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
//    //execute
//    $dataElements= curl_exec($ch);
//    //close connection
//    curl_close($ch);
    $dataElements = file_get_contents('dataElements.json');
    $dataElements=json_decode($dataElements,true);
    $dataElements=$dataElements["dataElements"];

    //case insenstivie search for the DataElement Name
    $key = array_search(strtolower($form_name), array_map('strtolower',array_column($dataElements, 'name')));
//   $key = array_search($form_name, array_column($dataElements, 'name'));
    if($key){

       $dataElement=$dataElements[$key]["id"];
   }


    $url_dataValues = "http://test.hiskenya.org/api/dataValues?";
// initailizing curl
    $ch = curl_init();
    foreach ($orgUnits as $orgUnit) {
        $data = array("de" => "$dataElement", "pe" => "$period", "ou" => "$orgUnit","co" => "$categoryCombo");
        $data_string = http_build_query($data);
        $url=$url_dataValues ."$data_string";

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
    //    echo $result;
    //close connection

        if (is_array(json_decode($result, true)) ){
            $result=json_decode($result);
            $data=intval($result[0]);
//            echo ",";
            $sum=$sum+$data;
    //        echo $sum;
        } else {

        }

    }
    curl_close($ch);

    echo $sum;



?>
