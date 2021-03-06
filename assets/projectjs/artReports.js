/*function siteAnalytics()*/
function ARTAnalytics() {
    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> NASCOP - ART ANALYTICS (Generate ART reports)</span>");

    var analyticsCriteria = "<div class='panel-body'>" +
        "<div class='panel-heading' style ='width:360px;background-color:#d0eBd0;font-weight:normal;font-size:10pt;border:1px solid #a4d2a3;padding:20px'>" +
            // // Program
            // "<span>Report Program</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
            // "<select id = 'report_programs' style='width:100%;margin-bottom:10px' onchange='javascript:programDetails();'>"+
            //     "<option value = 'none selected'>[Select Program Type]</option>"+
            // "</select>"+

        "<span>Report</span><span style = 'color:red;margin-left:10px'>*</span><br>" +
        "<select id = 'report_type' style = 'width:100%;margin-bottom:10px'>" +
        "<option value = 'none selected'>[Select]</option>" +
        "<option value = 'Patients By Ordering Points'>Patients By Ordering Points</option>" +
        "<option value = 'Patients By Regimen'>Patients By Regimen</option>" +
        "<option value = 'Stock Status'>Stock Status</option>" +
        "<option value = 'Reporting Rate'>Reporting Rate</option>" +
        "</select>" +
        "<br>" +

        "<span>Report Period</span><span style = 'color:red;margin-left:10px'>*</span><br>" +

        "<select id = 'periodType' style='width:100%' onchange='javascript:changePeriod()'>" +
        "<option value = 'none selected'>[Select Period Type]</option>" +
            // "<option value = 'daily'>Daily</option>"+
            //"<option value = 'weekly'>Weekly</option>"+
        "<option value = 'monthly'>Monthly</option>" +
            //"<option value = 'bi-monthly'>Bi-Monthly</option>"+
            //"<option value = 'quarterly'>Quarterly</option>"+
            //"<option value = 'six-monthly'>Six Monthly</option>"+
            //"<option value = 'yearly'>Yearly</option>"+
        "</select>" +

        "<select id = 'period' style = 'width:70%;margin-bottom:10px'>" +
        "</select>" +

        "<select id = 'year' style='width:30%'>" +
        "</select>" +
        "<br>" +

        "<span>Report Organization Unit</span><span style = 'color:red;margin-left:10px'>*</span><br>" +
        "<div id = 'report_org_unit' style = 'background-color:white;padding:px;height:200px;overflow:scroll'>" +
        "</div>" +

        "<button class = 'btn btn-success btn-sm' style = 'margin-top:10px;width:40%' onclick='javascript:getARTAnalytics()'>Get Report</button>" +
        "<button class = 'btn btn-danger btn-sm' style = 'margin-top:10px;margin-left:10px;width:40%;' onclick='javascript:ARTAnalytics()'>Reset</button>" +
        "</div>" +
        "</div>";

    //Fetch Programs
    var programs_url = "db/fetch/get_programs.php";
    $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");
    $.getJSON
    (
        programs_url,
        function (receivedPrograms) {
            for (var counting = 0; counting < receivedPrograms.length; counting++) {
                $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");
                $("<option VALUE='" + receivedPrograms[counting].program_id + "'>" + receivedPrograms[counting].program_name + "</option>").appendTo("select#report_programs");
            }
            $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");
        }
    );

    $('div#facilities').empty();
    $('div#facilities').html(analyticsCriteria);

    // DHIS2 Org Units Hierarchy
    $.get("client/templates/reportsorgunitshierarchy.php").then
    (
        function (responseData) {
            $('div#report_org_unit').empty();
            $('div#report_org_unit').append(responseData);
        }
    );

    var currentYear = new Date().getFullYear();
    var d1=new Date(2001, 1, 01);
    var d2=new Date();

    var milli=d2-d1;
    var milliPerYear=1000*60*60*24*365.26;

    var yearsApart=milli/milliPerYear;

    $('select#period').empty();
    for(var i = 0; i<yearsApart; i++)
    {
        $("<option value = '2015'>"+(currentYear-i)+"</option>").appendTo("select#year");
    }
}
/* ----------------------------------------------------------------------------------------------------------------------------------------------- */

