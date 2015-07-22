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
    var dateGenerated = new Date();

    if(type == "Ordering Points")
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> List of Ordering Points</span>");

        var data =  "<div class='panel panel-default' style = 'margin-left:-30px;margin-top:0px'>"+
                        "<div class='panel-heading'>"+
                            "<h3 class='panel-title'>"+
                                "<span>Program: ART</span><br>"+
                                "<span>Pipeline: KEMSA</span><br>"+
                                "<span>Date Generated: <span style = 'color:green'>"+dateGenerated+"</span></span><br>"+
                            "</h3>"+                                
                        "</div>"+
                        "<table id= 'orderingpoints' style = 'border-radius:5px;width:95%;margin-top:5px'>"+
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
        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> List of Service Points</span>");

        var data =  "<div class='panel panel-default' style = 'margin-left:-30px;margin-top:0px'>"+
                        "<table id= 'servicepoints' style = 'border-radius:5px;width:95%'>"+
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
                                            "<td style = 'text-align:left' id = 'dispensing_point_"+results[counting].facility_id+"'></td>"+
                                            "<td style = 'text-align:left' id = 'satellite_site_"+results[counting].facility_id+"'></td>"+
                                            "<td style = 'text-align:left' id = 'standalone_site_"+results[counting].facility_id+"'></td>"+
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
                                $("#dispensing_point_"+receivedDetails[3]).html("<span class = 'fa fa-times' style = 'margin-left:40px'></span>");
                            }

                            else if(receivedDetails[0] == "Satellite Site")
                            {
                                $("#satellite_site_"+receivedDetails[3]).html("<span class = 'fa fa-times' style = 'margin-left:40px'></span>");
                            }

                            else if(receivedDetails[0] == "StandAlone")
                            {
                                $("#standalone_site_"+receivedDetails[3]).html("<span class = 'fa fa-times' style = 'margin-left:40px'></span>");
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

}

/* -------------------------------------------------------------------------------------------------------------------------- */

