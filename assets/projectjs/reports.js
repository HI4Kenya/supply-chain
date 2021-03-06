/*function hierarchyReport()*/
function hierarchyReport()
{
    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+
                                " Supply Pipeline Hierarchy</span></span>");
                //Central Stores 
    var data = "<div class='panel panel-default' style = 'width:40%'>"+
                    "<div class='panel-heading'> "+                               
                        "<h3 class='panel-title'>Programs <span style = 'color:blue;font-size:9pt'>[Showing the various site classifications]</span></h3> "+                             
                    "</div>"+
                    "<div class='panel-body' id = 'central_stores' style = 'max-height:800px;overflow:scroll'>"+
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
                                                    "<span id = 'programs_icon_"+responseData[no].program_id+"' class='glyphicon glyphicon-plus-sign' onclick = 'javascript:changeIcon(\"programs_icon_"+responseData[no].program_id+"\",\"programs_folder_"+responseData[no].program_id+"\")'></span> "+
                                                "</a>"+
                                                "<span id = 'programs_folder_"+responseData[no].program_id+"' class = 'fa fa-folder-o unclickedColor'> "+responseData[no].program_name+"</span>"+                                            
                                            "</div>"+
                                            "<div id='"+responseData[no].program_id+"' class='panel-collapse collapse'>"+
                                                "<div class='panel-body' id = 'program"+responseData[no].program_id+"'>"+

                                                    "<a data-toggle='collapse' data-parent='#supply_hierarchy_scs' href='#supply_hierarchy_scs"+responseData[no].program_id+"' style = 'margin-left:10px'>"+
                                                        "<span id = 'scs_icon_"+responseData[no].program_id+"' class='glyphicon glyphicon-plus-sign' onclick = 'javascript:changeIcon(\"scs_icon_"+responseData[no].program_id+"\",\"scs_folder_"+responseData[no].program_id+"\")'></span> "+
                                                    "</a>"+

                                                    "<span id = 'scs_folder_"+responseData[no].program_id+"' class = 'fa fa-folder-o unclickedColor color' style = 'font-size:10pt;'> Sub-County Stores</span>"+
                                                    "<div id = 'supply_hierarchy_scs"+responseData[no].program_id+"' class = 'panel-collapse collapse'>"+
                                                    "</div>"+
                                                    "<br>"+

                                                    "<a data-toggle='collapse' data-parent='#supply_hierarchy_cs' href='#supply_hierarchy_cs"+responseData[no].program_id+"' style = 'margin-left:10px'>"+
                                                        "<span id = 'cs_icon_"+responseData[no].program_id+"' class='glyphicon glyphicon-plus-sign' onclick = 'javascript:changeIcon(\"cs_icon_"+responseData[no].program_id+"\",\"cs_folder_"+responseData[no].program_id+"\")'></span> "+
                                                    "</a>"+

                                                    "<span id = 'cs_folder_"+responseData[no].program_id+"' class='fa fa-folder-o unclickedColor' style = 'font-size:10pt'> Central Sites</span>"+
                                                    "<div id = 'supply_hierarchy_cs"+responseData[no].program_id+"' class = 'panel-collapse collapse'>"+
                                                    "</div>"+
                                                    "<br>"+

                                                    "<a data-toggle='collapse' data-parent='#supply_hierarchy_sa' href='#supply_hierarchy_sa"+responseData[no].program_id+"' style = 'margin-left:10px'>"+
                                                        "<span id = 'sa_icon_"+responseData[no].program_id+"' class='glyphicon glyphicon-plus-sign' onclick = 'javascript:changeIcon(\"sa_icon_"+responseData[no].program_id+"\",\"sa_folder_"+responseData[no].program_id+"\")'></span> "+                                         
                                                    "</a>"+

                                                    "<span id = 'sa_folder_"+responseData[no].program_id+"' class='fa fa-folder-o unclickedColor' style = 'font-size:10pt'> StandAlone Sites</span>"+
                                                    "<div id = 'supply_hierarchy_sa"+responseData[no].program_id+"' class = 'panel-collapse collapse'>"+
                                                    "</div>"+

                                                "</div>"+
                                            "</div>";
                $(allProgramsToAppend).appendTo("div#central_stores");

                //Fetch sub county stores
                var centralstores_url = "db/fetch/get_supply_hierarchy.php";
                $.getJSON
                (
                    centralstores_url,
                    {program:responseData[no].program_id,classification:'Sub-County Store'},
                    function(received)
                    {
                        for(var j=0; j<received.length-1;j++)
                        {
                            var toAppend = "<div style='color:#23527C;font-size:8pt;margin-left:25px;' id='central_accordion'>"+
                                                "<a data-toggle='collapse' data-parent='#"+received[j].facility_id+"' href='#program"+received[received.length-1].program_id+received[j].facility_id+"'>"+
                                                    "<span id = 'scs_icon_"+received[j].facility_id+"' class='glyphicon glyphicon-plus-sign' onclick = 'javascript:changeIcon(\"scs_icon_"+received[j].facility_id+"\",\"scs_folder_"+received[j].facility_id+"\")'></span> "+
                                                "</a>"+
                                                "<span id = 'scs_folder_"+received[j].facility_id+"' class = 'fa fa-folder-o unclickedColor color' style = ''> "+received[j].facility_name+"</span>"+                                            
                                            "</div>"+
                                            "<div id='program"+received[received.length-1].program_id+received[j].facility_id+"' class='panel-collapse collapse'>"+
                                                "<div class='panel-body' id = 'satellite"+received[received.length-1].program_id+received[j].facility_id+"'>"+
                                                "</div>"+
                                            "</div>";
                            $(toAppend).appendTo("div#supply_hierarchy_scs"+received[received.length-1].program_id);

                            //Fetch Satellite Sites for the current sub county store
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
                                        var satellitesToAppend ="<div style='color:#23527C;font-size:8pt;margin-left:25px;' class = 'unclickedColor color' onclick =''>"+
                                                                    values[k].facility_name+
                                                                    "<span style = 'color:black' id = 'satellite_classification"+values[k].facility_id+"'></span>"+
                                                                "</div>";
                                        /* 
                                        The last item returned is the parent of the satellites returned. It had been appended as the 
                                        id of the parent div where we need to append the satellite sites we have fetched
                                        */
                                        $("div#satellite"+values[values.length-1].program_id+values[values.length-2].facility_id).append(satellitesToAppend);
                                        
                                        //Distinguish central site dispensing points from other satellites
                                        if((values[k].facility_id)==(values[values.length-2].facility_id))
                                        {
                                            $("span#satellite_classification"+values[k].facility_id).html("[Dispensing Point]");
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
                                                    "<span id = 'cs_icon_"+received[j].facility_id+"' class='glyphicon glyphicon-plus-sign' onclick ='javascript:changeIcon(\"cs_icon_"+received[j].facility_id+"\",\"cs_folder_"+received[j].facility_id+"\")'></span> "+
                                                "</a>"+
                                                "<span id = 'cs_folder_"+received[j].facility_id+"' class = 'fa fa-folder-o unclickedColor color' style = '' > "+received[j].facility_name+"</span>"+                                            
                                            "</div>"+
                                            "<div id='program"+received[received.length-1].program_id+received[j].facility_id+"' class='panel-collapse collapse'>"+
                                                "<div class='panel-body' id = 'satellite"+received[received.length-1].program_id+received[j].facility_id+"'>"+
                                                "</div>"+
                                            "</div>";
                            $(toAppend).appendTo("div#supply_hierarchy_cs"+received[received.length-1].program_id);

                            //Fetch Satellite Sites for the current Central Site
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
                                        var satellitesToAppend ="<div style='color:#23527C;font-size:8pt;margin-left:25px;' class = 'unclickedColor color' onclick =''>"+
                                                                    values[k].facility_name+
                                                                    "<span style = 'color:black' id = 'satellite_classification"+values[k].facility_id+"'></span>"+
                                                                "</div>";
                                        /* 
                                        The last item returned is the parent of the satellites returned. It had been appended as the 
                                        id of the parent div where we need to append the satellite sites we have fetched
                                        */
                                        $("div#satellite"+values[values.length-1].program_id+values[values.length-2].facility_id).append(satellitesToAppend);
                                        
                                        //Distinguish central site dispensing points from other satellites
                                        if((values[k].facility_id)==(values[values.length-2].facility_id))
                                        {
                                            $("span#satellite_classification"+values[k].facility_id).html("[Dispensing Point]");
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
                            var standalonesToAppend = "<div class = 'unclickedColor color' style='color:#23527C;font-size:8pt;margin-left:25px;' onclick =''>"+
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
                                    "</select>"+
                                    "<br>"+

                                    "<span>Report Organization Unit</span><span style = 'color:red;margin-left:10px'>*</span><br>"+
                                    "<div id = 'report_org_unit' style = 'background-color:white;padding:px;height:200px;overflow:scroll'>"+
                                        
                                        "<a data-toggle='collapse' data-parent='#supply_hierarchy_scs' href='#supply_hierarchy_scs' style = 'margin-left:10px'>"+
                                            "<span id = 'scs_icon' class='fa fa-plus-square-o' onclick = 'javascript:datasetReportIcon(\"scs_icon\")'></span> "+
                                        "</a>"+

                                        "<span style = 'color:blue;font-size:10pt'>Sub-County Stores</span>"+
                                        "<div id = 'supply_hierarchy_scs' class = 'panel-collapse collapse'>"+
                                        "</div>"+
                                        "<br>"+

                                        "<a data-toggle='collapse' data-parent='#supply_hierarchy_cs' href='#supply_hierarchy_cs' style = 'margin-left:10px'>"+
                                            "<span id = 'cs_icon' class='fa fa-plus-square-o' onclick = 'javascript:datasetReportIcon(\"cs_icon\")'></span> "+
                                        "</a>"+

                                        "<span style = 'color:blue;font-size:10pt'>Central Sites</span>"+
                                        "<div id = 'supply_hierarchy_cs' class = 'panel-collapse collapse'>"+
                                        "</div>"+
                                        "<br>"+

                                        "<a data-toggle='collapse' data-parent='#supply_hierarchy_sa' href='#supply_hierarchy_sa' style = 'margin-left:10px'>"+
                                            "<span id = 'sa_icon' class='fa fa-plus-square-o' onclick = 'javascript:datasetReportIcon(\"sa_icon\")'></span> "+                                            
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

    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'>DATA CRITERIA</span> ");
    $('div#facilities').empty();
    $('div#facilities').html(analyticsCriteria);

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

    //Fetch Sub-Conty Stores
    var subcountystores_url = "db/fetch/get_subcounty_stores.php";
    $.getJSON
    (
        subcountystores_url,
        {program:selectedProgramID},
        function(received)
        {
            $('div#supply_hierarchy_scs').empty();
            for(var j=0; j<received.length;j++)
            {
                var toAppend = "<div style='color:#23527C;font-size:8pt;margin-left:20px' id='central_accordion'>"+
                                    "<a data-toggle='collapse' data-parent='#"+received[j].facility_id+"' href='#"+received[j].facility_id+"'>"+
                                        "<span id = 'scs_icon_"+received[j].facility_id+"' class='fa fa-plus-square-o'"+
                                        "onclick = 'javascript:datasetReportIcon(\"scs_icon_"+received[j].facility_id+"\",\"facility_"+received[j].facility_id+"\")'></span> "+
                                    "</a>"+
                                    "<span id = 'facility_"+received[j].facility_id+"' value = '"+received[j].facility_id+"' classification = 'sub-county-store'"+
                                        "class = 'fa fa-folder-o unclickedColor color' onclick ='javascript:selectFacility(\"facility_"+received[j].facility_id+"\")'> "+
                                        received[j].facility_name+
                                    "</span>"+                                            
                                "</div>"+

                                // Where satellites will be appended
                                "<div id='"+received[j].facility_id+"' class='panel-collapse collapse' style ='margin-left:20px'>"+
                                    "<div class='panel-body' id = 'facility_satellite"+received[j].facility_id+"'>"+
                                    "</div>"+
                                "</div>";
                $(toAppend).appendTo("div#supply_hierarchy_scs");

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
                            var satellitesToAppend ="<div style='color:;font-size:8pt;' id = 'satellite_"+values[k].facility_id+"' value = '"+values[k].facility_id+"' classification = 'satellite-site'"+
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
                                $("span#satellite_classification"+values[k].facility_id).html("[Dispensing Point]");
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
                                        "<span id = 'cs_icon_"+received[j].facility_id+"' class='fa fa-plus-square-o'"+ 
                                        "onclick = 'javascript:datasetReportIcon(\"cs_icon_"+received[j].facility_id+"\",\"facility_"+received[j].facility_id+"\")'></span> "+
                                    "</a>"+
                                    "<span id = 'facility_"+received[j].facility_id+"' value = '"+received[j].facility_id+"' classification = 'central-site'"+
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
                            var satellitesToAppend ="<div style='color:;font-size:8pt;' id = 'satellite_"+values[k].facility_id+"' value = '"+values[k].facility_id+"' classification = 'satellite-site'"+
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
                                $("span#satellite_classification"+values[k].facility_id).html("[Dispensing Point]");
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
                var standalonesToAppend = "<div id = 'facility_"+received[j].facility_id+"' value = '"+received[j].facility_id+"' classification = 'standalone-site'"+
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
    var periodOptions =period.options[period.selectedIndex].value;

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
            limitToToday:true
        });       
    }

    else if(periodOptions == "weekly")
    {
        $('select#period').empty();
        $('select#year').show();

    }

    else if(periodOptions == "monthly")
    {
        var optionsToAppend =   "<option value = '12'>December</option>"+
                                "<option value = '11'>November</option>"+
                                "<option value = '10'>October</option>"+
                                "<option value = '09'>September</option>"+
                                "<option value = '08'>August</option>"+
                                "<option value = '07'>July</option>"+
                                "<option value = '06'>June</option>"+
                                "<option value = '05'>May</option>"+
                                "<option value = '04'>April</option>"+
                                "<option value = '03'>March</option>"+
                                "<option value = '02'>February</option>"+
                                "<option value = '01'>January</option>";

        $('select#period').empty();
        $(optionsToAppend).appendTo("select#period");
        $('select#year').show();
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
        $('select#year').show();
    }

    else if(periodOptions == "quarterly")
    {
        var optionsToAppend =   "<option>October-December</option>"+
                                "<option>July-September</option>"+
                                "<option>April-June</option>"+
                                "<option>January-March</option>";

        $('select#period').empty();
        $(optionsToAppend).appendTo("select#period");
        $('select#year').show();
    }

    else if(periodOptions == "six-monthly")
    {
        var optionsToAppend =   "<option>July-December</option>"+
                                "<option>January-June</option>";

        $('select#period').empty();
        $(optionsToAppend).appendTo("select#period");
        $('select#year').show();
    }

    else if(periodOptions == "yearly")
    {      
        var currentYear = new Date().getFullYear();
        var d1=new Date(2001, 1, 01);
        var d2=new Date();

        var milli=d2-d1;
        var milliPerYear=1000*60*60*24*365.26;

        var yearsApart=milli/milliPerYear;

        console.log(yearsApart)

        $('select#period').empty();
        for(var i = 0; i<yearsApart; i++)
        {
            $("<option value = '2015'>"+(currentYear-i)+"</option>").appendTo("select#period");
        }
        $('select#year').hide();
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
                $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'>DATA CRITERIA</span> ");
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
                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'>DATA CRITERIA</span> ");
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
                        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'>DATA CRITERIA</span> ");
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
                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'>DATA CRITERIA</span> ");
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
                                $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'>DATA CRITERIA</span> ");
                            },
                            1500
                        );
                    }
                    else
                    {
                        var the_number = 0;
                        var selectedFacilityID = selectedFacility[the_number].getAttribute("value");
                        var selectedFacilityClassification = selectedFacility[the_number].getAttribute("classification");
                        
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
                        
                        // Get report
                        // Pass necessary parameters
                        generateReport(selectedProgramID, dataSetOptions, periodOptions, periodOfTheReport, selectedFacilityID, selectedFacilityClassification);
                    }

                }

            }

        }
    }
}
// End function
/* -------------------------------------------------------------------------------------------------------------------------------*/

