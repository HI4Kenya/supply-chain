/*function hierarchyReport()*/
function hierarchyReport()
{
    $('div#returned_messages').html("<span style = 'color:green;margin-left:0px'> Supply Pipeline Hierarchy</span></span>");
                //Central Stores 
    var data = "<div class='panel panel-default' style = 'width:40%'>"+
                    "<div class='panel-heading'> "+                               
                        "<h3 class='panel-title'>Programs <span style = 'color:blue;font-size:9pt'>[Showing the various site classifications]</span></h3> "+                             
                    "</div>"+
                    "<div class='panel-body' id = 'central_stores'>"+
                    "</div>"+
                "</div>";
    // Append
    $('div#facilities').html(data);

    //Fetch programs
    var programs_url = "db/fetch/get_programs.php";
    $.getJSON
    (
        programs_url,
        function(responseData)
        {
            for(var no=0; no<responseData.length;no++)
            {  
                var allProgramsToAppend = "<div style='color:#23527C;font-size:8pt' id='central_accordion'>"+
                                                "<a data-toggle='collapse' data-parent='#"+responseData[no].program_id+"' href='#"+responseData[no].program_id+"'>"+
                                                    "<span class='glyphicon glyphicon-plus-sign'></span> "+
                                                "</a>"+
                                                "<span class = 'fa fa-folder-o unclickedColor' onclick =''> "+responseData[no].program_name+"</span>"+                                            
                                            "</div>"+
                                            "<div id='"+responseData[no].program_id+"' class='panel-collapse collapse'>"+
                                                "<div class='panel-body' id = 'program"+responseData[no].program_id+"'>"+

                                                    "<a data-toggle='collapse' data-parent='#supply_hierarchy_cs' href='#supply_hierarchy_cs"+responseData[no].program_id+"' style = 'margin-left:10px'>"+
                                                        "<span class='fa fa-plus-square-o'></span> "+
                                                        "<span class='fa fa-folder-o'></span> "+
                                                    "</a>"+

                                                    "<span style = 'color:blue;font-size:10pt'>Central Sites</span>"+
                                                    "<div id = 'supply_hierarchy_cs"+responseData[no].program_id+"' class = 'panel-collapse collapse'>"+
                                                    "</div>"+
                                                    "<br>"+

                                                    "<a data-toggle='collapse' data-parent='#supply_hierarchy_sa' href='#supply_hierarchy_sa"+responseData[no].program_id+"' style = 'margin-left:10px'>"+
                                                        "<span class='fa fa-plus-square-o'></span> "+
                                                        "<span class='fa fa-folder-o'></span> "+                                          
                                                    "</a>"+

                                                    "<span style = 'color:blue;font-size:10pt'>StandAlone Sites</span>"+
                                                    "<div id = 'supply_hierarchy_sa"+responseData[no].program_id+"' class = 'panel-collapse collapse'>"+
                                                    "</div>"+

                                                "</div>"+
                                            "</div>";
                $(allProgramsToAppend).appendTo("div#central_stores");

                //Fetch Central Sites
                var centralstores_url = "db/fetch/get_supply_hierarchy.php";
                $.getJSON
                (
                    centralstores_url,
                    {program:responseData[no].program_id,classification:'Central Site'},
                    function(received)
                    {
                        for(var j=0; j<received.length-1;j++)
                        {
                            var toAppend = "<div style='color:#23527C;font-size:8pt;margin-left:25px;' id='central_accordion'>"+
                                                "<a data-toggle='collapse' data-parent='#"+received[j].facility_id+"' href='#program"+received[received.length-1].program_id+received[j].facility_id+"'>"+
                                                    "<span class='glyphicon glyphicon-plus-sign'></span> "+
                                                "</a>"+
                                                "<span class = 'fa fa-folder-o unclickedColor' style = '' onclick =''> "+received[j].facility_name+"</span>"+                                            
                                            "</div>"+
                                            "<div id='program"+received[received.length-1].program_id+received[j].facility_id+"' class='panel-collapse collapse'>"+
                                                "<div class='panel-body' id = 'satellite"+received[j].facility_id+"'>"+
                                                "</div>"+
                                            "</div>";
                            $(toAppend).appendTo("div#supply_hierarchy_cs"+received[received.length-1].program_id);

                            //Fetch Satellite Sites for the current Central Store
                            var satellite_url = "db/fetch/get_supply_hierarchy.php";
                            $.getJSON
                            (
                                satellite_url,
                                {program:+received[received.length-1].program_id,classification:'Satellite Site',central_id:received[j].facility_id},
                                function(values)
                                {  
                                    /* 
                                    The reason for looping with values.length-1 is to ensure the last item returned is not appended
                                    because it is the parent of the satellites returned
                                    */
                                    for(var k=0; k<values.length-2;k++)
                                    {                                  
                                        var satellitesToAppend ="<div style='color:#23527C;font-size:8pt;margin-left:25px;' class = 'unclickedColor' onclick =''>"+
                                                                    values[k].facility_name+
                                                                    "<span style = 'color:black' id = 'satellite_classification"+values[k].facility_id+"'></span>"+
                                                                "</div>";
                                        /* 
                                        The last item returned is the parent of the satellites returned. It had been appended as the 
                                        id of the parent div where we need to append the satellite sites we have fetched
                                        */
                                        $("div#satellite"+values[values.length-2].facility_id).append(satellitesToAppend);
                                        
                                        //Distinguish central site dispensing points from other satellites
                                        if((values[k].facility_id)==(values[values.length-2].facility_id))
                                        {
                                            $("span#satellite_classification"+values[k].facility_id).html("[CS dispensing point]");
                                        }

                                        else if((values[k].facility_id)!=(values[values.length-1].facility_id))
                                        {
                                            $("span#satellite_classification"+values[k].facility_id).html("[Satellite site]");
                                        }
                                        
                                    }  
                                }
                            );
                        }   
                    }
                );

                //Fetch Stand Alone Sites
                var standalone_url = "db/fetch/get_supply_hierarchy.php";
                $.getJSON
                (
                    standalone_url,
                    {program:responseData[no].program_id,classification:'StandAlone'},
                    function(received)
                    {
                        for(var j=0; j<received.length-1;j++)
                        {  
                            var standalonesToAppend = "<div class = 'unclickedColor' style='color:#23527C;font-size:8pt;margin-left:25px;' onclick =''>"+
                                                        received[j].facility_name+
                                                        "</div>";
                            $(standalonesToAppend).appendTo("div#supply_hierarchy_sa"+received[received.length-1].program_id);
                        }  
                    }
                );               
            }
        }
    );
}

