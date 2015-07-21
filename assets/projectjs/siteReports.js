/*function siteAnalytics()*/
function siteAnalytics()
{
	$('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> SITES ANALYTICS (Generate ordering points or service points analysis)</span>");

    var analyticsCriteria = "<div class='panel-body'>"+
                                "<div class='panel-heading' style ='width:360px;background-color:#d0eBd0;font-weight:normal;font-size:10pt;border:1px solid #a4d2a3;padding:20px'>"+
                                    // Program
                                    "<span>Report Program</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
                                    "<select id = 'report_programs' style='width:100%;margin-bottom:10px' onchange='javascript:programDetails();'>"+
                                        "<option value = 'none selected'>[Select Program Type]</option>"+
                                    "</select>"+

                                    "<span>Report</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
                                    "<select id = 'report_type' style = 'width:100%;margin-bottom:10px'>"+
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
                    },
                    1500
                );
            }
            else
            {
                var the_number = 0;
                var selectedOrgUnitID = selectedOrgUnit[the_number].getAttribute("value");
                var selectedOrgUnitLevel = selectedOrgUnit[the_number].getAttribute("level");

                alert(selectedProgramID + selectedReportID + selectedOrgUnitID + selectedOrgUnitLevel);

                if(selectedReportID == "List of Ordering Points")
                {
                    listSites();
                }

                else if(selectedReportID == "List of Service Points")
                {
                    listSites();
                }

                else if(selectedReportID == "Ordering Points Distribution")
                {
                    sitesDistribution();
                }

                else if(selectedReportID == "Service Points Distribution")
                {
                    sitesDistribution();
                }
            }
        }

    }
}
/* -------------------------------------------------------------------------------------------------------------------------- */

// function listSites
function listSites(type,program)
{

}

/* -------------------------------------------------------------------------------------------------------------------------- */

// Function sitesDistribution
function sitesDistribution()
{

}

/* -------------------------------------------------------------------------------------------------------------------------- */

// Function sitesVisualizer()
function sitesVisualizer()
{

}

/* -------------------------------------------------------------------------------------------------------------------------- */