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

    //HTTP GET request -Using Curl -Response JSON
    $period = $_GET['period'];
    $orgUnits = ["AwVQ3uJftlj", "Js2jIKhWf6P", "DMF5wWYxVHg", "pTlrkLDOyAx", "Yh9TiSUTbrT", "ZkbTg8ryBSo"];
    $dataSet=$_GET['dataSet'];

    $report=array();

    $adult_art=["vQT7jVREviu","LlpQr7Jx1BW","m1BhDG7YLeS","jGhEQraxUr6","lw6LxmBFWBU","NoxMrLQ9GN6","KLLFIMDrV4f","bk80ClT6mda","TQyUBinUunX","HrAdMNqpfGc","nOKnANAWrN9","VmoB9JVggdg","aLEuudUbOjS","TGp2iwJoKgQ","KdFbp1qspEm","vhAvbR8jvbp","R8JmE1Byw3u","THFrJkfyYTx","IW86R66FbNT","SOoiP7qOsUo","eh52aI0mbHM"];
    $adult_pmtct=["fmNAMrLC6E1","ObbqKDSYHSM","wzGQUCOS6JH","HDREJbs99Jo","SZ9KQbbRGDK","hhF0lv4ApAg","XlDfIMLMCc0","KWwyekF5VDf","JWbn16GS54v","WP9sHVw3YfA","bzRJvVCKdRy"];
    $adult_pep=["R8qrfeyxtJG","u7hsTiKdiiu","v7jHwarkqud","pvaUMcgjp1k","rlmTbfq5Idg"];
    $paediatric_art=["uR26Yy0UKQe","luuOdMkUhUs","CjlzQG0xssl","dcJgt3rWowH","aihV4ADJ03p","iSfgVwytK4H","c1t8oGHQiGl","AMog4o55zNE","OZW7P0YVMTf","tq5Is5rstXr","T1ycYq5lhl9","Z6fMvN6VtSF","ccvlRpDaH9f","F7kHcKkcAkt","IwGG1bBlx3K","GCrlI7zb3oy","RhSiKJe7ZJq","J2X6rkORmGE","kE0fmdbd8Ge","Ac9RFUmUqJf","N2NmanbK65P","a2zcBjmJsFY","eaaug3VjX0J","z60P04EXWwx","FdlaCONjVHI"];
    $paediatric_pmtct=["RU37FYRhkuI","FfKmFD4Hsfh","ZBwrHoHlZPs","N06L50978pu","zE7RKAsYTpb","i995jo2yPXw"];
    $paediatric_pep=["SylmDjlZEjQ","wLghnsMARPW","F6tU0MuyNK5"];

    //creating the Regimen Report template
    $adult_art_data=array();
    foreach($adult_art as $value){
        array_push($adult_art_data,array("dataElement"=>$value,"value"=>0));
    }

    $adult_pmtct_data=array();
    foreach($adult_pmtct as $value){
        array_push($adult_pmtct_data,array("dataElement"=>$value,"value"=>0));
    }

    $adult_pep_data=array();
    foreach($adult_pep as $value){
        array_push($adult_pep_data,array("dataElement"=>$value,"value"=>0));
    }

    $paediatric_art_data=array();
    foreach($paediatric_art as $value){
        array_push($paediatric_art_data,array("dataElement"=>$value,"value"=>0));
    }

    $paediatric_pmtct_data=array();
    foreach($paediatric_pmtct as $value){
        array_push($paediatric_pmtct_data,array("dataElement"=>$value,"value"=>0));
    }

    $paediatric_pep_data=array();
    foreach($paediatric_pep as $value){
        array_push($paediatric_pep_data,array("dataElement"=>$value,"value"=>0));
    }

    $regimen_report=array("adult_art"=>$adult_art_data,"adult_pmtct"=>$adult_pmtct_data,
        "adult_pep"=>$adult_pep_data,"paediatric_art"=>$paediatric_art_data,"paediatric_pmtct"=>$paediatric_pmtct_data,
        "paediatric_pep"=>$paediatric_pep_data);