/*Function getAnalytics()*/
// This function queries DHIS2 API for anlytics on the passed parameters
function getAnalytics()
{
    var analyticsCriteria = "<div class='panel-body'>"+
                                "<div class='panel-heading' style ='width:360px;background-color:#d0eBd0;font-weight:normal;font-size:10pt;border:1px solid #a4d2a3;padding:20px'>"+
                                    // Program
                                    "<span>Report Program</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
                                    "<select id = 'report_programs' style='width:100%;margin-bottom:10px' onchange='javascript:programDetails();'>"+
                                        "<option value = 'none selected'>[Select Program Type]</option>"+
                                    "</select>"+

                                    "<span>Data Set</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
                                    "<select id = 'dataSets' style = 'width:100%;margin-bottom:10px'>"+
                                        "<option value = 'none selected'>[Select]</option>"+
                                    "</select>"+
                                    "<br>"+
                                    "<span>Report Period</span><span style = 'color:red;margin-left:10px'>*</span><br>"+

                                    "<select id = 'periodType' style='width:60%' onchange='javascript:changePeriod()'>"+
                                        "<option value = 'none selected'>[Select Period Type]</option>"+
                                        // "<option value = 'daily'>Daily</option>"+
                                        // "<option value = 'weekly'>Weekly</option>"+
                                        "<option value = 'monthly'>Monthly</option>"+
                                        "<option value = 'bi-monthly'>Bi-Monthly</option>"+
                                        "<option value = 'quarterly'>Quarterly</option>"+
                                        "<option value = 'six-monthly'>Six Monthly</option>"+
                                        "<option value = 'yearly'>Yearly</option>"+
                                    "</select>"+

                                    "<input type ='button' value='Prev Year' style ='font-size:8pt' onchange=''></input>"+
                                    "<input type ='button' value='Next Year' style ='font-size:8pt' onchange=''></input>"+
                                    
                                    "<select id = 'period' style = 'width:100%;margin-bottom:10px'>"+
                                    "</select>"+

                                    "<span>Report Organization Unit</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
                                    "<div id = 'report_org_unit' style = 'background-color:white;padding:px;height:200px;overflow:scroll'>"+
                                        "<a data-toggle='collapse' data-parent='#supply_hierarchy_cs' href='#supply_hierarchy_cs' style = 'margin-left:10px'>"+
                                            "<span class='fa fa-plus-square-o'></span> "+
                                        "</a>"+

                                        "<span style = 'color:blue;font-size:10pt'>Central Sites</span>"+
                                        "<div id = 'supply_hierarchy_cs' class = 'panel-collapse collapse'>"+
                                        "</div>"+
                                        "<br>"+

                                        "<a data-toggle='collapse' data-parent='#supply_hierarchy_sa' href='#supply_hierarchy_sa' style = 'margin-left:10px'>"+
                                            "<span class='fa fa-plus-square-o'></span> "+                                            
                                        "</a>"+

                                        "<span style = 'color:blue;font-size:10pt'>StandAlone Sites</span>"+
                                        "<div id = 'supply_hierarchy_sa' class = 'panel-collapse collapse'>"+
                                        "</div>"+
                                    "</div>"+
                                    "<button class = 'btn btn-success btn-sm' style = 'margin-top:10px;width:40%' onclick='javascript:reportData()'>Get Report</button>"+
                                    "<button class = 'btn btn-danger btn-sm' style = 'margin-top:10px;margin-left:10px;width:40%;' onclick='javascript:getAnalytics()'>Reset</button>"+                            
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

    $('div#returned_messages').html("<span style = 'color:green'>DATA CRITERIA</span> ");
    $('div#facilities').empty();
    $('div#facilities').html(analyticsCriteria);
}
/*END */
/* ...............................................................................................................................*/

