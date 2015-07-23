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
    $orgUnits = $_GET['orgUnits'];
    $dataSet=$_GET['dataSet'];

    $report=array();

    $aggregated_consumption="w5mBD3FwKg3";
    $aggregated_stock_at_hand="YO3e43lWky0";
    $aggregated_resupply_quantity="CCQF8AMSN7B";
    $categoryCombos=["w5mBD3FwKg3","YO3e43lWky0","CCQF8AMSN7B"];
    $month_stock=0;

    $org_units_data=array();


    foreach($orgUnits as $orgUnit){

        $sum_consumption=0;
        $sum_stock_at_hand=0;
        $sum_resupply_quantity=0;

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

        if (is_array($result)&& isset($result['dataValues'])){

            $data_values=$result["dataValues"];
            $elements_checked=array();
            $data=array();
            $count=0;
            foreach ($data_values as $data_value){

                if(isset($data_value["categoryOptionCombo"])&&in_array($data_value["categoryOptionCombo"], $categoryCombos))
                {
                    if(!is_item_in_array($elements_checked,$data_value['dataElement'])){

//                    echo $count=$count+1;
                        $dataElements=search_array($data_values,$data_value['dataElement']);
//                    echo json_encode($dataElements);
                        $consumption_val=0;
                        $resupply_quantity_val=0;
                        $stock_at_hand_val=0;

                        foreach($dataElements as $dataElement){

                            if ($dataElement["categoryOptionCombo"]===$aggregated_consumption) {
                                $consumption_val=intval($dataElement["value"]);
                            }

                            if ($dataElement["categoryOptionCombo"]===$aggregated_stock_at_hand) {
                                $stock_at_hand_val=intval($dataElement["value"]);
                            }

                            if ($dataElement["categoryOptionCombo"]===$aggregated_resupply_quantity) {

                                $resupply_quantity_val=intval($dataElement["value"]);
                            }

                        }

                        $item=array('dataElement'=>$data_value['dataElement'],
                            'consumption'=>$consumption_val,
                            'stock_at_hand'=>$stock_at_hand_val,
                            'resupply_quantity'=>$resupply_quantity_val);

                        array_push($data,$item);
                        array_push($elements_checked,$data_value['dataElement']);
                    }

                }
            }

        }
        else{
            //Do Nothing
        }


        $org_units_data=array_merge($org_units_data,$data);
    }

    $elements_checked=array();
    $data=array();

    foreach ($org_units_data as $data_value){

        if(isset($data_value['dataElement'])){

            if(!is_item_in_array($elements_checked,$data_value['dataElement'])){

                $dataElements=search_array($org_units_data,$data_value['dataElement']);

                $consumption_val=0;
                $resupply_quantity_val=0;
                $stock_at_hand_val=0;
                $months_stock=0;
//            var_dump($dataElements);
                foreach($dataElements as $dataElement){

                    if (isset($dataElement["consumption"])) {

                        $consumption_val=$consumption_val+intval($dataElement["consumption"]);
                    }

                    if (isset($dataElement["stock_at_hand"])) {
                        $stock_at_hand_val=$stock_at_hand_val+intval($dataElement["stock_at_hand"]);
                    }

                    if (isset($dataElement["resupply_quantity"])) {

                        $resupply_quantity_val=$resupply_quantity_val+intval($dataElement["resupply_quantity"]);
                    }

                }
                if($consumption_val==0){
                    $months_stock=0;
                }
                else{
                    $months_stock=bcdiv($stock_at_hand_val, $consumption_val, 2);
                }

                $item=array('dataElement'=>$data_value['dataElement'],
                    'consumption'=>$consumption_val,
                    'stock_at_hand'=>$stock_at_hand_val,
                    'resupply_quantity'=>$resupply_quantity_val,
                    'months_stock'=>$months_stock);

                array_push($data,$item);
                array_push($elements_checked,$data_value['dataElement']);
            }

        }

    }


    echo json_encode($data);

}


//    Method to Search an array and returns all items found
function search_array($array, $dataElement){
    $data=array();
    foreach( $array as $item ){
        if ( is_array( $item ) && isset( $item['dataElement'] )){
            if ( $item['dataElement'] === $dataElement ){
                array_push($data,$item);
            }
        }
    }
    return $data;
}
//    is item in the array
function is_item_in_array($array, $dataElement){

    foreach($array as $item ){
        if ( $item=== $dataElement ){
            return true;
        }
    }
    return false;
}


?>