// function getArtAnalytics()
function getARTAnalytics() {
    var reportSelectList = document.getElementById("report_type");
    var reportSelectIndex = reportSelectList.selectedIndex;
    var reportSelectOptions = reportSelectList.options;
    var selectedReportID = reportSelectOptions[reportSelectIndex].value;

    if (selectedReportID == "none selected") {
        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>" +
            "<span style ='margin-left:80px'>" +
            "Please select a report to generate" +
            "</span>" +
            "</div>";
        $("div#returned_messages").html(errorMessage);
        //Clear the error message after 1500 ms
        setTimeout
        (
            function () {
                $("div#returned_messages").empty();
                $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> NASCOP - ART ANALYTICS (Generate ART reports)</span>");
            },
            1500
        );
    }

    else {
        var period = document.getElementById("periodType");
        var periodOptions = period.options[period.selectedIndex].value;

        if (periodOptions == "none selected") {
            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>" +
                "<span style ='margin-left:80px'>" +
                "Please select a period type" +
                "</span>" +
                "</div>";
            $("div#returned_messages").html(errorMessage);
            //Clear the error message after 1500 ms
            setTimeout
            (
                function () {
                    $("div#returned_messages").empty();
                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> NASCOP - ART ANALYTICS (Generate ART reports)</span>");
                },
                1500
            );
        }
        else {
            var reportPeriod = document.getElementById("period");
            var reportPeriodOptions = reportPeriod.options[reportPeriod.selectedIndex].value;
            if (reportPeriodOptions == "") {
                var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>" +
                    "<span style ='margin-left:80px'>" +
                    "Please select a period" +
                    "</span>" +
                    "</div>";
                $("div#returned_messages").html(errorMessage);
                //Clear the error message after 1500 ms
                setTimeout
                (
                    function () {
                        $("div#returned_messages").empty();
                        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> NASCOP - ART ANALYTICS (Generate ART reports)</span>");
                    },
                    1500
                );
            }
            else {
                var orgUnitsDiv = document.getElementById("report_org_unit");
                var selectedOrgUnit = orgUnitsDiv.getElementsByClassName("selectedFacility");
                if (selectedOrgUnit.length < 1) {
                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>" +
                        "<span style ='margin-left:70px'>" +
                        "Please select an organization unit" +
                        "</span>" +
                        "</div>";
                    $("div#returned_messages").html(errorMessage);
                    //Clear the error message after 1500 ms
                    setTimeout
                    (
                        function () {
                            $("div#returned_messages").empty();
                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> NASCOP - ART ANALYTICS (Generate ART reports)</span>");
                        },
                        1500
                    );
                }
                else {
                    var the_number = 0;
                    var selectedOrgUnitID = selectedOrgUnit[the_number].getAttribute("value");
                    var selectedOrgUnitLevel = selectedOrgUnit[the_number].getAttribute("level");
                    var periodOfTheReport = "";
                    // Year of the report
                    var year = document.getElementById("year");
                    var yearOptions = year.options[year.selectedIndex].value;

                    // Concertenate the year with the other period options
                    if (periodOptions == "yearly") {
                        periodOfTheReport = reportPeriodOptions;
                    }
                    else {
                        periodOfTheReport = yearOptions + reportPeriodOptions;
                    }

                    if (selectedReportID == "Patients By Ordering Points") {
                        // Patients By Ordering Points
                        generateReportPatientsByOrderingPoints(periodOfTheReport, selectedOrgUnitID, selectedOrgUnitLevel);

                    }
                    else if (selectedReportID == "Patients By Regimen") {
                        generateReportPatientsByRegimen(periodOfTheReport, selectedOrgUnitID, selectedOrgUnitLevel);
                    }

                    //else if(selectedReportID == "Patients By Regimen")
                    //{
                    //    generatePatientsRegimenReport(periodOfTheReport,selectedOrgUnitID,selectedOrgUnitLevel);
                    //}

                    else if (selectedReportID == "Stock Status") {
                        generateStockStatusReport(periodOfTheReport, selectedOrgUnitID, selectedOrgUnitLevel);
                    }

                    else if (selectedReportID == "Reporting Rate") {
                        generateReportingRateReport(periodOfTheReport, selectedOrgUnitID, selectedOrgUnitLevel);
                    }
                }

            }
        }
    }
}


