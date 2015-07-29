var dateGenerated = new Date();

// function siteAnalytics()
function siteAnalytics()
{
	$('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> SITES ANALYTICS (Generate ordering points or service points analysis)</span>");

    var analyticsCriteria = "<div class='panel-body'>"+
                                "<div class='panel-heading' style ='width:360px;background-color:#d0eBd0;font-weight:normal;font-size:10pt;border:1px solid #a4d2a3;padding:20px'>"+
                                    // Program
                                    "<span>Report Program</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
                                    "<select id = 'report_programs' style='width:100%;margin-bottom:10px'>"+
                                        "<option value = 'none selected'>[Select Program Type]</option>"+
                                    "</select>"+

                                    "<span>Report</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
                                    "<select id = 'report_type' style = 'width:100%;margin-bottom:10px' onchange='javascript:reportDetails();'>"+
                                        "<option value = 'none selected'>[Select]</option>"+
                                        "<option value = 'List of Ordering Points'>List of Ordering Points</option>"+
                                        "<option value = 'Ordering Points Distribution'>Distribution of Ordering Points by County</option>"+
                                        "<option value = 'List of Service Points'>List of Service Points</option>"+
                                        "<option value = 'Service Points Distribution'>Distribution of Service Points by County</option>"+
                                    "</select>"+
                                    "<br>"+

                                    "<span>Report Organization Unit</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
                                    "<div id = 'report_org_unit' style = 'background-color:white;padding:px;height:200px;overflow:scroll'>"+   
                                    "</div>"+

                                    "<button class = 'btn btn-success btn-sm' style = 'margin-top:10px;width:40%' onclick='javascript:getSiteAnalytics()'>Get Report</button>"+
                                    "<button class = 'btn btn-danger btn-sm' style = 'margin-top:10px;margin-left:10px;width:40%;' onclick='javascript:siteAnalytics()'>Reset</button>"+                            
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

// function getSiteAnalytics()
function getSiteAnalytics()
{
    var programSelectList = document.getElementById("report_programs");
    var programSelectIndex = programSelectList.selectedIndex; 
    var programSelectOptions = programSelectList.options;
    var selectedProgramID = programSelectOptions[programSelectIndex].value;
    // Ensure all fields have been selected
    if(selectedProgramID == "none selected")
    {
        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                "<span style ='margin-left:80px'>"+
                                    "Please select a program"+
                                "</span>"+
                            "</div>";
        $("div#returned_messages").html(errorMessage);
        //Clear the error message after 1500 ms
        setTimeout
        (
            function()
            {
                $("div#returned_messages").empty();
                $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> SITES ANALYTICS (Generate ordering points or service points analysis)</span>");
            },
            1500
        );
    }
    else
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
                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> SITES ANALYTICS (Generate ordering points or service points analysis)</span>");
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
                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> SITES ANALYTICS (Generate ordering points or service points analysis)</span>");
                    },
                    1500
                );
            }
            else
            {
                var the_number = 0;
                var selectedOrgUnitID = selectedOrgUnit[the_number].getAttribute("value");
                var selectedOrgUnitLevel = selectedOrgUnit[the_number].getAttribute("level");

                if(selectedReportID == "List of Ordering Points")
                {
                    listSites("Ordering Points", selectedProgramID, selectedOrgUnitID,  selectedOrgUnitLevel);
                }

                else if(selectedReportID == "List of Service Points")
                {
                    listSites("Service Points", selectedProgramID, selectedOrgUnitID,  selectedOrgUnitLevel);
                }

                else if(selectedReportID == "Ordering Points Distribution")
                {
                    sitesDistribution("Ordering Points", selectedProgramID, selectedOrgUnitID,  selectedOrgUnitLevel);
                }

                else if(selectedReportID == "Service Points Distribution")
                {
                    sitesDistribution("Service Points", selectedProgramID, selectedOrgUnitID,  selectedOrgUnitLevel);
                }
            }
        }

    }
}
/* -------------------------------------------------------------------------------------------------------------------------- */
// function reportDetails()
function reportDetails()
{
    var reportSelectList = document.getElementById("report_type");
    var reportSelectIndex = reportSelectList.selectedIndex; 
    var reportSelectOptions = reportSelectList.options;
    var selectedReportID = reportSelectOptions[reportSelectIndex].value;

    if((selectedReportID == "Ordering Points Distribution")||(selectedReportID == "Service Points Distribution"))
    {
        var toAppend =  "<option value = 'By County' level = 'By County' class = 'fa fa-check-square clickedColor selectedFacility' style = 'padding:10px'>"+
                            "<span style = 'margin-left:10px'> By County</span>"+
                        "</option>";

        $('div#report_org_unit').empty();
        $('div#report_org_unit').append(toAppend);
    }
    else if((selectedReportID == "List of Ordering Points")||(selectedReportID == "List of Service Points"))
    {
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
}

/* -------------------------------------------------------------------------------------------------------------------------- */

// function listSites
function listSites(type,program,orgUnit, orgUnitLevel)
{

    if(type == "Ordering Points")
    {
        var heading =  "<span style = 'color:green;margin-left:30px'>"+
                            "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                            "</span>"+
                            "&nbsp <span style = 'color:black'>|</span>"+
                            "List of Ordering Points"+
                            "<div class='col-md-offset-10' style = 'margin-top:-30px'>"+
                                "<span>"+
                                    "<a  class='btn btn-default' download='list_of_ordering_points_"+orgUnitLevel+".xls' href='#'"+
                                        "onclick='return ExcellentExport.excel(this, \"orderingpoints\", \"reportTitle\");'>"+
                                        "<i class='fa fa-file-excel-o'></i>Export"+
                                    "</a>"+
                                "</span>"+
                            "</div>"+
                        "</span>";

        $('div#returned_messages').html(heading);

        var data =  "<div class='panel panel-default' style = 'margin-left:-30px;margin-top:0px'>"+
                        "<div class='panel-heading' style = 'color:black'>"+
                            "<span class='panel-title' id='reportTitle' style = 'font-family:font awesome'>"+
                                "<span>Program: "+
                                    "<span id = 'program_name' style = 'color:green;font-size:11pt'></span>"+
                                "</span><br>"+
                                "<span>Pipeline: "+
                                    "<span style = 'font-size:11pt;color:green'>KEMSA</span>"+
                                "</span><br>"+
                                "<span>Report: "+
                                    "<span style = 'font-size:11pt;color:green'>List of Ordering Points</span>"+
                                "</span><br>"+
                                "<span>Level: "+
                                    "<span id = 'report_level' style = 'font-size:11pt;color:green'></span>"+
                                "</span><br>"+
                                "<span>Date Generated: <span style = 'color:green;font-size:11pt'>"+dateGenerated+"</span></span><br>"+
                            "</span>"+                             
                        "</div>"+

                        "<table id= 'orderingpoints' class = 'table table-responsive table-striped' style = 'border-radius:5px;width:95%;margin-top:20px'>"+
                            "<thead>"+
                                "<th style = 'font-weight:bold'>#</th>"+
                                "<th style = 'font-weight:bold'>MFL Code</th>"+
                                "<th style = 'font-weight:bold'>Name of Facility</th>"+
                                "<th style = 'font-weight:bold'>Ordering Point Type</th>"+
                                "<th style = 'font-weight:bold'>County</th>"+
                                "<th style = 'font-weight:bold'>Sub County</th>"+                            
                            "</thead>"+
                            "<tbody id = 'tbody'>"+
                            "</tbody>"+
                        "</table>"+
                    "</div>";
        // Append
        $('div#facilities').html(data);

        // Place a post request
        var dataUrl = "db/fetch/list_ordering_points.php";
        $.getJSON
        (
            dataUrl,
            {program_id:program,org_unit:orgUnit,org_unit_level:orgUnitLevel},
            function(results)
            {
                for(var counting=0; counting<results.length;counting++)
                { 
                    var itemNumber = counting+1;
                    var dataToAppend = "<tr>"+
                                            "<td>"+itemNumber+"</td>"+
                                            "<td style = 'text-align:left'>"+results[counting].mfl_code+"</td>"+
                                            "<td style = 'text-align:left'>"+results[counting].facility_name+"</td>"+
                                            "<td style = 'text-align:left' id = 'op_type_"+results[counting].facility_id+"'></td>"+
                                            "<td style = 'text-align:left' id = 'county_"+results[counting].facility_id+"'></td>"+
                                            "<td style = 'text-align:left' id = 'sub_county_"+results[counting].facility_id+"'></td>"+
                                        "</tr>";

                    $(dataToAppend).appendTo("#orderingpoints tbody");

                    /*NOTES:
                        At positions
                            0 - Ordering point type
                            1 - Sub-County
                            2 - County
                            3 - Facility ID
                    */

                    var siteDetailsUrl = "db/fetch/get_site_details.php";
                    $.getJSON
                    (
                        siteDetailsUrl,
                        {type:"Ordering Points",facility:results[counting].facility_id,program_id:program},
                        function(receivedDetails)
                        {
                            $("#op_type_"+receivedDetails[3]).html("<span style ='color:'>"+receivedDetails[0]+"</span>");
                            $("#county_"+receivedDetails[3]).html("<span style ='color:'>"+receivedDetails[2]+"</span>");
                            $("#sub_county_"+receivedDetails[3]).html("<span style ='color:'>"+receivedDetails[1]+"</span>");
                        }

                    );
                }
                // $(function()
                // {
                //     $("#orderingpoints").dataTable();
                // });
            }
        );
    }

    else if(type == "Service Points")
    {
        var heading =  "<span style = 'color:green;margin-left:30px'>"+
                            "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                            "</span>"+
                            "&nbsp <span style = 'color:black'>|</span>"+
                            "List of Service Points"+
                            "<div class='col-md-offset-10' style = 'margin-top:-30px'>"+
                                "<span>"+
                                    "<a  class='btn btn-default' download='list_of_service_points_"+orgUnitLevel+".xls' href='#'"+
                                        "onclick='return ExcellentExport.excel(this, \"servicepoints\", \"reportTitle\");'>"+
                                        "<i class='fa fa-file-excel-o'></i>Export"+
                                    "</a>"+
                                "</span>"+
                            "</div>"+
                        "</span>";

        $('div#returned_messages').html(heading);

        var data =  "<div class='panel panel-default' style = 'margin-left:-30px;margin-top:0px' id = 'servicepointsreport'>"+
                        "<div class='panel-heading' style = 'color:black'>"+
                            "<span class='panel-title' id='reportTitle' style = 'font-family:font awesome'>"+
                                "<span>Program: "+
                                    "<span id = 'program_name' style = 'color:green;font-size:11pt'></span>"+
                                "</span><br>"+
                                "<span>Pipeline: "+
                                    "<span style = 'font-size:11pt;color:green'>KEMSA</span>"+
                                "</span><br>"+
                                "<span>Report: "+
                                    "<span style = 'font-size:11pt;color:green'>List of Service Points</span>"+
                                "</span><br>"+
                                "<span>Level: "+
                                    "<span id = 'report_level' style = 'font-size:11pt;color:green'></span>"+
                                "</span><br>"+
                                "<span>Date Generated: <span style = 'color:green;font-size:11pt'>"+dateGenerated+"</span></span><br>"+
                            "</span>"+                             
                        "</div>"+

                        "<table id= 'servicepoints' class = 'table table-responsive table-striped' style = 'border-radius:5px;width:95%'>"+
                            "<thead>"+
                                "<th style = 'font-weight:bold'>#</th>"+
                                "<th style = 'font-weight:bold'>MFL Code</th>"+
                                "<th style = 'font-weight:bold'>Name of Facility</th>"+
                                "<th style = 'font-weight:bold'>County</th>"+
                                "<th style = 'font-weight:bold'>Sub County</th>"+
                                "<th style = 'font-weight:bold'>Dispensing Point</th>"+
                                "<th style = 'font-weight:bold'>Satellite Site</th>"+
                                "<th style = 'font-weight:bold'>Standalone Site</th>"+                         
                            "</thead>"+
                            "<tbody id = 'tbody'>"+
                            "</tbody>"+
                        "</table>"+
                    "</div>";
        // Append
        $('div#facilities').html(data);

        // Place a post request
        var dataUrl = "db/fetch/list_service_points.php";
        $.getJSON
        (
            dataUrl,
            {program_id:program,org_unit:orgUnit,org_unit_level:orgUnitLevel},
            function(results)
            {
                for(var counting=0; counting<results.length;counting++)
                { 
                    var itemNumber = counting+1;
                    var dataToAppend = "<tr>"+
                                            "<td>"+itemNumber+"</td>"+
                                            "<td style = 'text-align:left'>"+results[counting].mfl_code+"</td>"+
                                            "<td style = 'text-align:left'>"+results[counting].facility_name+"</td>"+
                                            "<td style = 'text-align:left' id = 'county_"+results[counting].facility_id+"'></td>"+
                                            "<td style = 'text-align:left' id = 'sub_county_"+results[counting].facility_id+"'></td>"+
                                            "<td style = '' id = 'dispensing_point_"+results[counting].facility_id+"'></td>"+
                                            "<td style = '' id = 'satellite_site_"+results[counting].facility_id+"'></td>"+
                                            "<td style = '' id = 'standalone_site_"+results[counting].facility_id+"'></td>"+
                                        "</tr>";

                    $(dataToAppend).appendTo("#servicepoints tbody");

                    /*NOTES:
                        At positions
                            0 - Ordering point type
                            1 - Sub-County
                            2 - County
                            3 - Facility ID
                    */

                    var siteDetailsUrl = "db/fetch/get_site_details.php";
                    $.getJSON
                    (
                        siteDetailsUrl,
                        {type:"Service Points",facility:results[counting].facility_id,program_id:program},
                        function(receivedDetails)
                        {
                            $("#county_"+receivedDetails[3]).html("<span style ='color:'>"+receivedDetails[2]+"</span>");
                            $("#sub_county_"+receivedDetails[3]).html("<span style ='color:'>"+receivedDetails[1]+"</span>");

                            if(receivedDetails[0] == "Dispensing Point")
                            {
                                $("#dispensing_point_"+receivedDetails[3]).html("<span style = 'text-align:center'>x</span>");
                            }

                            else if(receivedDetails[0] == "Satellite Site")
                            {
                                $("#satellite_site_"+receivedDetails[3]).html("<span style = 'text-align:center'>x</span>");
                            }

                            else if(receivedDetails[0] == "StandAlone")
                            {
                                $("#standalone_site_"+receivedDetails[3]).html("<span style = 'text-align:center'>x</span>");
                            }
                        }

                    );


                }
                // $(function()
                // {
                //     $("#servicepoints").dataTable();
                // });

            }
        );
    }

    var dataUrl = "db/fetch/get_program_name.php";
    $.getJSON
    (
        dataUrl,
        {program_id:program},
        function(results)
        {
            $("#program_name").html(results[0].program_name);
        }
    );

    var orgUnitUrl = "db/fetch/get_orgunit_level_by_name.php";
    $.get
    (
        orgUnitUrl,
        {org_unit:orgUnit,org_unit_level:orgUnitLevel},
        function(results)
        {
            $("#report_level").html(results);
        }
    );

}

/* -------------------------------------------------------------------------------------------------------------------------- */

// Function sitesDistribution
function sitesDistribution(type,program,orgUnit, orgUnitLevel)
{
    if(type == "Ordering Points")
    {
        if (contentDiv.hasClass("col-md-9"))
        {
            var heading =  "<span style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                    "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+
                                "Ordering Points Distribution by County"+
                                "<div class='col-md-offset-9' style = 'margin-top:-30px'>"+
                                    "<span>"+
                                        "<a  class='btn btn-default btn' download='ordering_points_by_county.xls' href='#'"+
                                            "onclick='return ExcellentExport.excel(this, \"orderingpointsdistribution\", \"reportTitle\");'>"+
                                            "<i class='fa fa-file-excel-o'></i>Export"+
                                        "</a>"+
                                    "</span>"+

                                    "<span style = 'margin-left:10px' class = 'btn btn-info btn'>"+
                                        "<i class='fa fa-bar-chart' style = 'font-size:10pt'"+
                                            "onclick='javascript:sitesDistributionVisualizer(\"Ordering Points\",\""+program+"\",\""+orgUnit+"\",\""+orgUnitLevel+"\");'>"+
                                            " Bar Chart"+
                                        "</i>"+
                                    "</span>"+

                                "</div>"+
                            "</span>";

        } 

        else if (contentDiv.hasClass("col-md-12"))
        {
            var heading =  "<span style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                    "<img src='assets/img/icon-restore.png' class = 'unclickedColor' style = 'height:100%;width:3%;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+
                                "Ordering Points Distribution by County"+
                                "<div class='col-md-offset-9' style = 'margin-top:-30px'>"+
                                    "<span>"+
                                        "<a  class='btn btn-default btn' download='ordering_points_by_county.xls' href='#'"+
                                            "onclick='return ExcellentExport.excel(this, \"orderingpointsdistribution\", \"reportTitle\");'>"+
                                            "<i class='fa fa-file-excel-o'></i>Export"+
                                        "</a>"+
                                    "</span>"+

                                    "<span style = 'margin-left:10px' class = 'btn btn-info btn'>"+
                                        "<i class='fa fa-bar-chart' style = 'font-size:10pt'"+
                                            "onclick='javascript:sitesDistributionVisualizer(\"Ordering Points\",\""+program+"\",\""+orgUnit+"\",\""+orgUnitLevel+"\");'>"+
                                            " Bar Chart"+
                                        "</i>"+
                                    "</span>"+

                                "</div>"+
                            "</span>";

        }

        var data =  "<div class='panel panel-default' style = 'margin-left:-30px;margin-top:0px'>"+
                        "<div class='panel-heading' style = 'color:black'>"+
                            "<span class='panel-title' id='reportTitle' style = 'font-family:font awesome'>"+
                                "<span>Program: "+
                                    "<span id = 'program_name' style = 'color:green;font-size:11pt'></span>"+
                                "</span><br>"+
                                "<span>Pipeline: "+
                                    "<span style = 'font-size:11pt;color:green'>KEMSA</span>"+
                                "</span><br>"+
                                "<span>Report: "+
                                    "<span style = 'font-size:11pt;color:green'>Ordering Points Distribution</span>"+
                                "</span><br>"+
                                "<span>Level: "+
                                    "<span id = 'report_level' style = 'font-size:11pt;color:green'>By County</span>"+
                                "</span><br>"+
                                "<span>Date Generated: <span style = 'color:green;font-size:11pt'>"+dateGenerated+"</span></span><br>"+
                            "</span>"+                             
                        "</div>"+

                        "<table id= 'orderingpointsdistribution' class = 'table table-responsive table-striped' style = 'border-radius:5px;width:95%'>"+
                            "<thead>"+
                                "<th style = 'font-weight:bold'>#</th>"+
                                "<th style = 'font-weight:bold'>County</th>"+
                                "<th style = 'font-weight:bold'>Sub-County Stores</th>"+
                                "<th style = 'font-weight:bold'>Central Sites</th>"+
                                "<th style = 'font-weight:bold'>Standalone sites</th>"+
                                "<th style = 'font-weight:bold'>Total of Ordering Points</th>"+                           
                            "</thead>"+
                            "<tbody id = 'tbody' style = 'text-align:center'>"+
                            "</tbody>"+
                        "</table>"+
                    "</div>";
        // Append
        $('div#facilities').html(data);

        // Place a post request
        /*NOTES:
            At positions
                0 - Sub-County Stores
                1 - Central Sites
                2 - StandAlone Sites
                3 - Total Ordering Points
                4 - County ID
        */
        var countiesUrl = "db/fetch/get_counties.php";
        $.getJSON
        (
            countiesUrl,
            function(counties)
            {
                var scsTotal = 0;
                var csTotal = 0;
                var sasTotal = 0;
                var grandTotal = 0;

                for(var counting=0; counting<counties.length;counting++)
                {
                    var itemNumber = counting+1;
                    var dataToAppend = "<tr>"+
                                            "<td>"+itemNumber+"</td>"+
                                            "<td style = 'text-align:left'>"+counties[counting].county_name+"</td>"+
                                            "<td style = 'text-align:' id = 'subcounty_stores_"+counties[counting].county_id+"'></td>"+
                                            "<td style = 'text-align:' id = 'central_sites_"+counties[counting].county_id+"'></td>"+
                                            "<td style = 'text-align:' id = 'standalone_sites_"+counties[counting].county_id+"'></td>"+
                                            "<td style = 'text-align:' id = 'total_"+counties[counting].county_id+"'></td>"+
                                        "</tr>";
                    //$('#userdata tr:last').after(dataToAppend);
                    $(dataToAppend).appendTo("#orderingpointsdistribution tbody");

                    // Append the total row after the last county
                    if(itemNumber == counties.length)
                    {
                        var totalColumn =   "<tr style = 'background-color:green;color:green;font-weight:bold'>"+
                                                        "<td id = ''>#</td>"+
                                                        "<td id = '' style = 'text-align:left'>Total</td>"+
                                                        "<td id = 'scs_total'></td>"+
                                                        "<td id = 'cs_total'></td>"+
                                                        "<td id = 'sas_total'></td>"+
                                                        "<td id = 'grand_total'></td>"+
                                                    "</tr>";

                        $(totalColumn).appendTo("#orderingpointsdistribution tbody");
                    }

                    var dataUrl = "db/fetch/ordering_points_distribution.php";
                    $.getJSON
                    (
                        dataUrl,
                        {program_id:program,org_unit:counties[counting].county_id,org_unit_level:orgUnitLevel},
                        function(results)
                        {
                            $("#subcounty_stores_"+results[4]).html("<span style ='color:'>"+results[0]+"</span>");
                            $("#central_sites_"+results[4]).html("<span style ='color:'>"+results[1]+"</span>");
                            $("#standalone_sites_"+results[4]).html("<span style ='color:'>"+results[2]+"</span>");
                            $("#total_"+results[4]).html("<span style ='color:'>"+results[3]+"</span>");
                            
                            scsTotal = scsTotal + results[0];
                            csTotal = csTotal + results[1];
                            sasTotal = sasTotal + results[2];
                            grandTotal = grandTotal + results[3];

                            $("#scs_total").html("<span style ='color:'>"+scsTotal+"</span>");
                            $("#cs_total").html("<span style ='color:'>"+csTotal+"</span>");
                            $("#sas_total").html("<span style ='color:'>"+sasTotal+"</span>");
                            $("#grand_total").html("<span style ='color:'>"+grandTotal+"</span>");
                        }
                    );
                }
                // $(function()
                // {
                //     $("#orderingpointsdistribution").dataTable();
                // });
            }
        );
    }

    else if(type == "Service Points")
    {
        if (contentDiv.hasClass("col-md-9"))
        {
            var heading =  "<span style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                    "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+
                                "Service Points Distribution by County"+
                                "<div class='col-md-offset-9' style = 'margin-top:-30px'>"+
                                    "<span>"+
                                        "<a  class='btn btn-default btn' download='service_points_by_county.xls' href='#'"+
                                            "onclick='return ExcellentExport.excel(this, \"servicepointsdistribution\", \"reportTitle\");'>"+
                                            "<i class='fa fa-file-excel-o'></i>Export"+
                                        "</a>"+
                                    "</span>"+

                                    "<span style = 'margin-left:10px' class = 'btn btn-info btn'>"+
                                        "<i class='fa fa-bar-chart' style = 'font-size:10pt'"+
                                            "onclick='javascript:sitesDistributionVisualizer(\"Service Points\",\""+program+"\",\""+orgUnit+"\",\""+orgUnitLevel+"\");'>"+
                                            " Bar Chart"+
                                        "</i>"+
                                    "</span>"+

                                "</div>"+
                            "</span>";

        } 

        else if (contentDiv.hasClass("col-md-12"))
        {
            var heading =  "<span style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                    "<img src='assets/img/icon-restore.png' class = 'unclickedColor' style = 'height:100%;width:3%;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+
                                "Service Points Distribution by County"+
                                "<div class='col-md-offset-9' style = 'margin-top:-30px'>"+
                                    "<span>"+
                                        "<a  class='btn btn-default btn' download='service_points_by_county.xls' href='#'"+
                                            "onclick='return ExcellentExport.excel(this, \"servicepointsdistribution\", \"reportTitle\");'>"+
                                            "<i class='fa fa-file-excel-o'></i>Export"+
                                        "</a>"+
                                    "</span>"+

                                    "<span style = 'margin-left:10px' class = 'btn btn-info btn'>"+
                                        "<i class='fa fa-bar-chart' style = 'font-size:10pt'"+
                                            "onclick='javascript:sitesDistributionVisualizer(\"Service Points\",\""+program+"\",\""+orgUnit+"\",\""+orgUnitLevel+"\");'>"+
                                            " Bar Chart"+
                                        "</i>"+
                                    "</span>"+

                                "</div>"+
                            "</span>";

        }

        var data =  "<div class='panel panel-default' style = 'margin-left:-30px;margin-top:0px'>"+
                        "<div class='panel-heading' style = 'color:black'>"+
                            "<span class='panel-title' id='reportTitle' style = 'font-family:font awesome'>"+
                                "<span>Program: "+
                                    "<span id = 'program_name' style = 'color:green;font-size:11pt'></span>"+
                                "</span><br>"+
                                "<span>Pipeline: "+
                                    "<span style = 'font-size:11pt;color:green'>KEMSA</span>"+
                                "</span><br>"+
                                "<span>Report: "+
                                    "<span style = 'font-size:11pt;color:green'>Service Points Distribution</span>"+
                                "</span><br>"+
                                "<span>Level: "+
                                    "<span id = 'report_level' style = 'font-size:11pt;color:green'>By County</span>"+
                                "</span><br>"+
                                "<span>Date Generated: <span style = 'color:green;font-size:11pt'>"+dateGenerated+"</span></span><br>"+
                            "</span>"+                             
                        "</div>"+

                        "<table id= 'servicepointsdistribution' class = 'table table-responsive table-striped' style = 'border-radius:5px;width:95%'>"+
                            "<thead>"+
                                "<th style = 'font-weight:bold'>#</th>"+
                                "<th style = 'font-weight:bold'>County</th>"+
                                "<th style = 'font-weight:bold'>Dispensing Points</th>"+
                                "<th style = 'font-weight:bold'>Satellite Sites</th>"+
                                "<th style = 'font-weight:bold'>Standalone sites</th>"+
                                "<th style = 'font-weight:bold'>Total of Ordering Points</th>"+                           
                            "</thead>"+
                            "<tbody id = 'tbody'>"+
                            "</tbody>"+
                        "</table>"+
                    "</div>";
        // Append
        $('div#facilities').html(data);

        // Place a post request
        /*NOTES:
            At positions
                0 - Dispensing Points
                1 - Satellite Sites
                2 - StandAlone Sites
                3 - Total Ordering Points
                4 - County ID
        */
        var countiesUrl = "db/fetch/get_counties.php";
        $.getJSON
        (
            countiesUrl,
            function(counties)
            {
                var dpTotal = 0;
                var ssTotal = 0;
                var sasTotal = 0;
                var grandTotal = 0;

                for(var counting=0; counting<counties.length;counting++)
                {
                    var itemNumber = counting+1;
                    var dataToAppend = "<tr>"+
                                            "<td>"+itemNumber+"</td>"+
                                            "<td style = 'text-align:left'>"+counties[counting].county_name+"</td>"+
                                            "<td style = '' id = 'dispensing_points_"+counties[counting].county_id+"'></td>"+
                                            "<td style = '' id = 'satellite_sites_"+counties[counting].county_id+"'></td>"+
                                            "<td style = '' id = 'standalone_sites_"+counties[counting].county_id+"'></td>"+
                                            "<td style = '' id = 'total_"+counties[counting].county_id+"'></td>"+
                                        "</tr>";
                    //$('#userdata tr:last').after(dataToAppend);
                    $(dataToAppend).appendTo("#servicepointsdistribution tbody");

                    // Append the total row after the last county
                    if(itemNumber == counties.length)
                    {
                        var totalColumn =   "<tr style = 'background-color:green;color:green;font-weight:bold'>"+
                                                        "<td id = ''>#</td>"+
                                                        "<td id = '' style = 'text-align:left'>Total</td>"+
                                                        "<td id = 'dp_total'></td>"+
                                                        "<td id = 'ss_total'></td>"+
                                                        "<td id = 'sas_total'></td>"+
                                                        "<td id = 'grand_total'></td>"+
                                                    "</tr>";

                        $(totalColumn).appendTo("#servicepointsdistribution tbody");
                    }

                    var dataUrl = "db/fetch/service_points_distribution.php";
                    $.getJSON
                    (
                        dataUrl,
                        {program_id:program,org_unit:counties[counting].county_id,org_unit_level:orgUnitLevel},
                        function(results)
                        {
                            $("#dispensing_points_"+results[4]).html("<span style ='color:'>"+results[0]+"</span>");
                            $("#satellite_sites_"+results[4]).html("<span style ='color:'>"+results[1]+"</span>");
                            $("#standalone_sites_"+results[4]).html("<span style ='color:'>"+results[2]+"</span>");
                            $("#total_"+results[4]).html("<span style ='color:'>"+results[3]+"</span>");

                            dpTotal = dpTotal + results[0];
                            ssTotal = ssTotal + results[1];
                            sasTotal = sasTotal + results[2];
                            grandTotal = grandTotal + results[3];

                            $("#dp_total").html("<span style ='color:'>"+dpTotal+"</span>");
                            $("#ss_total").html("<span style ='color:'>"+ssTotal+"</span>");
                            $("#sas_total").html("<span style ='color:'>"+sasTotal+"</span>");
                            $("#grand_total").html("<span style ='color:'>"+grandTotal+"</span>");

                        }
                    );

                }
            }
        );
    }

    var dataUrl = "db/fetch/get_program_name.php";
    $.getJSON
    (
        dataUrl,
        {program_id:program},
        function(results)
        {
            $("#program_name").html(results[0].program_name);
        }
    );
}

/* -------------------------------------------------------------------------------------------------------------------------- */

// Function sitesVisualizer()
function sitesDistributionVisualizer(type,program,orgUnit, orgUnitLevel)
{
    var contentDiv = $("div#col_body");
    if(type == "Ordering Points")
    {
        if (contentDiv.hasClass("col-md-9"))
        {
            var heading =  "<span style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                    "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+
                                "Ordering Points Distribution By County Bar Chart"+
                                "<div class='col-md-offset-9' style = 'margin-top:-30px'>"+
                                    "<span>"+
                                        "<a  class='btn btn-default btn' download='ordering_points_by_county_bar_chart.xls' href='#'"+
                                            "onclick='return ExcellentExport.excel(this, \"orderingpoints-bar-chart\", \"reportTitle\");'>"+
                                            "<i class='fa fa-file-excel-o'></i>Export"+
                                        "</a>"+
                                    "</span>"+

                                    "<span style = 'margin-left:10px' class = 'btn btn-info btn'>"+
                                        "<i class='fa fa-list' style = 'font-size:10pt'"+
                                            "onclick='javascript:sitesDistribution(\""+type+"\",\""+program+"\",\""+orgUnit+"\",\""+orgUnitLevel+"\");'>"+
                                            " List"+
                                        "</i>"+
                                    "</span>"+

                                "</div>"+
                            "</span>";

        } 

        else if (contentDiv.hasClass("col-md-12"))
        {
            var heading =  "<span style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                    "<img src='assets/img/icon-restore.png' class = 'unclickedColor' style = 'height:100%;width:3%;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+
                                "Ordering Points Distribution By County Bar Chart"+
                                "<div class='col-md-offset-9' style = 'margin-top:-30px'>"+
                                    "<span>"+
                                        "<a  class='btn btn-default btn' download='ordering_points_by_county_bar_chart.xls' href='#'"+
                                            "onclick='return ExcellentExport.excel(this, \"orderingpoints-bar-chart\", \"reportTitle\");'>"+
                                            "<i class='fa fa-file-excel-o'></i>Export"+
                                        "</a>"+
                                    "</span>"+

                                    "<span style = 'margin-left:10px' class = 'btn btn-info btn'>"+
                                        "<i class='fa fa-list' style = 'font-size:10pt'"+
                                            "onclick='javascript:sitesDistribution(\""+type+"\",\""+program+"\",\""+orgUnit+"\",\""+orgUnitLevel+"\");'>"+
                                            " List"+
                                        "</i>"+
                                    "</span>"+

                                "</div>"+
                            "</span>";

        }

        $('div#returned_messages').html(heading);

        var chartToAppend = "<!-- START BAR CHART -->"+
                            "<div class='panel panel-default' style = 'width:95%'>"+
                                "<div class='panel-heading' style = 'color:black'>"+
                                    "<span class='panel-title' id='reportTitle' style = 'font-family:font awesome'>"+
                                        "<span>Program: "+
                                            "<span id = 'program_name' style = 'color:green;font-size:11pt'></span>"+
                                        "</span><br>"+
                                        "<span>Pipeline: "+
                                            "<span style = 'font-size:11pt;color:green'>KEMSA</span>"+
                                        "</span><br>"+
                                        "<span>Report: "+
                                            "<span style = 'font-size:11pt;color:green'>Ordering Points Distribution Chart</span>"+
                                        "</span><br>"+
                                        "<span>Level: "+
                                            "<span id = 'report_level' style = 'font-size:11pt;color:green'>By County</span>"+
                                        "</span><br>"+
                                        "<span>Date Generated: <span style = 'color:green;font-size:11pt'>"+dateGenerated+"</span></span><br>"+
                                    "</span>"+                             
                                "</div>"+
                                "<div class='panel-body'>"+
                                    "<div id='orderingpoints-bar-chart' style='height:400px;width:auto;'></div>"+
                                "</div>"+
                            "</div>"+
                            "<!-- END BAR CHART -->";

        $('div#facilities').html(chartToAppend);

        // Place a post request
        var dataUrl = "db/fetch/ordering_points_visualizer.php";
        $.ajax
        ({
            type: 'GET',
            url: dataUrl,
            data:{program_id:program},
            dataType: 'json',
            contentType: 'application/json',
            success: function(values) 
            {
                Morris.Bar
                (
                    {
                        element: 'orderingpoints-bar-chart',
                        data: values,
                        xkey: ['y'],
                        ykeys: ['a'],
                        labels: ['County'],
                        barColors: ['#33414E']
                    }
                );
            },
            error:function(error)
            {

            }
        });    
    }

    else if(type == "Service Points")
    {
        if (contentDiv.hasClass("col-md-9"))
        {
            var heading =  "<span style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                    "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+
                                "Service Points Distribution By County Bar Chart"+
                                "<div class='col-md-offset-9' style = 'margin-top:-30px'>"+
                                    "<span>"+
                                        "<a  class='btn btn-default btn' download='service_points_by_county_bar_chart.xls' href='#'"+
                                            "onclick='return ExcellentExport.excel(this, \"servicepoints-bar-chart\", \"reportTitle\");'>"+
                                            "<i class='fa fa-file-excel-o'></i>Export"+
                                        "</a>"+
                                    "</span>"+

                                    "<span style = 'margin-left:10px' class = 'btn btn-info btn'>"+
                                        "<i class='fa fa-list' style = 'font-size:10pt'"+
                                            "onclick='javascript:sitesDistribution(\""+type+"\",\""+program+"\",\""+orgUnit+"\",\""+orgUnitLevel+"\");'>"+
                                            " List"+
                                        "</i>"+
                                    "</span>"+

                                "</div>"+
                            "</span>";

        } 

        else if (contentDiv.hasClass("col-md-12"))
        {
            var heading =  "<span style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                    "<img src='assets/img/icon-restore.png' class = 'unclickedColor' style = 'height:100%;width:3%;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+
                                "Service Points Distribution By County Bar Chart"+
                                "<div class='col-md-offset-9' style = 'margin-top:-30px'>"+
                                    "<span>"+
                                        "<a  class='btn btn-default btn' download='service_points_by_county_bar_chart.xls' href='#'"+
                                            "onclick='return ExcellentExport.excel(this, \"servicepoints-bar-chart\", \"reportTitle\");'>"+
                                            "<i class='fa fa-file-excel-o'></i>Export"+
                                        "</a>"+
                                    "</span>"+

                                    "<span style = 'margin-left:10px' class = 'btn btn-info btn'>"+
                                        "<i class='fa fa-list' style = 'font-size:10pt'"+
                                            "onclick='javascript:sitesDistribution(\""+type+"\",\""+program+"\",\""+orgUnit+"\",\""+orgUnitLevel+"\");'>"+
                                            " List"+
                                        "</i>"+
                                    "</span>"+

                                "</div>"+
                            "</span>";

        }

        $('div#returned_messages').html(heading);

        var chartToAppend = "<!-- START BAR CHART -->"+
                            "<div class='panel panel-default' style = 'width:95%'>"+
                                "<div class='panel-heading' style = 'color:black'>"+
                                    "<span class='panel-title' id='reportTitle' style = 'font-family:font awesome'>"+
                                        "<span>Program: "+
                                            "<span id = 'program_name' style = 'color:green;font-size:11pt'></span>"+
                                        "</span><br>"+
                                        "<span>Pipeline: "+
                                            "<span style = 'font-size:11pt;color:green'>KEMSA</span>"+
                                        "</span><br>"+
                                        "<span>Report: "+
                                            "<span style = 'font-size:11pt;color:green'>Service Points Distribution Chart</span>"+
                                        "</span><br>"+
                                        "<span>Level: "+
                                            "<span id = 'report_level' style = 'font-size:11pt;color:green'>By County</span>"+
                                        "</span><br>"+
                                        "<span>Date Generated: <span style = 'color:green;font-size:11pt'>"+dateGenerated+"</span></span><br>"+
                                    "</span>"+                             
                                "</div>"+

                                "<div class='panel-body'>"+
                                    "<div id='servicepoints-bar-chart' style='height: 300px;width:auto;'></div>"+
                                "</div>"+
                            "</div>"+
                            "<!-- END BAR CHART -->";

        $('div#facilities').html(chartToAppend);

        // Place a post request
        var dataUrl = "db/fetch/service_points_visualizer.php";
        $.ajax
        ({
            type: 'GET',
            url: dataUrl,
            data:{program_id:program},
            dataType: 'json',
            contentType: 'application/json',
            success: function(values) 
            {
                Morris.Bar
                (
                    {
                        element: 'servicepoints-bar-chart',
                        data: values,
                        xkey: ['y'],
                        ykeys: ['a'],
                        labels: ['County'],
                        barColors: ['#33414E']
                    }
                );
            },
            error:function(error)
            {

            }
        }); 
    }

    var dataUrl = "db/fetch/get_program_name.php";
    $.getJSON
    (
        dataUrl,
        {program_id:program},
        function(results)
        {
            $("#program_name").html(results[0].program_name);
        }
    );
}

/* -------------------------------------------------------------------------------------------------------------------------- */