var urlOrgUnit="api/get_orgunit_details.php";

var datasetReportHeading =  "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                            "</span>"+
                            "&nbsp <span style = 'color:black'>|</span>"+
                            "<span style = 'color:green;margin-left:30px'>Dataset Report</span>";

function generateReport(selectedProgramID, dataSetOptions, periodOptions, periodOfTheReport, selectedFacilityID, selectedFacilityClassification)
{
    $('div#returned_messages').html(datasetReportHeading);

    var path="client/report_templates/";
    var multiplier=0;
    var form=null;
    var dataSetTemplate=null;
    var dataSetIDs=["rV6fPhufzlU","epnKYskZQGU","VoCwF0LPGjb","VOzBhzjvVcw",
        "HAcToQkdUS1","q1Or1k6pQAC","KoAUVRcQcX3","uAxwIxtsn6u","KUCi7uw6YhR"];

    if((selectedFacilityClassification == "central-site")||(selectedFacilityClassification == "sub-county-store"))
    {
        //Fetch Satellite Sites for the current Central Site
        var satellite_url ="db/fetch/get_satellite_sites.php";
        var satellites=[];
        //Default multiplier for central sites
        multiplier=3;


        $.getJSON
        (  satellite_url,
            {central_id:selectedFacilityID, program:selectedProgramID },
            function(values)
            {   //Fetching satellites for the central site
                for(var k=0; k<values.length-1;k++)
                {
                    satellites.push(values[k].facility_id);
                }

                if(dataSetOptions=="rV6fPhufzlU"){

                    dataSetTemplate=path+"dataSetTemplate.php";
                    reportTemplate730(dataSetTemplate,satellites, periodOfTheReport, selectedFacilityID, dataSetOptions);

                }
                else
                if(dataSetOptions=="epnKYskZQGU"){
                    dataSetTemplate=path+"dataSetTemplate.php";
                    reportTemplate734(dataSetTemplate, satellites,periodOfTheReport, selectedFacilityID, dataSetOptions);
                }
                else
                if(dataSetOptions=="VoCwF0LPGjb"){
                    dataSetTemplate=path+"dataSetTemplate.php";
                    reportTemplate729(dataSetTemplate, satellites,periodOfTheReport, selectedFacilityID, dataSetOptions);
                }
                else{
                    alert("Dataset Not found");
                }

            }
        );

    }
    else
    if(selectedFacilityClassification == "satellite-site")
    {
        multiplier=2;

        if(dataSetOptions=="VOzBhzjvVcw"){
            form="729B";
            dataSetTemplate=path+"dataSetTemplate.php";
            reportTemplate(dataSetTemplate, periodOfTheReport, selectedFacilityID, dataSetOptions,multiplier,form);
        }
        else
        if(dataSetOptions=="HAcToQkdUS1"){
            form="730B";
            dataSetTemplate=path+"dataSetTemplate.php";
            reportTemplate(dataSetTemplate, periodOfTheReport, selectedFacilityID, dataSetOptions,multiplier,form);
        }
        else
        if(dataSetOptions=="q1Or1k6pQAC"){
            dataSetTemplate=path+"dataSetTemplate.php";
            form="734B";
            reportTemplate(dataSetTemplate, periodOfTheReport, selectedFacilityID, dataSetOptions,multiplier,form);
        }
        else{
            alert("Dataset Not found");
        }

    }
    else
    if(selectedFacilityClassification == "standalone-site")
    {
        multiplier=3;

        if(dataSetOptions=="KoAUVRcQcX3"){
            form="729B";
            dataSetTemplate=path+"dataSetTemplate.php";
            reportTemplate(dataSetTemplate, periodOfTheReport, selectedFacilityID, dataSetOptions,multiplier,form);
        }
        else
        if(dataSetOptions=="uAxwIxtsn6u"){
            form="730B";
            dataSetTemplate=path+"dataSetTemplate.php";
            reportTemplate(dataSetTemplate, periodOfTheReport, selectedFacilityID, dataSetOptions,multiplier, form);
        }
        else
        if(dataSetOptions=="KUCi7uw6YhR"){
            dataSetTemplate=path+"dataSetTemplate.php";
            form="734B";
            reportTemplate(dataSetTemplate, periodOfTheReport, selectedFacilityID, dataSetOptions,multiplier,form);
        }
        else
        if($.inArray(dataSetIDs,dataSetOptions)==-1){ //DataSet not in the list of DataSets;
            dataSetTemplate=path+"dataSetTemplate.php";
            form=null;
            reportTemplate(dataSetTemplate, periodOfTheReport, selectedFacilityID, dataSetOptions,multiplier,form);
        }
        else{
            alert("DataSet Not found");
        }

    }
    else{

        alert("Wrong Classification");
    }


}