//Function to Generate Report for ART Patients By Ordering Points
function generateReportPatientsByOrderingPoints(period, orgUnitID, orgUnitLevel) {

    //alert(period+""+orgUnitID+""+orgUnitLevel);
    //orgUnits for the Selected Level
    var orgUnits = [];
    //["AwVQ3uJftlj","DMF5wWYxVHg"];
    var dataSet = "VoCwF0LPGjb";//"VOzBhzjvVcw";
    var mflCode = "";
    var facilityName = "";
    var programId = 3;

    var url_facility_fmaps = "api/get_facility_fmaps_report.php";
    var templateUrl = "client/report_templates/art_report.php";

    var heading = "<span style = 'color:green;margin-left:30px'>" +
        "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>" +
        "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>" +
        "</span>" +
        "&nbsp <span style = 'color:black'>|</span>" +
        "List of ART Patients By Ordering Points" +
        "<div class='col-md-offset-10' style = 'margin-top:-30px'>" +
        "<span>" +
        "<a  class='btn btn-default' download='list_of_patients_by_ordering_points_" + orgUnitLevel + ".xls' href='#'" +
        "onclick='return ExcellentExport.excel(this, \"artReport\", \"reportTitle\");'>" +
        "<i class='fa fa-file-excel-o'></i>Export" +
        "</a>" +
        "</span>" +
        "</div>" +
        "</span>";

    $('div#returned_messages').html(heading);

    $.get(templateUrl).then
    (function (responseData) {
        $.get("db/fetch/get_orgunit_level_by_name.php",
            {org_unit: orgUnitID, org_unit_level: orgUnitLevel},
            function (orgUnitName) {
                //alert(orgUnitName);
                $('div#facilities').empty();
                $('div#facilities').append(responseData);
                $('#formName').append("List of ART Patients By Ordering Points");
                $('#orgUnitName').append(orgUnitName.toUpperCase());
                $('#orgUnitLevel').append(orgUnitLevel.toUpperCase());
                $('#period').append(generateYearName(period));

                $.getJSON("db/fetch/get_ordering_points.php",
                    {org_unit_level: orgUnitLevel, org_unit: orgUnitID},
                    function (facilities) {

                        $.each(facilities, function (key, facility) {
                            orgUnits.push(facility.facility_id);
                        });

                        if (orgUnits.length == 0) {

                            $("#loading").empty();
                            $("#loading").append("<p class='text-danger'>No Ordering Points for the Organisation Level Selected<p>");
                        }
                        else {

                            $("#loading").append('<img src="assets/img/ajax-loader-2.gif">');

                            setTimeout(function () {
                                $('#loading').html("");
                            }, 100000);


                            $.getJSON(url_facility_fmaps,
                                {dataSet: dataSet, period: period, orgUnits: orgUnits},
                                function (response) {
                                    //console.log(response);
                                    $("#loading").empty();
                                    $("#formData").empty();

                                    $.each(response, function (index, obj) {

                                        if (obj.orgUnit == "grand_total") {
                                            $("#grandTotal").append("<tr>" +
                                                //"<td></td>"+
                                                //"<td></td>"+
                                            "<td colspan='3'>Grand Total</td>" +
                                            "<td>" + obj.data.adult_art + "</td>" +
                                            "<td>" + obj.data.adult_pep + "</td>" +
                                            "<td>" + obj.data.adult_pmtct + "</td>" +
                                            "<td>" + obj.data.paediatric_art + "</td>" +
                                            "<td>" + obj.data.paediatric_pep + "</td>" +
                                            "<td>" + obj.data.paediatric_pmtct + "</td>" +
                                            "<tr>");
                                        }
                                        else {
                                            var facility = $.grep(facilities, function (e) {
                                                return e.facility_id == obj.orgUnit;
                                            });
                                            mflCode = facility[0].mfl_code;
                                            facilityName = facility[0].facility_name;

                                            $('#formData').append("<tr>" +
                                            "<td>" + (index + 1) + "</td>" +
                                            "<td>" + mflCode + "</td>" +
                                            "<td>" + facilityName + "</td>" +
                                            "<td>" + obj.data.adult_art + "</td>" +
                                            "<td>" + obj.data.adult_pep + "</td>" +
                                            "<td>" + obj.data.adult_pmtct + "</td>" +
                                            "<td>" + obj.data.paediatric_art + "</td>" +
                                            "<td>" + obj.data.paediatric_pep + "</td>" +
                                            "<td>" + obj.data.paediatric_pmtct + "</td>" +
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
function generateReportPatientsByRegimen(period, orgUnitID, orgUnitLevel) {
   
    var url_regimen_report = "api/get_patients_regimen_report.php";
    var programId = 3;
    var orgUnits = [];
    var dataSet = "VoCwF0LPGjb";
    var urlDataSetTemplate = "api/get_dataset_template.php";

    $.getJSON(urlDataSetTemplate,
        {dataSet: dataSet},
        function (htmlForm) {
            if (htmlForm.toString() == "-1") {
               alert("No organisation Units under the selected Level");
            }

            $.get("db/fetch/get_orgunit_level_by_name.php",
                {org_unit: orgUnitID, org_unit_level: orgUnitLevel},
                function (orgUnitName) {

                    var heading = "<span style = 'color:green;margin-left:30px'>" +
                        "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>" +
                        "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>" +
                        "</span>" +
                        "&nbsp <span style = 'color:black'>|</span>" +
                        "Report On Patients By Regimen " +
                        "<span id='loading' style='color: black'>|Loading</span>"+
                        "<div class='col-md-offset-10' style = 'margin-top:-30px'>" +
                        "<span>" +
                        "<a  class='btn btn-default' download='patients_by_regimen_" + orgUnitLevel + ".xls' href='#'" +
                        "onclick='return ExcellentExport.excel(this, \"facilities\", \"reportTitle\");'>" +
                        "<i class='fa fa-file-excel-o'></i>Export" +
                        "</a>" +
                        "</span>" +
                        "</div>";

                    var data = "<div class='panel panel-default' style = 'margin-left:-30px;margin-top:0px'>" +
                        "<div class='panel-heading' style = 'color:black'>" +
                        "<span class='panel-title' id='reportTitle' style = 'font-family:font awesome'>" +
                        "<span>Pipeline: " +
                        "<span style = 'font-size:11pt;color:green'>KEMSA</span>" +
                        "</span><br>" +
                        "<span>Report: " +
                        "<span style = 'font-size:11pt;color:green'>Patients by Regimen Report</span>" +
                        "</span><br>" +
                        "<span>Level: "+
                        "<span id = 'report_level' style = 'font-size:11pt;color:green'>"+orgUnitLevel+"-"+orgUnitName+
                        "</span>" +
                        "</span><br>" +
                        "<span>Date Generated: <span style = 'color:green;font-size:11pt'>" + dateGenerated + "</span></span><br>" +
                        "</span>" +
                        "</div>";

                    var summaryTableARVPatients="<table class = 'table table-responsive table-striped' style = 'border-radius:5px;width:600px;margin-top:10px;'>" +
                        "<h3 style = 'margin-left:15px'>Summary for Patients on ARVs</h3>"+
                        "<thead>" +
                        "<th style = 'font-weight:bold'>Category</th>" +
                        "<th style = 'font-weight:bold'>Total</th>" +
                        "</thead>" +
                        "<tbody id = 'formData'>" +
                        "</tbody>" +
                        "</table>" +
                        "</div>";

                    var summaryTableOIPatients="<table class = 'table table-responsive table-striped' style = 'border-radius:5px;width:600px;margin-top:10px;'>" +
                        "<h3 style = 'margin-left:15px'>Summary for Patients on OI medicines</h3>"+
                        "<thead>" +
                        "<th style = 'font-weight:bold'>Category</th>" +
                        "<th style = 'font-weight:bold'>Total</th>" +
                        "</thead>" +
                        "<tbody id = 'formDataOI'>" +
                        "</tbody>" +
                        "</table>" +
                        "</div>";

                    $('div#returned_messages').html(heading);

                    $('div#facilities').empty();
                    $('div#facilities').html(data);
                    $("div#facilities").append(htmlForm.dataEntryForm.htmlCode);
                    $("input").prop('disabled', true);
                    $("div#facilities").append(summaryTableARVPatients);
                    $("div#facilities").append(summaryTableOIPatients);
                    $("#formName").append(htmlForm.dataEntryForm.name);


                    $.getJSON("db/fetch/get_ordering_points.php",
                        {org_unit_level: orgUnitLevel, org_unit: orgUnitID},
                        function (facilities) {
                            $.each(facilities, function (key, facility) {

                                orgUnits.push(facility.facility_id);
                            });

                            $("#loading").append('<img src="assets/img/ajax-loader-2.gif">');

                            if (orgUnits.length == 0) {
                                $("#loading").empty();
                                $("#loading").append("<p class='text-danger'>No organisation Units Available</p>");
                            }
                            else {
                                $.getJSON(url_regimen_report,
                                    {dataSet: dataSet, period: period, orgUnits: orgUnits},
                                    function (response) {

                                        $("#loading").empty();

                                        var responseDataAdultART = response.adult_art;
                                        var responseDataPaediatricArt = response.paediatric_art;
                                        var responseDataPaediatricPep = response.paediatric_pep;
                                        var responseDataAdultPep = response.adult_pep;
                                        var responseDataAdultPmtct = response.adult_pmtct;
                                        var responseDataPaediatricPmtct = response.paediatric_pmtct;
                                        var responseDataipt=response.ipt;
                                        var responseDataUniversalProphyliaxis=response.Universal_prophylaxis;
                                        var responseDataMenengaitis=response.Cryptococcal_meningitis;
                                        var responseDataCategory = response.category;

                                        $.each(responseDataAdultART, function (index, obj) {
                                            var dataElementId = obj.dataElement;
                                            var optionComboId = "u4jRrJ0vVm6";
                                            var id = "#" + dataElementId + "-" + optionComboId + "-val";
                                            var tableItem = $(id);
                                            tableItem.val(obj.value);
                                        });

                                        $.each(responseDataPaediatricArt, function (index, obj) {
                                            var dataElementId = obj.dataElement;
                                            var optionComboId = "u4jRrJ0vVm6";
                                            var id = "#" + dataElementId + "-" + optionComboId + "-val";
                                            var tableItem = $(id);
                                            tableItem.val(obj.value);
                                        });
                                        $.each(responseDataPaediatricPep, function (index, obj) {
                                            var dataElementId = obj.dataElement;
                                            var optionComboId = "u4jRrJ0vVm6";
                                            var id = "#" + dataElementId + "-" + optionComboId + "-val";
                                            var tableItem = $(id);
                                            tableItem.val(obj.value);
                                        });
                                        $.each(responseDataAdultPep, function (index, obj) {
                                            var dataElementId = obj.dataElement;
                                            var optionComboId = "u4jRrJ0vVm6";
                                            var id = "#" + dataElementId + "-" + optionComboId + "-val";
                                            var tableItem = $(id);
                                            tableItem.val(obj.value);
                                        });
                                        $.each(responseDataAdultPmtct, function (index, obj) {
                                            var dataElementId = obj.dataElement;
                                            var optionComboId = "u4jRrJ0vVm6";
                                            var id = "#" + dataElementId + "-" + optionComboId + "-val";
                                            var tableItem = $(id);
                                            tableItem.val(obj.value);
                                        });
                                        $.each(responseDataPaediatricPmtct, function (index, obj) {
                                            var dataElementId = obj.dataElement;
                                            var optionComboId = "u4jRrJ0vVm6";
                                            var id = "#" + dataElementId + "-" + optionComboId + "-val";
                                            var tableItem = $(id);
                                            tableItem.val(obj.value);
                                        });
                                        $.each(responseDataipt, function (index, obj) {
                                            var dataElementId = obj.dataElement;
                                            var optionComboId = "u4jRrJ0vVm6";
                                            var id = "#" + dataElementId + "-" + optionComboId + "-val";
                                            var tableItem = $(id);
                                            tableItem.val(obj.value);
                                        });
                                        $.each(responseDataUniversalProphyliaxis, function (index, obj) {
                                            var dataElementId = obj.dataElement;
                                            var optionComboId = "u4jRrJ0vVm6";
                                            var id = "#" + dataElementId + "-" + optionComboId + "-val";
                                            var tableItem = $(id);
                                            tableItem.val(obj.value);
                                        });
                                        $.each(responseDataMenengaitis, function (index, obj) {
                                            var dataElementId = obj.dataElement;
                                            var optionComboId = "u4jRrJ0vVm6";
                                            var id = "#" + dataElementId + "-" + optionComboId + "-val";
                                            var tableItem = $(id);
                                            tableItem.val(obj.value);
                                        });

                                        $('#formData').append("<tr class='text-left'>" +
                                            "<td>Adult ART Patients </td><td>" + responseDataCategory.adult_art + "</td>" +
                                            "<tr>" +
                                            "<tr>" +
                                            "<td>Paediatric ART Patients </td><td>" + responseDataCategory.paediatric_art + "</td>" +
                                            "<tr>" +
                                            "<tr>" +
                                            "<td>PEP Adults </td><td>" + responseDataCategory.adult_pep + "</td>" +
                                            "<tr>" +
                                            "<tr>" +
                                            "<td>PEP Children </td><td>" + responseDataCategory.paediatric_pep + "</td>" +
                                            "<tr>" +
                                            "<tr>" +
                                            "<td>PMTCT Women </td><td>" + responseDataCategory.adult_pmtct + "</td>" +
                                            "<tr>"+
                                            "<tr>" 
                                        );
                                        
                                        $('#formDataOI').append("<tr class='text-left'>" +
                                            "<td>Universal prophylaxis</td><td>" + responseDataCategory.universal_prophylaxis+ "</td>" +
                                            "<tr>" +
                                            "<tr>" +
                                            "<td>IPT </td><td>" + responseDataCategory.ipt + "</td>" +
                                            "<tr>" +
                                            "<tr>" +
                                            "<td>Diflucan Program </td><td>" + responseDataCategory.Cryptococcal_meningitis + "</td>" +
                                            "<tr>"+
                                            "<tr>" 
                                        );
                                    });
                            }
                        });


                });
        });

}

//Function to Generate Stock Status Report
function generateStockStatusReport(period, orgUnitID, orgUnitLevel) {

    var dataElements = null;
    $.getJSON("api/dataElements.json", function (response) {

        dataElements = response.dataElements;

        //orgUnits for the Selected Level
        var orgUnits = [];//["AwVQ3uJftlj","Js2jIKhWf6P"];
        var dataSet = "rV6fPhufzlU";  //"VOzBhzjvVcw";
        var dataElementName = "";
        var facilityName = "";
        var programId = 3;

        var url_stock_status = "api/get_stock_status.php";
        var templateUrl = "client/report_templates/stock_status_report.php";

        var heading = "<span style = 'color:green;margin-left:30px'>" +
            "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>" +
            "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>" +
            "</span>" +
            "&nbsp <span style = 'color:black'>|</span>" +
            "Stock Status Report" +
            "<div class='col-md-offset-10' style = 'margin-top:-30px'>" +
            "<span>" +
            "<a  class='btn btn-default' download='stock_status_report_" + orgUnitLevel + ".xls' href='#'" +
            "onclick='return ExcellentExport.excel(this, \"artReport\", \"reportTitle\");'>" +
            "<i class='fa fa-file-excel-o'></i>Export" +
            "</a>" +
            "</span>" +
            "</div>" +
            "</span>";

        $('div#returned_messages').html(heading);

        $.get(templateUrl).then
        (function (responseData) {
            $.get("db/fetch/get_orgunit_level_by_name.php",
                {org_unit: orgUnitID, org_unit_level: orgUnitLevel},
                function (orgUnitName) {
                    //alert(orgUnitName);
                    $('div#facilities').empty();
                    $('div#facilities').append(responseData);
                    $('#formName').append("Stock status report by selected level");
                    $('#orgUnitName').append(orgUnitName.toUpperCase());
                    $('#orgUnitLevel').append(orgUnitLevel.toUpperCase());
                    $('#period').append(generateYearName(period));

                    $.getJSON("db/fetch/get_ordering_points.php",
                        {org_unit_level: orgUnitLevel, org_unit: orgUnitID},
                        function (facilities) {

                            $.each(facilities, function (key, facility) {
                                orgUnits.push(facility.facility_id);
                            });

                            if (orgUnits.length == 0) {

                                $("#loading").empty();
                                $("#loading").append("<p class='text-danger'>No DataElements Available</p>");
                            }
                            else {

                                $("#loading").append('<img src="assets/img/ajax-loader-2.gif">');

                                //setTimeout(function(){
                                //    $('#loading').html("Try Loading Again");
                                //}, 50000);

                                setTimeout(function () {
                                    $('#loading').html("");
                                }, 100000);


                                $.getJSON(url_stock_status,
                                    {dataSet: dataSet, period: period, orgUnits: orgUnits},
                                    function (response) {
                                        //console.log(response);
                                        $("#loading").empty();
                                        $("#formData").empty();

                                        $.each(response, function (index, obj) {

                                            var objData = $.grep(dataElements, function (e) {
                                                return e.id == obj.dataElement;
                                            });
                                            dataElementName = objData[0].name;
                                            dataElementName=dataElementName.replace(/MOH 730A/gi,"");

                                            $('#formData').append("<tr class='text-left'>" +
                                            "<td>" + (index + 1) + "</td>" +
                                            "<td>" + dataElementName + "</td>" +
                                            "<td>" + obj.consumption + "</td>" +
                                            "<td>" + obj.stock_at_hand + "</td>" +
                                            "<td>" + obj.resupply_quantity + "</td>" +
                                            "<td>" + obj.months_stock + "</td>" +
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
function generateReportingRateReport(period, orgUnitID, orgUnitLevel) {

    //alert(period+""+orgUnitID+""+orgUnitLevel);
    //orgUnits for the Selected Level
    var orgUnits = [];
    var dataSet = "HAcToQkdUS1";
    var mflCode = "";
    var facilityName = "";
    var programId = 3;

    var url_reporting_rate = "api/get_reporting_rate.php";
    var templateUrl = "client/report_templates/reporting_rate_report.php";

    var heading = "<span style = 'color:green;margin-left:30px'>" +
        "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>" +
        "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>" +
        "</span>" +
        "&nbsp <span style = 'color:black'>|</span>" +
        "Reporting Rate" +
        "<div class='col-md-offset-10' style = 'margin-top:-30px'>" +
        "<span>" +
        "<a  class='btn btn-default' download='reporting_rate_report_" + orgUnitLevel + ".xls' href='#'" +
        "onclick='return ExcellentExport.excel(this, \"artReport\", \"reportTitle\");'>" +
        "<i class='fa fa-file-excel-o'></i>Export" +
        "</a>" +
        "</span>" +
        "</div>" +
        "</span>";

    $('div#returned_messages').html(heading);

    $.get(templateUrl).then
    (function (responseData) {
        $.get("db/fetch/get_orgunit_level_by_name.php",
            {org_unit: orgUnitID, org_unit_level: orgUnitLevel},
            function (orgUnitName) {
                //alert(orgUnitName);
                $('div#facilities').empty();
                $('div#facilities').append(responseData);
                $('#formName').append("Reporting Rate For Central Sites And Sub-County Stores");
                $('#orgUnitName').append(orgUnitName.toUpperCase());
                $('#orgUnitLevel').append(orgUnitLevel.toUpperCase());
                $('#period').append(generateYearName(period));

                $.getJSON("db/fetch/get_ordering_points.php",
                    {org_unit_level: orgUnitLevel, org_unit: orgUnitID},
                    function (facilities) {

                        $.each(facilities, function (key, facility) {
                            orgUnits.push(facility.facility_id);
                        });

                        if (orgUnits.length == 0) {

                            $("#loading").empty();
                            $("#loading").append("<p class='text-danger'>No Ordering Points for the Organisation Level Selected<p>");
                        }
                        else {

                            $("#loading").append('<img src="assets/img/ajax-loader-2.gif">');

                            //setTimeout(function(){
                            //    $('#loading').html("Try Loading Again");
                            //}, 60000);

                            setTimeout(function () {
                                $('#loading').html("");
                            }, 100000);


                            $.getJSON(url_reporting_rate,
                                {dataSet: dataSet, period: period, orgUnits: orgUnits},
                                function (response) {
                                    //console.log(response);
                                    $("#loading").empty();
                                    $("#formData").empty();
                                    var dataModal="";

                                    $.each(response, function (index, obj) {

                                        $.get("db/fetch/get_ordering_point_type.php",
                                            {facility_id: obj.orgUnit}, function (type) {

                                                var orderingPointType = type;
                                                var facility = $.grep(facilities, function (e) {
                                                    return e.facility_id == obj.orgUnit;
                                                });
                                                mflCode = facility[0].mfl_code;
                                                facilityName = facility[0].facility_name;

                                                $('#formData').append("<tr  class='text-left'>" +
                                                "<td>" + (index + 1) + "</td>" +
                                                "<td>" + mflCode + "</td>" +
                                                "<td>" + facilityName + "</td>" +
                                                "<td>" + orderingPointType + "</td>" +
                                                "<td>" + obj.reports + "</td>" +
                                                "<td>" + obj.reported + "</td>" +
                                                "<td>" + obj.reporting_rate + "</td>" +
                                                "<td><button type='button' class='btn btn-default' data-toggle='modal'"+
                                                "data-target='#data"+index+"'>satellites</button></td>"+
                                                "<tr>");
                                                if(obj.metadata.length>0){
                                                    var table="<table><thead><td>Satellite</td><td>Expected reports</td>" +
                                                        "<td>Reports received</td><td>%reporting rate</td></thead><tbody>";
                                                    $.each(obj.metadata, function (key,data) {
                                                        table=table+"<tr></tr>"+
                                                        "<td>" + data.satellite + "</td>" +
                                                        "<td>" + data.expected + "</td>" +
                                                        "<td>" + data.reported + "</td>" +
                                                        "<td>" + data.reporting_rate + "</td></tr>";
                                                    });

                                                    table=table+"</tbody></table>";
                                                    console.log(table);
                                                    dataModal=dataModal+'<div class="modal fade" id="data'+index+'" tabindex="-1" ' +
                                                    'role="dialog" aria-labelledby="myModalLabel'+index+'">'+
                                                    '<div class="modal-dialog" role="document"> ' +
                                                    '<div class="modal-content"> ' +
                                                    '<div class="modal-header"> ' +
                                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> ' +
                                                    '<h4 class="modal-title" id="myModalLabel'+index+'">Satellites Reporting Rate</h4> ' +
                                                    '</div> ' +
                                                    '<div class="modal-body"> '+table+
                                                    '</div> ' +
                                                    '<div class="modal-footer"> ' +
                                                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button> ' +
                                                    '</div> ' +
                                                    '</div> ' +
                                                    '</div> ' +
                                                    '</div>';
                                                    $('#modal').empty();
                                                    $('#modal').html(dataModal);
                                                }


                                            });
                                    });
                                });
                        }
                    });

            });
    });
}

//Function to Generate Patients Regimen Report for Ordering Points
function generatePatientsRegimenReport(period, orgUnitID, orgUnitLevel) {

    var dataElements = null;
    $.getJSON("api/dataElements.json", function (response) {

        dataElements = response.dataElements;
        //alert(period+""+orgUnitID+""+orgUnitLevel);
        //orgUnits for the Selected Level
        var orgUnits = [];
        var dataSet = "VoCwF0LPGjb";
        var dataElementName = "";
        var programId = 3;

        var url__patient_regimen = "api/get_patients_regimen_report.php";
        var templateUrl = "client/report_templates/regimen_report.php";

        $.get(templateUrl).then
        (function (responseData) {
            $.get("db/fetch/get_orgunit_level_by_name.php",
                {org_unit: orgUnitID, org_unit_level: orgUnitLevel},
                function (orgUnitName) {

                    //alert(orgUnitName);
                    $('div#facilities').empty();
                    $('div#facilities').append(responseData);
                    $('#formName').append("Patients Regimen Report");
                    $('#orgUnitName').append(orgUnitName.toUpperCase());
                    $('#orgUnitLevel').append(orgUnitLevel.toUpperCase());
                    $('#period').append(generateYearName(period));

                    $.getJSON("db/fetch/get_ordering_points.php",
                        {org_unit_level: orgUnitLevel, org_unit: orgUnitID},
                        function (facilities) {

                            $.each(facilities, function (key, facility) {
                                orgUnits.push(facility.facility_id);
                            });

                            if (orgUnits.length == 0) {

                                $("#loading").empty();
                                $("#loading").append("<p class='text-danger'>No Ordering Points for the Organisation Level Selected<p>");
                            }
                            else {

                                $("#loading").append('<img src="assets/img/ajax-loader-2.gif">');

                                //setTimeout(function(){
                                //    $('#loading').html("Try Loading Again");
                                //}, 60000);

                                setTimeout(function () {
                                    $('#loading').html("");
                                }, 100000);


                                $.getJSON(url__patient_regimen,
                                    {dataSet: dataSet, period: period, orgUnits: orgUnits},
                                    function (response) {
                                        //console.log(response);
                                        $("#loading").empty();
                                        $("#formData").empty();

                                        $.each(response, function (index, obj) {

                                            if (obj.adult_art) {

                                                $('#formData').append("<tr><td colspan='3'>Adult ART</td></tr>");
                                                $.each(obj.adult_art, function (i, dataElement) {

                                                    var objData = $.grep(dataElements, function (e) {
                                                        return e.id == dataElement.dataElement;
                                                    });
                                                    dataElementName = objData[0].name;

                                                    $('#formData').append("<tr>" +
                                                    "<td>" + (i + 1) + "</td>" +
                                                    "<td>" + dataElementName + "</td>" +
                                                    "<td>" + dataElement.value + "</td>" +
                                                    "</tr>");
                                                });

                                                $('#formData').append("<tr>" +
                                                "<td></td>" +
                                                "<td>Totals</td>" +
                                                "<td>" + response.category.adult_art + "</td>" +
                                                "</tr>");
                                            }


                                            if (obj.adult_pep) {

                                                $('#formData').append("<tr><td colspan='3'>Adult PEP</td></tr>");
                                                $.each(obj.adult_pep, function (i, dataElement) {

                                                    var objData = $.grep(dataElements, function (e) {
                                                        return e.id == dataElement.dataElement;
                                                    });
                                                    dataElementName = objData[0].name;

                                                    $('#formData').append("<tr>" +
                                                    "<td>" + (i + 1) + "</td>" +
                                                    "<td>" + dataElementName + "</td>" +
                                                    "<td>" + dataElement.value + "</td>" +
                                                    "</tr>");
                                                });

                                                $('#formData').append("<tr>" +
                                                "<td></td>" +
                                                "<td>Totals</td>" +
                                                "<td>" + response.category.adult_pep + "</td>" +
                                                "</tr>");
                                            }

                                            if (obj.adult_pmtct) {

                                                $('#formData').append("<tr><td colspan='3'>Adult PMTCT</td></tr>");
                                                $.each(obj.adult_pmtct, function (i, dataElement) {

                                                    var objData = $.grep(dataElements, function (e) {
                                                        return e.id == dataElement.dataElement;
                                                    });
                                                    dataElementName = objData[0].name;

                                                    $('#formData').append("<tr>" +
                                                    "<td>" + (i + 1) + "</td>" +
                                                    "<td>" + dataElementName + "</td>" +
                                                    "<td>" + dataElement.value + "</td>" +
                                                    "</tr>");
                                                });

                                                $('#formData').append("<tr>" +
                                                "<td></td>" +
                                                "<td>Totals</td>" +
                                                "<td>" + response.category.adult_pmtct + "</td>" +
                                                "</tr>");
                                            }

                                            if (obj.paediatric_art) {

                                                $('#formData').append("<tr><td colspan='3'>PAEDIATRIC ART</td></tr>");
                                                $.each(obj.paediatric_art, function (i, dataElement) {

                                                    var objData = $.grep(dataElements, function (e) {
                                                        return e.id == dataElement.dataElement;
                                                    });
                                                    dataElementName = objData[0].name;

                                                    $('#formData').append("<tr>" +
                                                    "<td>" + (i + 1) + "</td>" +
                                                    "<td>" + dataElementName + "</td>" +
                                                    "<td>" + dataElement.value + "</td>" +
                                                    "</tr>");
                                                });

                                                $('#formData').append("<tr>" +
                                                "<td></td>" +
                                                "<td>Totals</td>" +
                                                "<td>" + response.category.paediatric_art + "</td>" +
                                                "</tr>");
                                            }

                                            if (obj.paediatric_pep) {

                                                $('#formData').append("<tr><td colspan='3'>PAEDIATRIC PEP</td></tr>");
                                                $.each(obj.paediatric_pep, function (i, dataElement) {

                                                    var objData = $.grep(dataElements, function (e) {
                                                        return e.id == dataElement.dataElement;
                                                    });
                                                    dataElementName = objData[0].name;

                                                    $('#formData').append("<tr>" +
                                                    "<td>" + (i + 1) + "</td>" +
                                                    "<td>" + dataElementName + "</td>" +
                                                    "<td>" + dataElement.value + "</td>" +
                                                    "</tr>");
                                                });

                                                $('#formData').append("<tr>" +
                                                "<td></td>" +
                                                "<td>Totals</td>" +
                                                "<td>" + response.category.paediatric_pep + "</td>" +
                                                "</tr>");
                                            }

                                            if (obj.paediatric_pmtct) {

                                                $('#formData').append("<tr><td colspan='3'>PAEDIATRIC PMTCT</td></tr>");
                                                $.each(obj.paediatric_pmtct, function (i, dataElement) {

                                                    var objData = $.grep(dataElements, function (e) {
                                                        return e.id == dataElement.dataElement;
                                                    });
                                                    dataElementName = objData[0].name;

                                                    $('#formData').append("<tr>" +
                                                    "<td>" + (i + 1) + "</td>" +
                                                    "<td>" + dataElementName + "</td>" +
                                                    "<td>" + dataElement.value + "</td>" +
                                                    "</tr>");
                                                });

                                                $('#formData').append("<tr>" +
                                                "<td></td>" +
                                                "<td>Totals</td>" +
                                                "<td>" + response.category.paediatric_pmtct + "</td>" +
                                                "</tr>");
                                            }

                                        });
                                    });
                            }
                        });

                });
        });

    });

}
//Function for formatting the date
function generateYearName(date) {
    var str = date;
    var res = str.slice(-2);
    var year = str.substring(0, 4);

    if (res == "01") {

        return "January-" + year;
    }
    if (res == "02") {

        return "February-" + year;
    }
    if (res == "03") {

        return "March-" + year;
    }
    if (res == "04") {
        return "April-" + year;
    }
    if (res == "05") {
        return "May-" + year;
    }
    if (res == "06") {

        return "June-" + year;
    }
    if (res == "07") {
        return "July-" + year;
    }
    if (res == "08") {

        return "August-" + year;
    }
    if (res == "09") {

        return "September-" + year;
    }
    if (res == "10") {
        return "October-" + year;
    }
    if (res == "11") {
        return "November-" + year;
    }
    if (res == "12") {

        return "December-" + year;
    }

}