//Function programDetails()
function programDetails()
{
    //Programs
    var programSelectList = document.getElementById("report_programs");
    var programSelectIndex = programSelectList.selectedIndex; 
    var programSelectOptions = programSelectList.options;
    var selectedProgramID = programSelectOptions[programSelectIndex].value;

    //Fetch Datasets
    var datasets_url = "db/fetch/get_program_datasets.php";
    $.getJSON
    ( 
        datasets_url,
        {program:selectedProgramID},
        function(receivedValues) 
        {
            $('select#dataSets').empty();
            $("<option value = 'none selected'>[Select]</option>").appendTo("select#dataSets");
            for(var datasetsNo = 0; datasetsNo<receivedValues.length; datasetsNo++)
            {
                $("<option id = '"+receivedValues[datasetsNo].dataset_id+"' value = '"+receivedValues[datasetsNo].dataset_id+"'>"
                +receivedValues[datasetsNo].dataset_name+"</option>").appendTo("select#dataSets");   
            }
        }
    );

    //Fetch Central Stores
    var centralstores_url = "db/fetch/get_central_sites.php";
    $.getJSON
    (
        centralstores_url,
        {program:selectedProgramID},
        function(received)
        {
            $('div#supply_hierarchy_cs').empty();
            for(var j=0; j<received.length;j++)
            {
                var toAppend = "<div style='color:#23527C;font-size:8pt;margin-left:20px' id='central_accordion'>"+
                                    "<a data-toggle='collapse' data-parent='#"+received[j].facility_id+"' href='#"+received[j].facility_id+"'>"+
                                        "<span class='fa fa-plus-square-o'></span> "+
                                    "</a>"+
                                    "<span id = 'facility_"+received[j].facility_id+"' value = '"+received[j].facility_id+"' classification = 'central site'"+
                                        "class = 'fa fa-folder-o unclickedColor color' onclick ='javascript:selectFacility(\"facility_"+received[j].facility_id+"\")'> "+
                                        received[j].facility_name+
                                    "</span>"+                                            
                                "</div>"+

                                // Where satellites will be appended
                                "<div id='"+received[j].facility_id+"' class='panel-collapse collapse' style ='margin-left:20px'>"+
                                    "<div class='panel-body' id = 'facility_satellite"+received[j].facility_id+"'>"+
                                    "</div>"+
                                "</div>";
                $(toAppend).appendTo("div#supply_hierarchy_cs");

                //Fetch Satellite Sites for the current Central Store
                var satellite_url = "db/fetch/get_satellite_sites.php";
                $.getJSON
                (
                    satellite_url,
                    {program:selectedProgramID,central_id:received[j].facility_id},
                    function(values)
                    {  
                        /* 
                        The reason for looping with values.length-1 is to ensure the last item returned is not appended
                        because it is the parent of the satellites returned
                        */
                        $("div#facility_satellite"+values[values.length-1].facility_id).empty();
                        for(var k=0; k<values.length-1;k++)
                        {                                  
                            var satellitesToAppend ="<div style='color:;font-size:8pt;' id = 'satellite_"+values[k].facility_id+"' value = '"+values[k].facility_id+"' classification = 'satellite site'"+
                                                        "class = 'unclickedColor color' onclick ='javascript:selectFacility(\"satellite_"+values[k].facility_id+"\")'>"+
                                                        values[k].facility_name+
                                                        "<span style = 'color:black' id = 'satellite_classification"+values[k].facility_id+"'></span>"+
                                                    "</div>";
                            /* 
                            The last item returned is the parent of the satellites returned. It had been appended as the 
                            id of the parent div where we need to append the satellite sites we have fetched
                            */
                            $("div#facility_satellite"+values[values.length-1].facility_id).append(satellitesToAppend);
                            //Distinguish central site dispensing points from other satellites
                            if((values[k].facility_id)==(values[values.length-1].facility_id))
                            {
                                $("span#satellite_classification"+values[k].facility_id).html("[CS dispensing point]");
                            }

                            else if((values[k].facility_id)!=(values[values.length-1].facility_id))
                            {
                                $("span#satellite_classification"+values[k].facility_id).html("[Satellite site]");
                            }
                            
                        }  
                    }
                );
            }   
        }
    );

    //Fetch Stand Alone Sites
    var standalone_url = "db/fetch/get_standalone_sites.php";
    $.getJSON
    (
        standalone_url,
        {program:selectedProgramID},
        function(received)
        {
            $('div#supply_hierarchy_sa').empty();
            for(var j=0; j<received.length;j++)
            {  
                var standalonesToAppend = "<div id = 'facility_"+received[j].facility_id+"' value = '"+received[j].facility_id+"' classification = 'stand alone'"+
                                            "class = 'unclickedColor color' onclick ='javascript:selectFacility(\"facility_"+received[j].facility_id+"\")' style='color:;font-size:8pt;margin-left:20px'>"+
                                            received[j].facility_name+
                                            "</div>";
                $(standalonesToAppend).appendTo("div#supply_hierarchy_sa");
            }  
        }
    );
}
/*END */
/* ...............................................................................................................................*/