// Function reportTemplate(Generic)- for loading individual facility reports
function reportTemplate(templateUrl, period, orgUnit, dataSet,multiplier, form)
{
    var urlDataSetTemplate="api/get_dataset_template.php";

    $.get(templateUrl).then
    (
        function(responseData) {
            $('div#facilities').empty();
            $('div#facilities').append(responseData);

            $("#formData").empty();
            $("#formData").append('<img src="assets/img/ajax-loader-2.gif">');
            $.getJSON
            ( urlDataSetTemplate,
                {dataSet:dataSet},
                function(htmlForm) {
                    if(htmlForm==-1||htmlForm=={}){
                        $("#formData").empty();
                        $("#formData").append("Try Again/No DataSet Assigned");
                    }

                    $("#formData").empty();
                    $("#formData").append(htmlForm.dataEntryForm.htmlCode);
                    $("#formName").append(htmlForm.dataEntryForm.name);
                    $("input").prop('disabled', true);


                    var urlGetDataset="api/get_data.php";
                    var urlPostToDHIS="api/post_datavalues.php";

                    var totalConsumptionCombo=null;
                    var totalPhysicalStockCombo=null;
                    var quantityResupply_Combo=null;

                    //734 Category Combinations -used for aggregation
                    if(form=="734B"){
                        totalConsumptionCombo="RWCHIdXizft";
                        totalPhysicalStockCombo="OmTneOE9mMF";
                        quantityResupply_Combo="xPj1IPoxoHH";

                    }else{
                        //730B
                        totalConsumptionCombo="MQxdLLBfwIL";
                        totalPhysicalStockCombo="UIjvPBrmiNE";
                        quantityResupply_Combo="SxfihIxpyin";
                    }


                    $('#loading').html('loading..<img src="assets/img/ajax-loader.gif">');
                    setTimeout(function(){
                        $('#loading').html("");
                    }, 100000);
                    //Get the orgUnit details
                    getOrganisationUnitName(orgUnit);

                    //function to get the name of the orgUnit
                    function getOrganisationUnitName(orgUnit){
                        var jqxhr = $.getJSON(urlOrgUnit,{orgUnit:orgUnit});
                        jqxhr.done(function (response) {
                            var tableItem=$("#facility_detail");
                            var tablefacilityid=$("#facility_id");
                            var facility=response.name;
                            var facilityid=response.code;
                            var reportingPeriod=$('#reportingperiod');
                            tableItem.text(facility);
                            tablefacilityid.text(facilityid);
                            reportingPeriod.text(generateYearName(period));

                        });

                        jqxhr.error(function (jxqhr, status, errorThrown) {
                            $('div#returned_messages').html("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> CONNECTION ERROR</span>");
                            $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:brown;'>Ensure you are logged in to <a href = 'http://test.hiskenya.org' target='_blank'>DHIS2</a></span>");

                        });
                    }

                    //Load the Report+ aggregated the fields
                    $.getJSON
                    ( urlGetDataset,
                        {dataSet:dataSet,period:period,orgUnit:orgUnit},
                        function(response) {
                            var response_data=response;


                            if(response==-1){
                                $('#loading').html('<span>Error Loading Try Again</span>');
                            }

                            if ('dataValues' in response_data){

                                var dataValues = response_data.dataValues;
                            }
                            else{

                                $('#loading').html('<span>Loading Complete</span>');
                            }



                            var dataValuesLength=dataValues.length;
                            //data to post to dhis2
                            var post_data=response_data;
                            post_data.dataValues=[];
                            var dataElementsUpdated=[];

                            var post_obj=null;
                            $.each(dataValues, function (index, dataObj) {

                                var dataElementId = dataObj.dataElement;
                                var optionComboId = dataObj.categoryOptionCombo;
                                dataObj.val= dataObj.value;
                                dataObj.id = "#" + dataElementId + "-" + optionComboId + "-val"
                                var tableItem=$(dataObj.id);
                                tableItem.val(dataObj.val);
                                //tableItem.text(dataObj.val);

                                //Get an array of Objects with the same dataElement
                                var result = $.grep(dataValues, function(e){ return e.dataElement ==dataElementId ; });

                                if (result.length == 0) {
                                    // not found
                                } else if (result.length == 1) {
                                    // one object
                                } else {

                                    var columnC=$.grep(result, function(e){ return e.categoryOptionCombo ==totalConsumptionCombo;});
                                    var columnG=$.grep(result, function(e){ return e.categoryOptionCombo ==totalPhysicalStockCombo;});
                                    var quanityResupplyElement=quantityResupply_Combo;

                                    var elementId="#"+dataElementId+"-"+quanityResupplyElement+"-val";

                                    //Calculating quantity required for resupply
                                    if(columnC.length>0 && columnG.length>0 )
                                    {
                                        var valueC=0;
                                        var valueG=0;
                                        var valueResupply=0;

                                        if ('value' in columnC[0]){
                                            valueC=parseInt(columnC[0].value);
                                            valueC=valueC*multiplier;
                                        }

                                        if ('value' in columnG[0]){
                                            valueG=parseInt(columnG[0].value);
                                        }
                                        valueResupply=valueC-valueG;
                                        //check if the quantity required for resupply is less than zero
                                        if(valueResupply<0){
                                            valueResupply=0;
                                        }

                                        var tableItem=$(elementId);
                                        //tableItem.text(valueResupply);
                                        tableItem.val(valueResupply);

                                        //post data
                                        if ($.inArray(dataElementId,dataElementsUpdated)==-1){

                                            var post_obj= { "dataElement": dataElementId, "categoryOptionCombo": quanityResupplyElement, "value": valueResupply.toString()};
                                            post_data.dataValues.push(post_obj);

                                            dataElementsUpdated.push(dataElementId);
                                        }

                                        if(dataElementsUpdated.length>50)
                                        {
                                            $('#loading').html('<span>loading complete</span>');
                                        }

                                    }

                                }

                                if(dataValues.length-1<=index){
                                    $('#loading').html('<span>Loading Complete</span>');
                                }
                            });

                            $("input#dhis_username").prop('disabled', false);
                            $("input#dhis_password").prop('disabled', false);
                            //Method to post data values back to DHIS2
                            $(".post-data").click(function(){
                                // Get DHIS user credentials
                                var dhisUser = document.getElementById("dhis_username").value;
                                var dhisPassword = document.getElementById("dhis_password").value;

                                if(dhisUser == "")
                                {
                                    var message = "<div style ='color:white;margin-left:40px;background-color:brown;padding:5px;border-radius:3px;width:80%'>"+
                                                        "<span style ='margin-left:70px'>"+
                                                            "<span class = 'fa fa-ok' style = 'color:white;'> Please enter your DHIS username</span>"+
                                                        "</span>"+
                                                    "</div>";
                                    $("#dhis_credentials_header").html(message);
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("#dhis_credentials_header").empty();
                                            $("#dhis_credentials_header").html("Enter your DHIS2 Credentials");
                                        },
                                        1500
                                    );

                                }
                                else if (dhisPassword == "")
                                {
                                    var message = "<div style ='color:white;margin-left:40px;background-color:brown;padding:5px;border-radius:3px;width:80%'>"+
                                                        "<span style ='margin-left:70px'>"+
                                                            "<span class = 'fa fa-ok' style = 'color:white;'> Please enter your DHIS password</span>"+
                                                        "</span>"+
                                                    "</div>";
                                    $("#dhis_credentials_header").html(message);
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("#dhis_credentials_header").empty();
                                            $("#dhis_credentials_header").html("Enter your DHIS2 Credentials");
                                        },
                                        1500
                                    );

                                }
                                else
                                {
                                    //Hide the modal 
                                    $("#dhis_credentials").modal('hide');

                                    $('#post-log').html('Posting <img src="assets/img/ajax-loader.gif">');
                                    $.post(urlPostToDHIS, {"post":post_data,"dhis_user":dhisUser,"dhis_password":dhisPassword},
                                        function(data, status){
                                            $('#post-log').html("");

                                            if(data==1){
                                                alert("Wrong DHIS2 Credentials.\n");
                                            }

                                            if(data==-1){
                                                alert("Posting was Unsuccessful.\nTry Posting Again");
                                            }

                                            if(data==0){
                                                alert("Data Posted Successfully");
                                            }
                                        });
                                }

                            });

                        });


                }).error(function (jxqhr, status, errorThrown) {
                    $("#formData").empty();
                    $("#formData").append("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> No Data Found</span>");
                });;

        });
}

