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
	            var selectedFacility = orgUnitsDiv.getElementsByClassName("selectedFacility");
	            if(selectedFacility.length < 1)
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
	                var selectedFacilityID = selectedFacility[the_number].getAttribute("value");
	                var selectedFacilityLevel = selectedFacility[the_number].getAttribute("level");

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
                    

	                alert(selectedReportID +periodOfTheReport+ selectedFacilityID + selectedFacilityLevel);
	                
	                if(selectedReportID == "Patients By Ordering Points")
	                {
	                    // Patients By Ordering Points
	                }

	                else if(selectedReportID == "Patients By Regimen")
	                {
	                    // Patients By Regimen
	                }

	                else if(selectedReportID == "Stock Status")
	                {
	                    // Stock Status
	                }

	                else if(selectedReportID == "Reporting Rate")
	                {
	                    // Reporting Rate
	                }
	            }

            }
        }
    }
}