// Function changePeriod()
// Function to change the period depending on the period type
function changePeriod()
{
    // Get current year
    var date = new Date();
    var currentYear = date.getFullYear();

    // Get the selected period type
    var period = document.getElementById("periodType");
    var periodOptions = period.options[period.selectedIndex].value;

    if(periodOptions == "none selected")
    {
        // $("div#returned_messages").html("<span style =''>Please select a data set</span>");
        // $('select#period').html("<span style =''>Select a period type above</span>");
    }
    else if(periodOptions == "daily")
    {
        $('select#period').empty();
        new JsDatePick({
            useMode:2,
            target:"aFieldId",        
            isStripped:false,
            selectedDate:{
                year:2009,
                month:4,
                day:16
            },
            yearsRange: new Array(1971,2100),
            limitToToday:true,
        });       
    }

    else if(periodOptions == "weekly")
    {
        $('select#period').empty();

    }

    else if(periodOptions == "monthly")
    {
        var optionsToAppend =   "<option value = '"+currentYear+"12'>December"+" "+currentYear+"</option>"+
                                "<option value = '"+currentYear+"11'>November"+" "+currentYear+"</option>"+
                                "<option value = '"+currentYear+"10'>October"+" "+currentYear+"</option>"+
                                "<option value = '"+currentYear+"09'>September"+" "+currentYear+"</option>"+
                                "<option value = '"+currentYear+"08'>August"+" "+currentYear+"</option>"+
                                "<option value = '"+currentYear+"07'>July"+" "+currentYear+"</option>"+
                                "<option value = '"+currentYear+"06'>June"+" "+currentYear+"</option>"+
                                "<option value = '"+currentYear+"05'>May"+" "+currentYear+"</option>"+
                                "<option value = '"+currentYear+"04'>April"+" "+currentYear+"</option>"+
                                "<option value = '"+currentYear+"03'>March"+" "+currentYear+"</option>"+
                                "<option value = '"+currentYear+"02'>February"+" "+currentYear+"</option>"+
                                "<option value = '"+currentYear+"01'>January"+" "+currentYear+"</option>";

        $('select#period').empty();
        $(optionsToAppend).appendTo("select#period");
    }

    else if(periodOptions == "bi-monthly")
    {
        var optionsToAppend =   "<option>November-December</option>"+
                                "<option>September-October</option>"+
                                "<option>July-August</option>"+
                                "<option>May-June</option>"+
                                "<option>March-April</option>"+
                                "<option>January-February</option>";

        $('select#period').empty();
        $(optionsToAppend).appendTo("select#period");
    }

    else if(periodOptions == "quarterly")
    {
        var optionsToAppend =   "<option>October-December</option>"+
                                "<option>July-September</option>"+
                                "<option>April-June</option>"+
                                "<option>January-March</option>";

        $('select#period').empty();
        $(optionsToAppend).appendTo("select#period");
    }

    else if(periodOptions == "six-monthly")
    {
        var optionsToAppend =   "<option>July-December</option>"+
                                "<option>January-June</option>";

        $('select#period').empty();
        $(optionsToAppend).appendTo("select#period");
    }

    else if(periodOptions == "yearly")
    {
        var optionsToAppend =   "<option value = '2015'>2015</option>"+
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
                                "<option value = '2000'>2000</option>";

        $('select#period').empty();
        $(optionsToAppend).appendTo("select#period");
    }

}
// END FUNCTION
/* ................................................................................................................................*/