// ReportTemplate730 -for generating Report for 730A
function reportTemplate730(templateUrl,satellites, period, orgUnit, dataSet)
{
    var urlDataSetTemplate="api/get_dataset_template.php";

    $.get(templateUrl).then
    (
        function(responseData)
        {
            $('div#facilities').empty();
            $('div#facilities').append(responseData);

            $("#formData").empty();
            $("#formData").append('<img src="assets/img/ajax-loader-2.gif">');

            $.getJSON
            ( urlDataSetTemplate,
                {dataSet:dataSet},
                function(htmlForm) {

                    if (htmlForm.toString() == "-1") {
                        $("#formData").empty();
                        $("#formData").append("Error-Try Loading Again");
                    }

                    $("#formData").empty();
                    $("#formData").append(htmlForm.dataEntryForm.htmlCode);
                    $("#formName").append(htmlForm.dataEntryForm.name);
                    $("input").prop('disabled', true);

                    //url for getting datavalues and org unit details
                    var urlAggregate="api/get_aggregate.php";
                    var urlGetDataset="api/get_data.php";
                    var urlPostToDHIS="api/post_datavalues.php";


                    //Category Combinations -730A
                    var aggregatedQuantityConsumed_Combo="w5mBD3FwKg3";
                    var aggregatedPhysicalStock_Combo= "YO3e43lWky0";
                    var PhysicalStock_Combo= "CrPXhlkjtxD";
                    var quantityResupply_Combo="CCQF8AMSN7B";
                    var categoryOptionCombos=[];

                    categoryOptionCombos.push(aggregatedQuantityConsumed_Combo);
                    categoryOptionCombos.push(aggregatedPhysicalStock_Combo);
                    categoryOptionCombos.push(quantityResupply_Combo);

                    var multiplier=3;
                    var prefix="MOH 730B";
                    var prefix_replace="MOH 730A";

                    //730B
                    var totalConsumptionCombo="MQxdLLBfwIL";
                    var totalPhysicalStockCombo="UIjvPBrmiNE";


                    $('#loading').html('loading..<img src="assets/img/ajax-loader.gif">');
                    setTimeout(function(){
                        $('#loading').html("");
                    }, 60000);

                    //Getting and Setting the facility Name
                    getOrganisationUnitName(orgUnit);

                    $.getJSON
                    ( urlGetDataset,
                        {dataSet:dataSet,period:period,orgUnit:orgUnit},
                        function(response) {

                            var response_data=response;

                            if(response==-1){
                                $('#loading').html('<span>Error Loading Try Again</span>');
                            }

                            if ('dataValues' in response_data){

                                var dataValues = response_data.dataValues;
                            }
                            else{

                                $('#loading').html('<span>Loading Complete</span>');
                            }

                            //data to post to dhis2
                            var post_data=response_data;
                            post_data.dataValues=[];
                            var dataElementsUpdated=[];
                            var dataElementsLoaded=[];


                            $.each(dataValues, function (index, dataObj) {
                                var dataElementId = dataObj.dataElement;
                                var optionComboId = dataObj.categoryOptionCombo;
                                dataObj.val= dataObj.value;
                                dataObj.id = "#" + dataElementId + "-" + optionComboId + "-val";

                                if ($.inArray(dataObj.categoryOptionCombo,categoryOptionCombos)!=-1){

                                    var categoryCombination = dataObj.categoryOptionCombo;
                                    //physical stock
                                    if (dataObj.categoryOptionCombo == aggregatedPhysicalStock_Combo) {

                                        categoryCombination =totalPhysicalStockCombo ;
                                    }

                                    //Quantity consumed
                                    if (dataObj.categoryOptionCombo == aggregatedQuantityConsumed_Combo) {

                                        categoryCombination = totalConsumptionCombo;
                                    }

                                    var dataSatellites = {orgUnits:satellites,de:dataObj.dataElement,pe:dataObj.period,co:categoryCombination,prefix:prefix,
                                        prefix_replace:prefix_replace};

                                    //Loaded DataElements
                                    dataElementsLoaded.push(dataElementId);

                                    $.getJSON(urlAggregate,dataSatellites,function (data){

                                        dataObj.value = data;
                                        var tableItem = $(dataObj.id);
                                        //tableItem.text(dataObj.value);
                                        tableItem.val(dataObj.value);

                                        //Get an array of Objects with the same dataElement
                                        var result = $.grep(dataValues, function(e){ return e.dataElement ==dataElementId; });

                                        if (result.length > 1) {

                                            var columnH=$.grep(result, function(e){ return e.categoryOptionCombo ==aggregatedQuantityConsumed_Combo;});
                                            var columnG=$.grep(result, function(e){ return e.categoryOptionCombo ==PhysicalStock_Combo;});
                                            var aggregatePhysicalStock=$.grep(result, function(e){ return e.categoryOptionCombo ==aggregatedPhysicalStock_Combo;});

                                            var elementId="#"+dataElementId+"-"+quantityResupply_Combo+"-val";

                                            //Calculating quantity required for resupply
                                            if(columnH.length>0 && columnG.length>0 )
                                            {
                                                var valueH=0;
                                                var valueG=0;
                                                var valueResupply=0;

                                                if ('value' in columnH[0]){
                                                    valueH=parseInt(columnH[0].value);
                                                    valueH=valueH*multiplier;
                                                }

                                                if ('value' in columnG[0]){
                                                    valueG=parseInt(columnG[0].value);
                                                }
                                                valueResupply=valueH-valueG;
                                                //Quantity to resupply Calculated is less than zero, intialize to zero
                                                if(valueResupply<0){
                                                    valueResupply=0;
                                                }

                                                //Appending Calculated Quantity Required for resupply
                                                var tableItem=$(elementId);
                                                tableItem.text(valueResupply);
                                                tableItem.val(valueResupply);

                                            }
                                        }

                                        //to show status message it has completed loading data
                                        if ($.inArray(dataElementId,dataElementsUpdated)==-1){
                                            dataElementsUpdated.push(dataElementId);
                                        }

                                        if(dataElementsUpdated.length>=dataElementsLoaded.length){

                                            $('#loading').html('<span>Loading Complete</span>');
                                        }


                                        //Appending data to post to DHIS
                                        if(dataObj.categoryOptionCombo==aggregatedQuantityConsumed_Combo)
                                        {
                                            var post_obj_Consumed= { "dataElement": dataObj.dataElement, "categoryOptionCombo": dataObj.categoryOptionCombo, "value": dataObj.value.toString()};
                                            post_data.dataValues.push(post_obj_Consumed);
                                        }

                                        if(dataObj.categoryOptionCombo==aggregatedPhysicalStock_Combo)
                                        {
                                            var post_obj_PhysicalStock= { "dataElement": dataObj.dataElement, "categoryOptionCombo": dataObj.categoryOptionCombo, "value": dataObj.value.toString()};
                                            post_data.dataValues.push(post_obj_PhysicalStock);

                                        }


                                    });
                                }
                                else {

                                    dataObj.val = parseInt(dataObj.val);
                                    var tableItem=$(dataObj.id);
                                    tableItem.val(dataObj.val);
                                }
                            });

                            $("input#dhis_username").prop('disabled', false);
                            $("input#dhis_password").prop('disabled', false);
                            //Method to post data values back to DHIS2
                            $(".post-data").click(function(){
                                // Get DHIS user credentials
                                var dhisUser = document.getElementById("dhis_username").value;
                                var dhisPassword = document.getElementById("dhis_password").value;
                                if(dhisUser == "")
                                {
                                    var message = "<div style ='color:white;margin-left:40px;background-color:brown;padding:5px;border-radius:3px;width:80%'>"+
                                                        "<span style ='margin-left:70px'>"+
                                                            "<span class = 'fa fa-ok' style = 'color:white;'> Please enter your DHIS username</span>"+
                                                        "</span>"+
                                                    "</div>";
                                    $("#dhis_credentials_header").html(message);
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("#dhis_credentials_header").empty();
                                            $("#dhis_credentials_header").html("Enter your DHIS2 Credentials");
                                        },
                                        1500
                                    );

                                }
                                else if (dhisPassword == "")
                                {
                                    var message = "<div style ='color:white;margin-left:40px;background-color:brown;padding:5px;border-radius:3px;width:80%'>"+
                                                        "<span style ='margin-left:70px'>"+
                                                            "<span class = 'fa fa-ok' style = 'color:white;'> Please enter your DHIS password</span>"+
                                                        "</span>"+
                                                    "</div>";
                                    $("#dhis_credentials_header").html(message);
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("#dhis_credentials_header").empty();
                                            $("#dhis_credentials_header").html("Enter your DHIS2 Credentials");
                                        },
                                        1500
                                    );

                                }
                                else
                                {
                                    //Hide the modal 
                                    $("#dhis_credentials").modal('hide');

                                    $('#post-log').html('Posting <img src="assets/img/ajax-loader.gif">');
                                    $.post(urlPostToDHIS, {"post":post_data,"dhis_user":dhisUser,"dhis_password":dhisPassword},
                                        function(data, status){
                                            $('#post-log').html("");

                                            if(data==1){
                                                alert("Wrong DHIS2 Credentials.\n");
                                            }

                                            if(data==-1){
                                                alert("Posting was Unsuccessful.\nTry Posting Again");
                                            }

                                            if(data==0){
                                                alert("Data Posted Successfully");
                                            }
                                        });
                                }

                            });



                        });


                }).error(function (jxqhr, status, errorThrown) {

                    $("#formData").empty();
                    $("#formData").append("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> No Data Found</span>");

                });


            //function to get the name of the orgUnit
            function getOrganisationUnitName(orgUnit){
                var jqxhr = $.getJSON(urlOrgUnit,{orgUnit:orgUnit});
                jqxhr.done(function (response) {
                    var tableItem=$("#facility_detail");
                    var tablefacilityid=$("#facility_id");
                    var facility=response.name;
                    var facilityid=response.code;
                    var reportingPeriod=$('#reportingperiod');
                    tableItem.text(facility);
                    tablefacilityid.text(facilityid);
                    reportingPeriod.text(generateYearName(period));

                });

                jqxhr.error(function (jxqhr, status, errorThrown) {
                    $('div#returned_messages').html("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> CONNECTION ERROR</span>");
                    $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:brown;'>Ensure you are logged in to <a href = 'http://test.hiskenya.org' target='_blank'>DHIS2</a></span>");

                });
            }
        });
}