//    var_dump($regimen_report);
//    echo json_encode($regimen_report);

    $grand_adult_art=0;
    $grand_adult_pep=0;
    $grand_adult_pmtct=0;
    $grand_paediatric_art=0;
    $grand_paediatric_pmtct=0;
    $grand_paediatric_pep=0;

    foreach($orgUnits as $orgUnit){

        $sum_adult_art=0;
        $sum_adult_pep=0;
        $sum_adult_pmtct=0;
        $sum_paediatric_art=0;
        $sum_paediatric_pmtct=0;
        $sum_paediatric_pep=0;

//        $sum_universal_prophylaxis=0;
//        $sum_diflucan_donation=0;
//        $sum_pmtct_women=0;

        $url = $dhis_url."/api/dataValueSets?";

        $data = array("dataSet" => "$dataSet", "period" => "$period", "orgUnit" => "$orgUnit");
        $data_string = http_build_query($data);
        $url.="$data_string";

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
        $result=json_decode($result,true);

        if (isset($result["dataValues"])){

            $data_values=$result["dataValues"];

            foreach ($data_values as $data_value){

                $dsum=0;
                if (in_array($data_value["dataElement"], $adult_art)) {
                    $key = array_search($data_value["dataElement"],array_column($regimen_report["adult_art"],"dataElement"));
                    if($key){
                        $dsum=$regimen_report["adult_art"][$key]["value"];
                        $dsum=$dsum+intval($data_value["value"]);
                        $regimen_report["adult_art"][$key]["value"]=$dsum;
                    }

                    $sum_adult_art=$sum_adult_art+intval($data_value["value"]);
                }

                if (in_array($data_value["dataElement"], $adult_pep)) {

                    $key = array_search($data_value["dataElement"],array_column($regimen_report["adult_pep"],"dataElement"));
                    if($key){
                        $dsum=$regimen_report["adult_pep"][$key]["value"];
                        $dsum=$dsum+intval($data_value["value"]);
                        $regimen_report["adult_pep"][$key]["value"]=$dsum;
                    }

                    $sum_adult_pep=$sum_adult_pep+intval($data_value["value"]);
                }

                if (in_array($data_value["dataElement"], $adult_pmtct)) {
                    $key = array_search($data_value["dataElement"],array_column($regimen_report["adult_pmtct"],"dataElement"));
                    if($key){
                        $dsum=$regimen_report["adult_pmtct"][$key]["value"];
                        $dsum=$dsum+intval($data_value["value"]);
                        $regimen_report["adult_pmtct"][$key]["value"]=$dsum;
                    }

                    $sum_adult_pmtct=$sum_adult_pmtct+intval($data_value["value"]);
                }

                if (in_array($data_value["dataElement"], $paediatric_art)) {

                    $key = array_search($data_value["dataElement"],array_column($regimen_report["paediatric_art"],"dataElement"));
                    if($key){
                        $dsum=$regimen_report["paediatric_art"][$key]["value"];
                        $dsum=$dsum+intval($data_value["value"]);
                        $regimen_report["paediatric_art"][$key]["value"]=$dsum;
                    }

                    $sum_paediatric_art=$sum_paediatric_art+intval($data_value["value"]);
                }

                if (in_array($data_value["dataElement"], $paediatric_pep)) {

                    $key = array_search($data_value["dataElement"],array_column($regimen_report["paediatric_pep"],"dataElement"));
                    if($key){
                        $dsum=$regimen_report["paediatric_pep"][$key]["value"];
                        $dsum=$dsum+intval($data_value["value"]);
                        $regimen_report["paediatric_pep"][$key]["value"]=$dsum;
                    }

                    $sum_paediatric_pep=$sum_paediatric_pep+intval($data_value["value"]);
                }

                if (in_array($data_value["dataElement"], $paediatric_pmtct)) {
                    $key = array_search($data_value["dataElement"],array_column($regimen_report["paediatric_pmtct"],"dataElement"));
                    if($key){
                        $dsum=$regimen_report["paediatric_pmtct"][$key]["value"];
                        $dsum=$dsum+intval($data_value["value"]);
                        $regimen_report["paediatric_pmtct"][$key]["value"]=$dsum;
                    }
                    $sum_paediatric_pmtct=$sum_paediatric_pmtct+intval($data_value["value"]);
                }
            }

        }
        else{
            //Do Nothing
        }

//        $data=array(
//            'orgUnit'=>$orgUnit,
//            'data'=>array(
//                'adult_art'=>$sum_adult_art,
//                'adult_pep'=>$sum_adult_pep,
//                'adult_pmtct'=>$sum_adult_pmtct,
//                'paediatric_art'=>$sum_paediatric_art,
//                'paediatric_pep'=>$sum_paediatric_pep,
//                'paediatric_pmtct'=>$sum_paediatric_pmtct)
//        );

        $grand_adult_art=$grand_adult_art+$sum_adult_art;
        $grand_adult_pep=$grand_adult_pep+$sum_adult_pep;
        $grand_adult_pmtct=$grand_adult_pmtct+$sum_adult_pmtct;
        $grand_paediatric_art= $grand_paediatric_art+$sum_paediatric_art;
        $grand_paediatric_pmtct=$grand_paediatric_pmtct+$sum_paediatric_pmtct;
        $grand_paediatric_pep=$grand_paediatric_pep+$sum_paediatric_pep;

        array_push($report,$data);
    }

    $grand_data=array("category"=>array(
        'adult_art'=>$grand_adult_art,
        'adult_pep'=>$grand_adult_pep,
        'adult_pmtct'=>$grand_adult_pmtct,
        'paediatric_art'=>$grand_paediatric_art,
        'paediatric_pep'=>$grand_paediatric_pep,
        'paediatric_pmtct'=>$grand_paediatric_pmtct));

    $regimen_report=array_merge($regimen_report,$grand_data);
    echo json_encode($regimen_report);



}

?>
