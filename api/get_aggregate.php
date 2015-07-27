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
        if(isset($_GET['pe'])&&isset($_GET['orgUnits'])&&isset($_GET['co'])&&isset($_GET['de'])
            &&isset($_GET['prefix'])&&isset($_GET['prefix_replace'])){

            $period = $_GET['pe'];
            $orgUnits = $_GET['orgUnits'];
            $categoryCombo = $_GET['co'];
            $dataElement =$_GET['de'];
            $prefix=$_GET['prefix'];
            $prefix_replace=$_GET['prefix_replace'];

            $sum=0;

            //Data Element ID
            $url_dataElement = $dhis_url."/api/dataElements/"."$dataElement";
            $url_dataValues = $dhis_url."/api/dataValues?";

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
            //    $url_dataElements=$dhis_url."/api/dataElements?paging=false";
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

            if(isset($dataElements["dataElements"]))
            {
                $dataElements=$dataElements["dataElements"];

                //case insenstivie search for the DataElement Name
                $key = array_search(strtolower($form_name), array_map('strtolower',array_column($dataElements, 'name')));
                //   $key = array_search($form_name, array_column($dataElements, 'name'));

                if($key){

                    $dataElement=$dataElements[$key]["id"];
                }


                foreach ($orgUnits as $orgUnit) {

                    $data = array("de" => "$dataElement", "pe" => "$period", "ou" => "$orgUnit","co" => "$categoryCombo");
                    $data_string = http_build_query($data);
                    $url=$url_dataValues ."$data_string";

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

                    if (is_array(json_decode($result, true)) && isset($result[0])){
                        $result=json_decode($result);
                        $data=intval($result[0]);
                        $sum=$sum+$data;
                    }

                }

                echo $sum;

            }


        }

    }
?>