// ReportTemplate -for generating Report for 729A
function reportTemplate729(templateUrl,satellites, period, orgUnit, dataSet)
{
    var urlDataSetTemplate="api/get_dataset_template.php";
    $.get(templateUrl).then
    (
        function(responseData)
        {
            $('div#facilities').empty();
            $('div#facilities').append(responseData);

            $("#formData").empty();
            $("#formData").append('<img src="assets/img/ajax-loader-2.gif">');

            $.getJSON
            ( urlDataSetTemplate,
                {dataSet:dataSet},
                function(htmlForm) {
                    if (htmlForm.toString() == "-1") {
                        $("#formData").empty();
                        $("#formData").append("Try Again");
                    }

                    $("#formData").empty();
                    $("#formData").append(htmlForm.dataEntryForm.htmlCode);
                    $("#formName").append(htmlForm.dataEntryForm.name);
                    $("input").prop('disabled', true);

                    //url for getting datavalues and org unit details
                    var urlAggregate="api/get_aggregate.php";
                    var urlGetDataset="api/get_data.php";
                    var urlPostToDHIS="api/post_datavalues.php";

                    var prefix="MOH 729B";
                    var prefix_replace="MOH 729A";
                    var categoryCombination="DYZDW0RYLKs";


                    $('#loading').html('loading..<img src="assets/img/ajax-loader.gif">');
                    setTimeout(function(){
                        $('#loading').html("");
                    }, 60000);

                    //Getting and Setting the facility Name
                    getOrganisationUnitName(orgUnit);

                    $.getJSON
                    ( urlGetDataset,
                        {dataSet:dataSet,period:period,orgUnit:orgUnit},
                        function(response) {

                            var response_data=response;

                            if(response==-1){
                                $('#loading').html('<span>Error Loading Try Again</span>');
                            }

                            if ('dataValues' in response_data){

                                var dataValues = response_data.dataValues;
                            }
                            else{

                                $('#loading').html('<span>Loading Complete</span>');
                            }

                            //data to post to dhis2
                            var post_data=response_data;
                            post_data.dataValues=[];
                            var dataElementsUpdated=[];
                            var dataElementsLoaded=[];

                            $.each(dataValues, function (index, dataObj) {

                                var dataElementId = dataObj.dataElement;
                                var optionComboId = dataObj.categoryOptionCombo;
                                dataObj.val= dataObj.value;
                                dataObj.id = "#" + dataElementId + "-" + optionComboId + "-val";

                                var dataSatellites = {orgUnits:satellites,de:dataObj.dataElement,pe:dataObj.period,co:categoryCombination,prefix:prefix,
                                    prefix_replace:prefix_replace};


                                $.getJSON(urlAggregate,dataSatellites,function (data){

                                    dataObj.value = data;
                                    var tableItem = $(dataObj.id);
                                    //tableItem.text(dataObj.value);
                                    tableItem.val(dataObj.value);

                                    dataElementsUpdated.push(dataElementId);
                                    var post_obj= { "dataElement": dataElementId, "categoryOptionCombo": optionComboId, "value":dataObj.value.toString()};
                                    post_data.dataValues.push(post_obj);

                                    if(dataElementsUpdated.length>=(dataValues.length)-1){

                                        $('#loading').html('<span>Loading Complete</span>');
                                    }

                                });
                            });

                            
                            $("input#dhis_username").prop('disabled', false);
                            $("input#dhis_password").prop('disabled', false);
                            //Method to post data values back to DHIS2
                            $(".post-data").click(function(){
                                // Get DHIS user credentials
                                var dhisUser = document.getElementById("dhis_username").value;
                                var dhisPassword = document.getElementById("dhis_password").value;
                                if(dhisUser == "")
                                {
                                    var message = "<div style ='color:white;margin-left:40px;background-color:brown;padding:5px;border-radius:3px;width:80%'>"+
                                                        "<span style ='margin-left:70px'>"+
                                                            "<span class = 'fa fa-ok' style = 'color:white;'> Please enter your DHIS username</span>"+
                                                        "</span>"+
                                                    "</div>";
                                    $("#dhis_credentials_header").html(message);
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("#dhis_credentials_header").empty();
                                            $("#dhis_credentials_header").html("Enter your DHIS2 Credentials");
                                        },
                                        1500
                                    );

                                }
                                else if (dhisPassword == "")
                                {
                                    var message = "<div style ='color:white;margin-left:40px;background-color:brown;padding:5px;border-radius:3px;width:80%'>"+
                                                        "<span style ='margin-left:70px'>"+
                                                            "<span class = 'fa fa-ok' style = 'color:white;'> Please enter your DHIS password</span>"+
                                                        "</span>"+
                                                    "</div>";
                                    $("#dhis_credentials_header").html(message);
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("#dhis_credentials_header").empty();
                                            $("#dhis_credentials_header").html("Enter your DHIS2 Credentials");
                                        },
                                        1500
                                    );

                                }
                                else
                                {
                                    //Hide the modal 
                                    $("#dhis_credentials").modal('hide');

                                    $('#post-log').html('Posting <img src="assets/img/ajax-loader.gif">');
                                    $.post(urlPostToDHIS, {"post":post_data,"dhis_user":dhisUser,"dhis_password":dhisPassword},
                                        function(data, status){
                                            $('#post-log').html("");

                                            if(data==1){
                                                alert("Wrong DHIS2 Credentials.\n");
                                            }

                                            if(data==-1){
                                                alert("Posting was Unsuccessful.\nTry Posting Again");
                                            }

                                            if(data==0){
                                                alert("Data Posted Successfully");
                                            }
                                        });
                                }

                            });
                        });

                }).error(function (jxqhr, status, errorThrown) {
                    $("#formData").empty();
                    $("#formData").append("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> No Data Found</span>");
                });

            //function to get the name of the orgUnit
            function getOrganisationUnitName(orgUnit){
                var jqxhr = $.getJSON(urlOrgUnit,{orgUnit:orgUnit});
                jqxhr.done(function (response) {
                    var tableItem=$("#facility_detail");
                    var tablefacilityid=$("#facility_id");
                    var facility=response.name;
                    var facilityid=response.code;
                    var reportingPeriod=$('#reportingperiod');
                    tableItem.text(facility);
                    tablefacilityid.text(facilityid);
                    reportingPeriod.text(generateYearName(period));

                });

                jqxhr.error(function (jxqhr, status, errorThrown) {
                    $('div#returned_messages').html("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> CONNECTION ERROR</span>");
                    $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:brown;'>Ensure you are logged in to <a href = 'http://test.hiskenya.org' target='_blank'>DHIS2</a></span>");

                });
            }
        }
    );
}