// Function generateReport()
// Function to fetch data from DHIS2 web API
function reportData()
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
            },
            1500
        );
    }
    else
    {
        var dataSet = document.getElementById("dataSets");
        var dataSetOptions = dataSet.options[dataSet.selectedIndex].value;

        if(dataSetOptions == "none selected")
        {
            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                    "<span style ='margin-left:80px'>"+
                                        "Please select a data set"+
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
                            },
                            1500
                        );
                    }
                    else
                    {
                        var the_number = 0;
                        var selectedFacilityID = selectedFacility[the_number].getAttribute("value");
                        var selectedFacilityClassification = selectedFacility[the_number].getAttribute("classification");
                        
                        // Get report
                        // Pass necessary parameters
                        generateReport(selectedProgramID, dataSetOptions, periodOptions, reportPeriodOptions, selectedFacilityID, selectedFacilityClassification);
                    }

                }

            }

        }
    }

    if(selectedFacilityClassification=="central site")
    {
        
    }
}
// End function
/* -------------------------------------------------------------------------------------------------------------------------------*/

function generateReport(selectedProgramID, dataSetOptions, periodOptions, reportPeriodOptions, selectedFacilityID, selectedFacilityClassification)
{
    if(selectedFacilityClassification == "central site")
    {
        var MOH730A = "client/report_templates/MOH730A.php";
        reportTemplate(MOH730A, reportPeriodOptions, selectedFacilityID, dataSetOptions);
        
        //Fetch Satellite Sites for the current Central Site
        var satellite_url = "db/fetch/get_satellite_sites.php";
        $.getJSON
        (
            satellite_url,
            {central_id:selectedFacilityID},
            function(values)
            {  
                /* 
                    The reason for looping with values.length-1 is to ensure the last item returned is not appended
                    because it is the parent of the satellites returned.

                    The last item returned is the parent of the satellites returned. It had been appended as the 
                    id of the parent div where we need to append the satellite sites we have fetched.
                */
                for(var k=0; k<values.length-1;k++)
                {                                  

                   alert(values[k].facility_id);

                    
                }  
            }
        );
    }

    else if((selectedFacilityClassification == "satellite site")||(selectedFacilityClassification == "standalone site"))
    {
        var MOH730B = "client/report_templates/MOH730B.php";
        reportTemplate(MOH730B, reportPeriodOptions, selectedFacilityID, dataSetOptions);
    }

}

// Function reportTemplate
function reportTemplate(templateUrl, period, orgUnit, dataSet)
{
    $.get(templateUrl).then
    (
        function(responseData) 
        {
            $('div#facilities').empty();
            $('div#facilities').append(responseData);

            // Append data
            // var period = reportPeriodOptions;
            // var orgUnit = selectedFacilityID;
            // var dataSet = dataSetOptions;

            var urlDataSet=null;
            //loading the dataSet template
            urlDataSet="http://test.hiskenya.org/api/dataSets/"+dataSet+"/dataValueSet.jsonp?callback=?";
            //url for getting datavalues and org unit details
            var url="http://test.hiskenya.org/api/dataValues.jsonp?pe="+ period+"&ou=" +orgUnit;
            var urlOrgUnit="http://test.hiskenya.org/api/organisationUnits/"+orgUnit+".jsonp?callback=?";

            //Getting and Setting the facility Name
            getOrganisationUnitName(urlOrgUnit);

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


            //function to get the name of the orgUnit
            function getOrganisationUnitName(urlOrgUnit){
                var jqxhr = $.getJSON(urlOrgUnit);
                jqxhr.done(function (response) {
                    var tableItem=$("#facility_detail");
                    var tablefacilityid=$("#facility_id");
                    var facility=response.name;
                    var facilityid=response.code;
                    tableItem.text(facility);
                    tablefacilityid.text(facilityid);


                });

            };
        }
    );    
}