// Function sitesDistribution
function sitesDistribution(type,program,orgUnit, orgUnitLevel)
{
    if(type == "Ordering Points")
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> Ordering Points Distribution by County</span>");

        var data =  "<div class='panel panel-default' style = 'margin-left:-30px;margin-top:0px'>"+
                        "<div class='panel-heading'>"+
                            "<h3 class='panel-title'>"+
                                "Ordering Points Distribution By County"+
                                "<select class='form-control' style = 'margin-left:800px;margin-top:-30px;width:10%;' id = 'view_as_select'"+
                                "onchange = 'javascript:sitesDistributionVisualizer(\"Ordering Points\",\""+program+"\",\""+orgUnit+"\",\""+orgUnitLevel+"\");'>"+
                                    "<option value = 'View As'>View As</option>"+
                                    "<option value = 'Bar Chart'>Bar Chart</option>"+
                                "</select>"+
                            "</h3>"+                                
                        "</div>"+
                        "<table id= 'orderingpointsdistribution' style = 'border-radius:5px;width:95%'>"+
                            "<thead>"+
                                "<th style = 'font-weight:bold'>#</th>"+
                                "<th style = 'font-weight:bold'>County</th>"+
                                "<th style = 'font-weight:bold'>Sub-County Stores</th>"+
                                "<th style = 'font-weight:bold'>Central Sites</th>"+
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
                //alert(counties.length);
                for(var counting=0; counting<counties.length;counting++)
                {
                    var itemNumber = counting+1;
                    var dataToAppend = "<tr>"+
                                            "<td>"+itemNumber+"</td>"+
                                            "<td style = 'text-align:left'>"+counties[counting].county_name+"</td>"+
                                            "<td style = 'text-align:left' id = 'subcounty_stores_"+counties[counting].county_id+"'></td>"+
                                            "<td style = 'text-align:left' id = 'central_sites_"+counties[counting].county_id+"'></td>"+
                                            "<td style = 'text-align:left' id = 'standalone_sites_"+counties[counting].county_id+"'></td>"+
                                            "<td style = 'text-align:left' id = 'total_"+counties[counting].county_id+"'></td>"+
                                        "</tr>";
                    //$('#userdata tr:last').after(dataToAppend);
                    $(dataToAppend).appendTo("#orderingpointsdistribution tbody");

                    var dataUrl = "db/fetch/ordering_points_distribution.php";
                    $.getJSON
                    (
                        dataUrl,
                        {program_id:program,org_unit:counties[counting].county_id,org_unit_level:orgUnitLevel},
                        function(results)
                        {
                            for(var counting=0; counting<results.length;counting++)
                            { 
                                $("#subcounty_stores_"+results[4]).html("<span style ='color:'>"+results[0]+"</span>");
                                $("#central_sites_"+results[4]).html("<span style ='color:'>"+results[1]+"</span>");
                                $("#standalone_sites_"+results[4]).html("<span style ='color:'>"+results[2]+"</span>");
                                $("#total_"+results[4]).html("<span style ='color:'>"+results[3]+"</span>");
                            }
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
        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> Service Points Distribution by County</span>");

        var data =  "<div class='panel panel-default' style = 'margin-left:-30px;margin-top:0px'>"+
                        "<table id= 'servicepointsdistribution' style = 'border-radius:5px;width:95%'>"+
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
                //alert(counties.length);
                for(var counting=0; counting<counties.length;counting++)
                {
                    var itemNumber = counting+1;
                    var dataToAppend = "<tr>"+
                                            "<td>"+itemNumber+"</td>"+
                                            "<td style = 'text-align:left'>"+counties[counting].county_name+"</td>"+
                                            "<td style = 'text-align:left' id = 'dispensing_points_"+counties[counting].county_id+"'></td>"+
                                            "<td style = 'text-align:left' id = 'satellite_sites_"+counties[counting].county_id+"'></td>"+
                                            "<td style = 'text-align:left' id = 'standalone_sites_"+counties[counting].county_id+"'></td>"+
                                            "<td style = 'text-align:left' id = 'total_"+counties[counting].county_id+"'></td>"+
                                        "</tr>";
                    //$('#userdata tr:last').after(dataToAppend);
                    $(dataToAppend).appendTo("#servicepointsdistribution tbody");

                    var dataUrl = "db/fetch/service_points_distribution.php";
                    $.getJSON
                    (
                        dataUrl,
                        {program_id:program,org_unit:counties[counting].county_id,org_unit_level:orgUnitLevel},
                        function(results)
                        {
                            for(var counting=0; counting<results.length;counting++)
                            { 
                                $("#dispensing_points_"+results[4]).html("<span style ='color:'>"+results[0]+"</span>");
                                $("#satellite_sites_"+results[4]).html("<span style ='color:'>"+results[1]+"</span>");
                                $("#standalone_sites_"+results[4]).html("<span style ='color:'>"+results[2]+"</span>");
                                $("#total_"+results[4]).html("<span style ='color:'>"+results[3]+"</span>");
                            }
                            // $(function()
                            // {
                            //     $("#orderingpoints").dataTable();
                            // });

                        }
                    );

                }
            }
        );
    }

}

/* -------------------------------------------------------------------------------------------------------------------------- */

