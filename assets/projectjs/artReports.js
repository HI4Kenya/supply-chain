/*function siteAnalytics()*/
function ARTAnalytics()
{
	$('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> NASCOP - ART ANALYTICS (Generate ART reports)</span>");

    var analyticsCriteria = "<div class='panel-body'>"+
                                "<div class='panel-heading' style ='width:360px;background-color:#d0eBd0;font-weight:normal;font-size:10pt;border:1px solid #a4d2a3;padding:20px'>"+
                                    // // Program
                                    // "<span>Report Program</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
                                    // "<select id = 'report_programs' style='width:100%;margin-bottom:10px' onchange='javascript:programDetails();'>"+
                                    //     "<option value = 'none selected'>[Select Program Type]</option>"+
                                    // "</select>"+

                                    "<span>Report</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
                                    "<select id = 'report_type' style = 'width:100%;margin-bottom:10px'>"+
                                        "<option value = 'none selected'>[Select]</option>"+
                                        "<option value = 'Patients By Ordering Points'>Patients By Ordering Points</option>"+
                                        "<option value = 'Patients By Regimen'>Patients By Regimen</option>"+
                                        "<option value = 'Stock Status'>Stock Status</option>"+
                                        "<option value = 'Reporting Rate'>Reporting Rate</option>"+
                                    "</select>"+
                                    "<br>"+

                                    "<span>Report Period</span><span style = 'color:red;margin-left:10px'>*</span><br>"+

                                    "<select id = 'periodType' style='width:100%' onchange='javascript:changePeriod()'>"+
                                        "<option value = 'none selected'>[Select Period Type]</option>"+
                                        // "<option value = 'daily'>Daily</option>"+
                                       //"<option value = 'weekly'>Weekly</option>"+
                                        "<option value = 'monthly'>Monthly</option>"+
                                        //"<option value = 'bi-monthly'>Bi-Monthly</option>"+
                                        //"<option value = 'quarterly'>Quarterly</option>"+
                                        //"<option value = 'six-monthly'>Six Monthly</option>"+
                                        //"<option value = 'yearly'>Yearly</option>"+
                                    "</select>"+
                                    
                                    "<select id = 'period' style = 'width:70%;margin-bottom:10px'>"+
                                    "</select>"+

                                    "<select id = 'year' style='width:30%'>"+
                                        "<option value = '2015'>2015</option>"+
                                        "<option value = '2014'>2014</option>"+
                                        "<option value = '2013'>2013</option>"+
                                        "<option value = '2012'>2012</option>"+
                                        "<option value = '2011'>2011</option>"+
                                        "<option value = '2010'>2010</option>"+
                                        "<option value = '2009'>2009</option>"+
                                        "<option value = '2008'>2008</option>"+
                                        "<option value = '2007'>2007</option>"+
                                        "<option value = '2006'>2006</option>"+
                                        "<option value = '2005'>2005</option>"+
                                        "<option value = '2004'>2004</option>"+
                                        "<option value = '2003'>2003</option>"+
                                        "<option value = '2002'>2002</option>"+
                                        "<option value = '2001'>2001</option>"+
                                        "<option value = '2000'>2000</option>"+
                                    "</select>"+
                                    "<br>"+

                                    "<span>Report Organization Unit</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
                                    "<div id = 'report_org_unit' style = 'background-color:white;padding:px;height:200px;overflow:scroll'>"+   
                                    "</div>"+

                                    "<button class = 'btn btn-success btn-sm' style = 'margin-top:10px;width:40%' onclick='javascript:getARTAnalytics()'>Get Report</button>"+
                                    "<button class = 'btn btn-danger btn-sm' style = 'margin-top:10px;margin-left:10px;width:40%;' onclick='javascript:ARTAnalytics()'>Reset</button>"+                            
                                "</div>"+
                            "</div>";

    //Fetch Programs
    var programs_url = "db/fetch/get_programs.php";
    $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");      
    $.getJSON
    (
        programs_url,
        function(receivedPrograms)
        {
            for(var counting=0; counting<receivedPrograms.length;counting++)
            {
                $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");    
                $("<option VALUE='"+receivedPrograms[counting].program_id+"'>"+receivedPrograms[counting].program_name+"</option>").appendTo("select#report_programs");
            }
            $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
        }
    );

    $('div#facilities').empty();
    $('div#facilities').html(analyticsCriteria);

    // DHIS2 Org Units Hierarchy
    $.get("client/templates/reportsorgunitshierarchy.php").then
    (
        function(responseData) 
        {
            $('div#report_org_unit').empty();
            $('div#report_org_unit').append(responseData);
        }
    );
}
/* ----------------------------------------------------------------------------------------------------------------------------------------------- */

// function getArtAnalytics()
function getARTAnalytics()
{
    var reportSelectList = document.getElementById("report_type");
    var reportSelectIndex = reportSelectList.selectedIndex; 
    var reportSelectOptions = reportSelectList.options;
    var selectedReportID = reportSelectOptions[reportSelectIndex].value;

    if(selectedReportID == "none selected")
    {
        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                "<span style ='margin-left:80px'>"+
                                    "Please select a report to generate"+
                                "</span>"+
                            "</div>";
        $("div#returned_messages").html(errorMessage);
        //Clear the error message after 1500 ms
        setTimeout
        (
            function()
            {
                $("div#returned_messages").empty();
                $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> NASCOP - ART ANALYTICS (Generate ART reports)</span>");
            },
            1500
        );
    }

    else
    {
    	var period = document.getElementById("periodType");
        var periodOptions = period.options[period.selectedIndex].value;

        if(periodOptions == "none selected")
        {
            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                    "<span style ='margin-left:80px'>"+
                                        "Please select a period type"+
                                    "</span>"+
                                "</div>";
            $("div#returned_messages").html(errorMessage);
            //Clear the error message after 1500 ms
            setTimeout
            (
                function()
                {
                    $("div#returned_messages").empty();
                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> NASCOP - ART ANALYTICS (Generate ART reports)</span>");
                },
                1500
            );
        }
        else
        {
            var reportPeriod= document.getElementById("period");
            var reportPeriodOptions = reportPeriod.options[reportPeriod.selectedIndex].value;
            if(reportPeriodOptions == "")
            {
                var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                        "<span style ='margin-left:80px'>"+
                                            "Please select a period"+
                                        "</span>"+
                                    "</div>";
                $("div#returned_messages").html(errorMessage);
                //Clear the error message after 1500 ms
                setTimeout
                (
                    function()
                    {
                        $("div#returned_messages").empty();
                        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> NASCOP - ART ANALYTICS (Generate ART reports)</span>");
                    },
                    1500
                );
            }
            else
            {
            	var orgUnitsDiv = document.getElementById("report_org_unit");
	            var selectedOrgUnit = orgUnitsDiv.getElementsByClassName("selectedFacility");
	            if(selectedOrgUnit.length < 1)
	            {
	                var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
	                                        "<span style ='margin-left:70px'>"+
	                                            "Please select an organization unit"+
	                                        "</span>"+
	                                    "</div>";
	                $("div#returned_messages").html(errorMessage);
	                //Clear the error message after 1500 ms
	                setTimeout
	                (
	                    function()
	                    {
	                        $("div#returned_messages").empty();
	                        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> NASCOP - ART ANALYTICS (Generate ART reports)</span>");
	                    },
	                    1500
	                );
	            }
	            else
	            {
	                var the_number = 0;
	                var selectedOrgUnitID = selectedOrgUnit[the_number].getAttribute("value");
	                var selectedOrgUnitLevel = selectedOrgUnit[the_number].getAttribute("level");
                    var periodOfTheReport="";
	                // Year of the report
                    var year= document.getElementById("year");
                    var yearOptions = year.options[year.selectedIndex].value;

                    // Concertenate the year with the other period options
                    if(periodOptions == "yearly")
                    {
                        periodOfTheReport = reportPeriodOptions;
                    }
                    else
                    {
                        periodOfTheReport = yearOptions+reportPeriodOptions;
                    }
	                
	                if(selectedReportID == "Patients By Ordering Points")
	                {
	                    // Patients By Ordering Points
                        generateReportPatientsByOrderingPoints(periodOfTheReport,selectedOrgUnitID,selectedOrgUnitLevel);

                    }

	                else if(selectedReportID == "Patients By Regimen")
	                {
	                  generateReportPatientsByRegimen(periodOfTheReport,selectedOrgUnitID);
	                }

	                else if(selectedReportID == "Stock Status")
	                {
                        generateStockStatusReport(periodOfTheReport,selectedOrgUnitID,selectedOrgUnitLevel);
	                }

	                else if(selectedReportID == "Reporting Rate")
	                {
                        generateReportingRateReport(periodOfTheReport,selectedOrgUnitID,selectedOrgUnitLevel);
	                }
	            }

            }
        }
    }
}


//Function to Generate Report for ART Patients By Ordering Points
function generateReportPatientsByOrderingPoints(period,orgUnitID, orgUnitLevel){

    //alert(period+""+orgUnitID+""+orgUnitLevel);
    //orgUnits for the Selected Level
    var orgUnits=[];
        //["AwVQ3uJftlj","DMF5wWYxVHg"];
    var dataSet="VoCwF0LPGjb";//"VOzBhzjvVcw";
    var mflCode="";
    var facilityName="";
    var programId=3;

    var url_facility_fmaps="api/get_facility_fmaps_report.php";
    var templateUrl="client/report_templates/art_report.php";

    $.get(templateUrl).then
    (function(responseData) {
        $.get("db/fetch/get_orgunit_level_by_name.php",
            {org_unit:orgUnitID,org_unit_level:orgUnitLevel},
            function(orgUnitName){
                //alert(orgUnitName);
                $('div#facilities').empty();
                $('div#facilities').append(responseData);
                $('#formName').append("List of ART Patients By Ordering Points");
                $('#orgUnitName').append(orgUnitName.toUpperCase());
                $('#orgUnitLevel').append(orgUnitLevel.toUpperCase());
                $('#period').append(generateYearName(period));

                $.getJSON("db/fetch/list_ordering_points.php",
                    {program_id:programId,org_unit_level:orgUnitLevel,org_unit:orgUnitID},
                    function(facilities){

                        $.each(facilities,function(key, facility){
                            orgUnits.push(facility.facility_id);
                        });

                        if(orgUnits.length==0){

                            $("#loading").empty();
                            $("#loading").append("No Ordering Points for the Organisation Level Selected");
                        }
                        else{

                            $("#loading").append('<img src="assets/img/ajax-loader-2.gif">');

                            //setTimeout(function(){
                            //    $('#loading').html("Try Loading Again");
                            //}, 60000);

                            setTimeout(function(){
                                $('#loading').html("");
                            }, 100000);


                            $.getJSON(url_facility_fmaps,
                                {dataSet:dataSet,period:period,orgUnits:orgUnits},
                                function(response){
                                    //console.log(response);
                                    $("#loading").empty();
                                    $("#formData").empty();

                                    $.each(response,function(index, obj){

                                        if(obj.orgUnit=="grand_total"){
                                            $("#grandTotal").append("<tr>" +
                                            //"<td></td>"+
                                            //"<td></td>"+
                                            "<td colspan='3'>Grand Total</td>"+
                                            "<td>"+obj.data.adult_art+"</td>"+
                                            "<td>"+obj.data.adult_pep+"</td>"+
                                            "<td>"+obj.data.adult_pmtct+"</td>"+
                                            "<td>"+obj.data.paediatric_art+"</td>"+
                                            "<td>"+obj.data.paediatric_pep+"</td>"+
                                            "<td>"+obj.data.paediatric_pmtct+"</td>"+
                                            "<tr>");
                                        }
                                        else{
                                            var facility=$.grep(facilities, function(e){ return e.facility_id==obj.orgUnit;});
                                            mflCode=facility[0].mfl_code;
                                            facilityName=facility[0].facility_name;

                                           $('#formData').append("<tr>" +
                                            "<td>"+(index+1)+"</td>"+
                                            "<td>"+mflCode+"</td>"+
                                            "<td>"+facilityName+"</td>"+
                                            "<td>"+obj.data.adult_art+"</td>"+
                                            "<td>"+obj.data.adult_pep+"</td>"+
                                            "<td>"+obj.data.adult_pmtct+"</td>"+
                                            "<td>"+obj.data.paediatric_art+"</td>"+
                                            "<td>"+obj.data.paediatric_pep+"</td>"+
                                            "<td>"+obj.data.paediatric_pmtct+"</td>"+
                                            "<tr>");
                                        }
                                    });
                                });
                        }
                    });


            });
    });
}


// function to generate report by Regimen
function generateReportPatientsByRegimen(period,orgUnitID) {

    // alert(period+""+orgUnitID+);
    //orgUnits for the Selected Level
    var dataSet = "VOzBhzjvVcw";
    var id = "Js2jIKhWf6P";
    var url_regimen_report = "api/valuesets.php";
    var templateUrl = "client/report_templates/patients_regimen_report.php";

    var urlDataSetTemplate = "api/get_dataset_template.php";
    $.get(templateUrl).then
    (function (responseData) {
        $('div#facilities').empty();
        $('div#facilities').append(responseData);
        $('#formName').append("Summary report patients by Regimen");
        $('#period').append(generateYearName(period));
        $("#loading").append('<img src="assets/img/ajax-loader-2.gif">');
        $.getJSON(url_regimen_report,
            {dataSet: dataSet, period: period, orgUnit: id},
            function (obj) {
                console.log(obj);
                // console.log(response);
                $("#loading").empty();
                $("#formData").empty();

                $("#formData").append("<tr>" +
                "<td>" + obj.data.adult_art + "</td>" +
                "<td>" + obj.data.pep_adults + "</td>" +
                "<td>" + obj.data.pmtct_women + "</td>" +
                "<td>" + obj.data.paediatric_art + "</td>" +
                "<td>" + obj.data.pep_children + "</td>" +
                "<td>" + obj.data.ipt + "</td>" +
                "<tr>");
            });

    });

}

//Function to Generate Stock Status Report
function generateStockStatusReport(period,orgUnitID, orgUnitLevel){

    var dataElements=null;
    $.getJSON("api/dataElements.json", function (response) {

        dataElements=response.dataElements;

        console.log(dataElements);
        //orgUnits for the Selected Level
        var orgUnits=[];//["AwVQ3uJftlj","Js2jIKhWf6P"];
        var dataSet="rV6fPhufzlU";  //"VOzBhzjvVcw";
        var dataElementName="";
        var facilityName="";
        var programId=3;

        var url_facility_fmaps="api/get_stock_status.php";
        var templateUrl="client/report_templates/stock_status_report.php";

        $.get(templateUrl).then
        (function(responseData) {
            $.get("db/fetch/get_orgunit_level_by_name.php",
                {org_unit:orgUnitID,org_unit_level:orgUnitLevel},
                function(orgUnitName){
                    //alert(orgUnitName);
                    $('div#facilities').empty();
                    $('div#facilities').append(responseData);
                    $('#formName').append("List of ART Service Points");
                    $('#orgUnitName').append(orgUnitName.toUpperCase());
                    $('#orgUnitLevel').append(orgUnitLevel.toUpperCase());
                    $('#period').append(generateYearName(period));

                    $.getJSON("db/fetch/list_service_points.php",
                        {program_id:programId,org_unit_level:orgUnitLevel,org_unit:orgUnitID},
                        function(facilities){

                            $.each(facilities,function(key, facility){
                                orgUnits.push(facility.facility_id);
                            });

                            if(orgUnits.length==0){

                                $("#loading").empty();
                                $("#loading").append("No DataElements available");
                            }
                            else{

                                $("#loading").append('<img src="assets/img/ajax-loader-2.gif">');

                                //setTimeout(function(){
                                //    $('#loading').html("Try Loading Again");
                                //}, 50000);

                                setTimeout(function(){
                                    $('#loading').html("");
                                }, 100000);


                                $.getJSON(url_facility_fmaps,
                                    {dataSet:dataSet,period:period,orgUnits:orgUnits},
                                    function(response){
                                        //console.log(response);
                                        $("#loading").empty();
                                        $("#formData").empty();

                                        $.each(response,function(index, obj){

                                            var objData=$.grep(dataElements, function(e){ return e.id==obj.dataElement;});
                                            console.log(objData);
                                            dataElementName=objData[0].name;

                                            $('#formData').append("<tr>" +
                                            "<td>"+(index+1)+"</td>"+
                                            "<td>"+dataElementName+"</td>"+
                                            "<td>"+obj.consumption+"</td>"+
                                            "<td>"+obj.stock_at_hand+"</td>"+
                                            "<td>"+obj.resupply_quantity+"</td>"+
                                            "<td>"+obj.months_stock+"</td>"+
                                            "<tr>");
                                        });
                                    });
                            }
                        });


                });
        });


    });
}

//Function to Generate Reporting Rate Report for Ordering Points
function generateReportingRateReport(period,orgUnitID, orgUnitLevel){

    //alert(period+""+orgUnitID+""+orgUnitLevel);
    //orgUnits for the Selected Level
    var orgUnits=[];
    var dataSet="HAcToQkdUS1";
    var mflCode="";
    var facilityName="";
    var programId=1;

    var url_reporting_rate="api/get_reporting_rate.php";
    var templateUrl="client/report_templates/reporting_rate_report.php";

    $.get(templateUrl).then
    (function(responseData) {
        $.get("db/fetch/get_orgunit_level_by_name.php",
            {org_unit:orgUnitID,org_unit_level:orgUnitLevel},
            function(orgUnitName){
                //alert(orgUnitName);
                $('div#facilities').empty();
                $('div#facilities').append(responseData);
                $('#formName').append("Reporting Rate For Central Sites And Sub-County Stores");
                $('#orgUnitName').append(orgUnitName.toUpperCase());
                $('#orgUnitLevel').append(orgUnitLevel.toUpperCase());
                $('#period').append(generateYearName(period));

                $.getJSON("db/fetch/get_ordering_points.php",
                    {program_id:programId,org_unit_level:orgUnitLevel,org_unit:orgUnitID},
                    function(facilities){

                        $.each(facilities,function(key, facility){
                            orgUnits.push(facility.facility_id);
                        });

                        if(orgUnits.length==0){

                            $("#loading").empty();
                            $("#loading").append("No Ordering Points for the Organisation Level Selected");
                        }
                        else{

                            $("#loading").append('<img src="assets/img/ajax-loader-2.gif">');

                            //setTimeout(function(){
                            //    $('#loading').html("Try Loading Again");
                            //}, 60000);

                            setTimeout(function(){
                                $('#loading').html("");
                            }, 100000);


                            $.getJSON(url_reporting_rate,
                                {dataSet:dataSet,period:period,orgUnits:orgUnits,programId:programId},
                                function(response){
                                    //console.log(response);
                                    $("#loading").empty();
                                    $("#formData").empty();

                                    $.each(response,function(index, obj){

                                        $.get("db/fetch/get_ordering_point_type.php",
                                            {program_id:programId,facility_id:obj.orgUnit}, function (type) {

                                                var orderingPointType=type;
                                                var facility=$.grep(facilities, function(e){ return e.facility_id==obj.orgUnit;});
                                                mflCode=facility[0].mfl_code;
                                                facilityName=facility[0].facility_name;

                                                $('#formData').append("<tr>" +
                                                "<td>"+(index+1)+"</td>"+
                                                "<td>"+mflCode+"</td>"+
                                                "<td>"+facilityName+"</td>"+
                                                "<td>"+orderingPointType+"</td>"+
                                                "<td>"+obj.reports+"</td>"+
                                                "<td>"+obj.reported+"</td>"+
                                                "<td>"+obj.reporting_rate+"</td>"+
                                                "<tr>");

                                            });
                                    });
                                });
                        }
                    });

            });
    });
}

//Function for formatting the date
function generateYearName(date){
    var str = date;
    var res = str.slice(-2);
    var year=str.substring(0, 4);

    if(res=="01"){

        return "January-"+year;
    }
    if(res=="02"){

        return "February-"+year;
    }
    if(res=="03"){

        return "March-"+year;
    }
    if(res=="04"){
        return "April-"+year;
    }
    if(res=="05"){
        return "May-"+year;
    }
    if(res=="06"){

        return "June-"+year;
    }
    if(res=="07"){
        return "July-"+year;
    }
    if(res=="08"){

        return "August-"+year;
    }
    if(res=="09"){

        return "September-"+year;
    }
    if(res=="10"){
        return "October-"+year;
    }
    if(res=="11"){
        return "November-"+year;
    }
    if(res=="12"){

        return "December-"+year;
    }

}


