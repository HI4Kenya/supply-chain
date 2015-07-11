<?php
/**
 * Created by IntelliJ IDEA.
 * User: banga
 * Date: 7/10/15
 * Time: 7:46 PM
 */

$program=$_GET['program'];
$central_id=$_GET['central_id'];


$satellite_url;

$data = array("central_id" => "$central_id", "program" => "$program");
$data_string = http_build_query($data);
$satellite_url.="$data_string";

// initailizing curl
$ch = curl_init();
//curl options
curl_setopt($ch, CURLOPT_POST, false);
curl_setopt($ch, CURLOPT_URL, $satellite_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
//execute
$result = curl_exec($ch);

var_dump($result);

//close connection
curl_close($ch);

if ($result){

    echo $result;
}
else{

    echo -1;
}

//starting to load dataSet Values
start();

//function to get the name of the orgUnit
function start (){
    var jqxhr = $.getJSON(urlDataSet);
    jqxhr.done(function (response) {
        response=response.dataValues;
        var dataElements=response;
        var dataElementId=null;
        var optionComboId=null;
        var  url_link=null;
        var id=null;

        $.each(dataElements, function (key, dataElement) {
            dataElementId=dataElement.dataElement;
            optionComboId = dataElement.categoryOptionCombo;
            url_link = url+"&de=" + dataElementId + "&co=" + optionComboId+"&callback=?";
            id = "#" + dataElementId + "-" + optionComboId+"-val";
            getDataValue(url_link,id);
        });
    });

    jqxhr.error(function(jqXHR, textStatus, errorThrown)
                {
                    $('div#returned_messages').html("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> CONNECTION ERROR</span>");
                    $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:brown;'>Ensure you are logged in to <a href = 'http://test.hiskenya.org' target='_blank'>DHIS2</a></span>");
                    console.log(textStatus + ': ' + errorThrown);
                });

};


//function to get Datavalue for a data Element
var getDataValue= function(url_data, id){
    var jqxhr = $.getJSON(url_data);
    jqxhr.done(function (response) {
        result=response;
        var tableItem=$(id);
        tableItem.text(response);
    });

};



?>