// Function sitesVisualizer()
function sitesDistributionVisualizer(type,program,orgUnit, orgUnitLevel)
{
    var viewSelectList = document.getElementById("view_as_select");
    var viewSelectIndex = viewSelectList.selectedIndex; 
    var viewSelectOptions = viewSelectList.options;
    var selectedview = viewSelectOptions[viewSelectIndex].value;

    if((selectedview == "Bar Chart")&&(type == "Ordering Points"))
    {
        var chartToAppend = "<!-- START BAR CHART -->"+
                            "<div class='panel panel-default' style = 'width:95%'>"+
                                "<div class='panel-heading'>"+
                                    "<h3 class='panel-title'>Bar Chart</h3>"+                              
                                "</div>"+
                                "<div class='panel-body'>"+
                                    "<div id='orderingpoints-bar-chart' style='height: 300px;'></div>"+
                                "</div>"+
                            "</div>"+
                            "<!-- END BAR CHART -->";

        $('div#facilities').html(chartToAppend);

        Morris.Bar
        (
            {
                element: 'orderingpoints-bar-chart',
                data: 
                [
                    { y: 'County',a: 0},
                ],
                xkey: 'y',
                ykeys: ['a'],
                labels: ['County'],
                barColors: ['#33414E']
            }
        );

        // Place a post request
        /*NOTES:
            At positions
                0 - Dispensing Points
                1 - Satellite Sites
                2 - StandAlone Sites
                3 - Total Ordering Points
                4 - County ID
        */
        var countyDetails = [];
        var countyData = [];

        var countiesUrl = "db/fetch/get_counties.php";
        $.getJSON
        (
            countiesUrl,
            function(counties)
            {
                for(var counting=0; counting<counties.length;counting++)
                {
                    countyDetails.push(counties[counting].county_name);

                    var dataUrl = "db/fetch/ordering_points_distribution.php";
                    $.getJSON
                    (
                        dataUrl,
                        {program_id:program,org_unit:counties[counting].county_id,org_unit_level:orgUnitLevel},
                        function(results)
                        {
                            countyData.push(results[3]);
                        }
                    );
                }
            }
        );
        //alert(countyDetails.length);
        // var parsedCountyDetails = $.parseJSON(countyDetails);
        // var parsedCountyData = $.parseJSON(countyData);

        // alert(parsedCountyDetails.length);

        // for(var i = 0; i<47; i++)
        // {
        //     alert(countyDetails.length);
        // }

        console.log(countyDetails);
        // console.log(countyData);
    }

    else if((selectedview == "Bar Chart")&&(type == "Service Points"))
    {
        var chartToAppend = "<!-- START BAR CHART -->"+
                            "<div class='panel panel-default' style = 'width:95%'>"+
                                "<div class='panel-heading'>"+
                                    "<h3 class='panel-title'>Bar Chart</h3>"+                               
                                "</div>"+
                                "<div class='panel-body'>"+
                                    "<div id='orderingpoints-bar-chart' style='height: 300px;'></div>"+
                                "</div>"+
                            "</div>"+
                            "<!-- END BAR CHART -->";

        $('div#facilities').html(chartToAppend);

        Morris.Bar
        (
            {
                element: 'orderingpoints-bar-chart',
                data: 
                [
                    { y: 'County',a: 0},
                ],
                xkey: 'y',
                ykeys: ['a'],
                labels: ['County'],
                barColors: ['#33414E']
            }
        );

        // Place a post request
        /*NOTES:
            At positions
                0 - Dispensing Points
                1 - Satellite Sites
                2 - StandAlone Sites
                3 - Total Ordering Points
                4 - County ID
        */
        var countyDetails = [];
        var countyData = [];

        var countiesUrl = "db/fetch/get_counties.php";
        $.getJSON
        (
            countiesUrl,
            function(counties)
            {
                for(var counting=0; counting<counties.length;counting++)
                {
                    countyDetails.push(counties[counting].county_name);

                    var dataUrl = "db/fetch/service_points_distribution.php";
                    $.getJSON
                    (
                        dataUrl,
                        {program_id:program,org_unit:counties[counting].county_id,org_unit_level:orgUnitLevel},
                        function(results)
                        {
                            countyData.push(results[3]);
                        }
                    );
                }
            }
        );

        console.log(countyDetails);
        console.log(countyData);

    }
}

/* -------------------------------------------------------------------------------------------------------------------------- */