//ReportTemplate -for generating Report for 734A
function reportTemplate734(templateUrl,satellites, period, orgUnit, dataSet)
{
    var urlDataSetTemplate="api/get_dataset_template.php";

    $.get(templateUrl).then
    (
        function(responseData)
        {
            $('div#facilities').empty();
            $('div#facilities').append(responseData);

            $("#formData").empty();
            $("#formData").append('<img src="assets/img/ajax-loader-2.gif">');

            $.getJSON
            ( urlDataSetTemplate,
                {dataSet:dataSet},
                function(htmlForm) {
                    if (htmlForm.toString() == "-1") {
                        $("#formData").empty();
                        $("#formData").append("Try Again");
                    }
                    $("#formData").empty();
                    $("#formData").append(htmlForm.dataEntryForm.htmlCode);
                    $("#formName").append(htmlForm.dataEntryForm.name);
                    $("input").prop('disabled', true);

                    //url for getting datavalues and org unit details
                    var urlAggregate="api/get_aggregate.php";
                    var urlGetDataset="api/get_data.php";
                    var urlPostToDHIS="api/post_datavalues.php";

                    //Category Combinations -730A
                    var aggregatedQuantityConsumed_Combo="x14wq0sboVv";
                    var aggregatedPhysicalStock_Combo= "uWnMa5aRgda";
                    var PhysicalStock_Combo= "AmqP2wmFOz7";
                    var quantityResupply_Combo="lkr4fyQv3w5";
                    var categoryOptionCombos=[];

                    categoryOptionCombos.push(aggregatedQuantityConsumed_Combo);
                    categoryOptionCombos.push(aggregatedPhysicalStock_Combo);
                    categoryOptionCombos.push(quantityResupply_Combo);

                    var multiplier=3;
                    var prefix="";
                    var prefix_replace="MOH 734A ";

                    //730B
                    var totalConsumptionCombo="RWCHIdXizft";
                    var totalPhysicalStockCombo="OmTneOE9mMF";


                    $('#loading').html('loading..<img src="assets/img/ajax-loader.gif">');
                    setTimeout(function(){
                        $('#loading').html("");
                    }, 60000);

                    //Getting and Setting the facility Name
                    getOrganisationUnitName(orgUnit);

                    $.getJSON
                    ( urlGetDataset,
                        {dataSet:dataSet,period:period,orgUnit:orgUnit},
                        function(response) {

                            var response_data=response;

                            if(response==-1){
                                $('#loading').html('<span>Error Loading Try Again</span>');
                            }

                            if ('dataValues' in response_data){

                                var dataValues = response_data.dataValues;
                            }
                            else{

                                $('#loading').html('<span>Loading Complete</span>');
                            }


                            //data to post to dhis2
                            var post_data=response_data;
                            post_data.dataValues=[];
                            var dataElementsUpdated=[];
                            var dataElementsLoaded=[];

                            $.each(dataValues, function (index, dataObj) {
                                var dataElementId = dataObj.dataElement;
                                var optionComboId = dataObj.categoryOptionCombo;
                                dataObj.val= dataObj.value;
                                dataObj.id = "#" + dataElementId + "-" + optionComboId + "-val";
                                if ($.inArray(dataObj.categoryOptionCombo,categoryOptionCombos)!=-1){

                                    var categoryCombination = dataObj.categoryOptionCombo;
                                    //physical stock
                                    if (dataObj.categoryOptionCombo == aggregatedPhysicalStock_Combo) {

                                        categoryCombination =totalPhysicalStockCombo ;
                                    }

                                    //Quantity consumed
                                    if (dataObj.categoryOptionCombo == aggregatedQuantityConsumed_Combo) {

                                        categoryCombination = totalConsumptionCombo;
                                    }

                                    var dataSatelites = {orgUnits:satellites,de:dataObj.dataElement,pe:dataObj.period,co:categoryCombination,prefix:prefix,
                                        prefix_replace:prefix_replace};

                                    dataElementsLoaded.push(dataElementId);

                                    $.getJSON(urlAggregate,dataSatelites,function (data){

                                        dataObj.value = data;
                                        var tableItem = $(dataObj.id);
                                        //tableItem.text(dataObj.value);
                                        tableItem.val(dataObj.value);

                                        //Get an array of Objects with the same dataElement
                                        var result = $.grep(dataValues, function(e){ return e.dataElement ==dataElementId; });

                                        if (result.length == 0) {
                                            // not found
                                        }else if (result.length == 1) {
                                            // one object
                                        } else {

                                            var columnH=$.grep(result, function(e){ return e.categoryOptionCombo ==aggregatedQuantityConsumed_Combo;});
                                            var columnG=$.grep(result, function(e){ return e.categoryOptionCombo ==PhysicalStock_Combo;});
                                            var aggregatePhysicalStock=$.grep(result, function(e){ return e.categoryOptionCombo ==aggregatedPhysicalStock_Combo;});

                                            var elementId="#"+dataElementId+"-"+quantityResupply_Combo+"-val";

                                            //Calculating quantity required for resupply
                                            if(columnH.length>0 && columnG.length>0 )
                                            {
                                                var valueH=0;
                                                var valueG=0;
                                                var valueResupply=0;

                                                if ('value' in columnH[0]){
                                                    valueH=parseInt(columnH[0].value);
                                                    valueH=valueH*multiplier;
                                                }

                                                if ('value' in columnG[0]){
                                                    valueG=parseInt(columnG[0].value);
                                                }
                                                valueResupply=valueH-valueG;

                                                //Quantity to resupply Calculated is less than zero, intialize to zero
                                                if(valueResupply<0){
                                                    valueResupply=0;
                                                }

                                                var tableItem=$(elementId);
                                                tableItem.val(valueResupply);

                                            }
                                        }

                                        //to show status message when data loading is complete
                                        if ($.inArray(dataElementId,dataElementsUpdated)==-1){

                                            dataElementsUpdated.push(dataElementId);
                                        }

                                        if(dataElementsUpdated.length>=dataElementsLoaded.length){

                                            $('#loading').html('<span>Loading Complete</span>');
                                        }

                                        //Appending data to post to DHIS
                                        if(dataObj.categoryOptionCombo==aggregatedQuantityConsumed_Combo)
                                        {
                                            var post_obj_Consumed= { "dataElement": dataObj.dataElement, "categoryOptionCombo": dataObj.categoryOptionCombo, "value": dataObj.value.toString()};
                                            post_data.dataValues.push(post_obj_Consumed);
                                        }

                                        if(dataObj.categoryOptionCombo==aggregatedPhysicalStock_Combo)
                                        {
                                            var post_obj_PhysicalStock= { "dataElement": dataObj.dataElement, "categoryOptionCombo": dataObj.categoryOptionCombo, "value": dataObj.value.toString()};
                                            post_data.dataValues.push(post_obj_PhysicalStock);

                                        }
                                    });
                                }
                                else {
                                    dataObj.val = parseInt(dataObj.val);
                                    var tableItem=$(dataObj.id);
                                    //tableItem.text(dataObj.val);
                                    tableItem.val(dataObj.val);
                                }

                            });

                            $("input#dhis_username").prop('disabled', false);
                            $("input#dhis_password").prop('disabled', false);
                            //Method to post data values back to DHIS2
                            $(".post-data").click(function(){
                                // Get DHIS user credentials
                                var dhisUser = document.getElementById("dhis_username").value;
                                var dhisPassword = document.getElementById("dhis_password").value;
                                if(dhisUser == "")
                                {
                                    var message = "<div style ='color:white;margin-left:40px;background-color:brown;padding:5px;border-radius:3px;width:80%'>"+
                                                        "<span style ='margin-left:70px'>"+
                                                            "<span class = 'fa fa-ok' style = 'color:white;'> Please enter your DHIS username</span>"+
                                                        "</span>"+
                                                    "</div>";
                                    $("#dhis_credentials_header").html(message);
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("#dhis_credentials_header").empty();
                                            $("#dhis_credentials_header").html("Enter your DHIS2 Credentials");
                                        },
                                        1500
                                    );

                                }
                                else if (dhisPassword == "")
                                {
                                    var message = "<div style ='color:white;margin-left:40px;background-color:brown;padding:5px;border-radius:3px;width:80%'>"+
                                                        "<span style ='margin-left:70px'>"+
                                                            "<span class = 'fa fa-ok' style = 'color:white;'> Please enter your DHIS password</span>"+
                                                        "</span>"+
                                                    "</div>";
                                    $("#dhis_credentials_header").html(message);
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("#dhis_credentials_header").empty();
                                            $("#dhis_credentials_header").html("Enter your DHIS2 Credentials");
                                        },
                                        1500
                                    );

                                }
                                else
                                {
                                    //Hide the modal 
                                    $("#dhis_credentials").modal('hide');

                                    $('#post-log').html('Posting <img src="assets/img/ajax-loader.gif">');
                                    $.post(urlPostToDHIS, {"post":post_data,"dhis_user":dhisUser,"dhis_password":dhisPassword},
                                        function(data, status){
                                            $('#post-log').html("");
                                            if(data==1){
                                                alert("Wrong DHIS2 Credentials.\n");
                                            }

                                            if(data==-1){
                                                alert("Posting was Unsuccessful.\nTry Posting Again");
                                            }

                                            if(data==0){
                                                alert("Data Posted Successfully");
                                            }
                                        });
                                }

                            });

                        });
                }).error(function (jxqhr, status, errorThrown) {
                    $("#formData").empty();
                    $("#formData").append("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> No Data Found</span>");
                });


            //function to get the name of the orgUnit
            function getOrganisationUnitName(orgUnit){
                var jqxhr = $.getJSON(urlOrgUnit,{orgUnit:orgUnit});
                jqxhr.done(function (response) {
                    var tableItem=$("#facility_detail");
                    var tablefacilityid=$("#facility_id");
                    var facility=response.name;
                    var facilityid=response.code;
                    var reportingPeriod=$('#reportingperiod');
                    tableItem.text(facility);
                    tablefacilityid.text(facilityid);
                    reportingPeriod.text(generateYearName(period));

                });

                jqxhr.error(function (jxqhr, status, errorThrown) {
                    $('div#returned_messages').html("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> CONNECTION ERROR</span>");
                    $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:brown;'>Ensure you are logged in to <a href = 'http://test.hiskenya.org' target='_blank'>DHIS2</a></span>");

                });
            }
        }
    );
}


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

