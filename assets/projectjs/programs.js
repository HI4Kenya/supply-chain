// Function createPrograms()
function createPrograms()
{
    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> PROGRAMS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Create a new program below</span></span>");

    var data = "<div class='panel-heading' style = 'height:auto;width:80%;margin-right:10px;margin-bottom:5px;background-color:#d0eBd0;border:1px solid #a4d2a3;'>"+
                    "<div class='form-inline'>"+
                      "<div class='form-group' style = 'margin-bottom:10px;'>"+
                        "<label class='sr-only' for='exampleInputEmail3'>Program Name</label>"+
                        "<span style = 'color:blue;padding:5px'>Program Name<span style = 'color:red;margin-left:10px'>*</span></span>"+
                        "<div id = 'program_name_status' style = 'margin-left:5px'></div>"+
                        "<input id = 'program_name' class='form-control' placeholder='Program Name'>"+
                      "</div>"+
                      "<br>"+

                      "<span style = 'color:blue;padding:5px'>Program Datasets<span style = 'color:red;margin-left:10px'>*</span></span>"+
                      "<div style = 'margin-top:10px'>"+
                          // Available Header
                            "<div class='panel-heading' style = 'height:6%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initDatasets();'>"+
                                "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='createPrograms();'>Reset</button>"+
                                "<span style = 'margin-left:30px'>Available Datasets</span>"+
                                "<span class = 'glyphicon glyphicon-forward pull-right' style = 'color:#2A6496;margin-top:3px' ONCLICK='addIt(\"available_program_datasets\",\"selected_program_datasets\");'></span>"+
                                "<span class = 'glyphicon glyphicon-chevron-right pull-right' style = 'margin-right:10px;color:#2A6496;margin-top:3px' ONCLICK='addIt(\"available_program_datasets\",\"selected_program_datasets\");'></span>"+
                            "</div>"+
                           // Selected header
                           "<div class='panel-heading' style = 'height:6%;width:40%;margin-bottom:5px'>"+                           
                                "<span class = 'glyphicon glyphicon-backward pull-left' style = 'color:#2A6496;margin-top:3px' ONCLICK='delIt(\"available_program_datasets\",\"selected_program_datasets\");'></span>"+
                                "<span class = 'glyphicon glyphicon-chevron-left pull-left' style = 'margin-left:10px;color:#2A6496;margin-top:3px' ONCLICK='delIt(\"available_program_datasets\",\"selected_program_datasets\");'></span>"+
                                "<span style = 'margin-left:20px'>Selected Datasets</span>"+               
                            "</div>"+

                            // All facilities area
                            "<div id = 'program_dataset_status' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                                //border:2px solid #2A6496
                                // Search for filtering purposes
                                "<input placeholder = 'Search' id = 'available_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"available_program_datasets\",\"available_filter_search\")'></input><br>"+
                                "<select NAME='available_program_datasets' id = 'available_program_datasets' SIZE='10' multiple='multiple' style = 'width:100%;min-height:150px'>"+
                                "</select>"+
                            "</div>"+
                            
                            // selected area
                            "<div id = 'selected_central_store' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                                "<div id = 'search_field'>"+
                                    "<input placeholder = 'Search' id= 'selected_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"selected_program_datasets\",\"selected_filter_search\")'></input>"+
                                "</div>"+
                                "<select NAME='selected_program_datasets' ID='selected_program_datasets' SIZE='10' multiple='multiple' style = 'width:100%;min-height:150px'>"+
                                "</select>"+
                            "</div>"+

                            "<div class = 'pull-left' style = 'position:absolute;margin-top:250px;margin-left:0px'>"+
                                "<input type = 'button' class='btn btn-success' style = 'margin-top:5px' ONCLICK='programOperations(\"add\");' value = 'Submit'></input>"+
                            "</div>"+
                            "</div>"+
                        "</div>"+  
                "</div>";
    // Append
    $('div#facilities').html(data);
    //Fetch Datasets from DHIS2

    var datasets_url = "db/fetch/get_datasets.php";
    $.getJSON
    ( 
        datasets_url,
        function(receivedValues) 
        {
            for(var datasetsNo = 0; datasetsNo<receivedValues.length; datasetsNo++)
            {
                $("<option id = '"+receivedValues[datasetsNo].dataset_id+"' value = '"+receivedValues[datasetsNo].dataset_id+"'>"
                +receivedValues[datasetsNo].dataset_name+"</option>").appendTo("select#available_program_datasets");   
            }
        }
    );
}
// END FUNCTION
/* --------------------------------------------------------------------------------------------------------------------------------*/
// Function getPrograms()
function getPrograms(display)
{
    if(display == "update")
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> LIST OF CREATED PROGRAMS</span>");

        var data =  "<div class='panel-body' style = 'margin-left:-30px;margin-top:-30px'>"+
                        "<table id= 'programdata' style = 'border-radius:5px'>"+
                        "<thead>"+
                            "<th style = 'font-weight:bold'>#</th>"+
                            "<th style = 'font-weight:bold'>Program</th>"+
                            "<th style = 'font-weight:bold;color:blue'># Sub-County Stores</th>"+
                            "<th style = 'font-weight:bold;color:blue'># Central Sites</th>"+
                            "<th style = 'font-weight:bold;color:brown'># Satellite Sites</th>"+
                            "<th style = 'font-weight:bold;color:green'># StandAlone Sites</th>"+
                            "<th style = 'font-weight:bold;color:purple'># Datasets</th>"+ 
                            "<th style = 'font-weight:bold;color:blue'>Edit</th>"+                                
                        "</thead>"+
                        "<tbody>"+
                        "</tbody>"+
                        "</table>"+
                    "</div>";
        // Append
        $('div#facilities').html(data);

        //Fetch Programs
        var programs_url = "db/fetch/get_programs.php";
        
        $.getJSON
        (
            programs_url,
            function(receivedPrograms)
            {
                for(var counting=0; counting<receivedPrograms.length;counting++)
                { 
                    var itemNumber = counting+1;

                    var dataToAppend = "<tr>"+
                                            "<td>"+itemNumber+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedPrograms[counting].program_name+"</td>"+
                                            "<td id = 'subcounty_stores_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td id = 'central_sites_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td id = 'satellite_sites_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td id = 'standalone_sites_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td id = 'datasets_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td class = 'fa fa-edit' style = 'color:blue;cursor: pointer;'"+
                                                "onclick='javascript:programOperations(\"update\","+receivedPrograms[counting].program_id+");'>"+
                                            "</td>"+
                                        "</tr>";
                    $(dataToAppend).appendTo("#programdata tbody");
                    
                    // Get program stats
                    var program_stats_url = "db/fetch/get_program_site_number.php";
                    $.getJSON
                    (
                        program_stats_url,
                        {program:receivedPrograms[counting].program_id},
                        function(programData)
                        {
                            $("#subcounty_stores_program_"+programData[5]).html("<span style ='color:blue'>"+programData[0]+"</span>");
                            $("#central_sites_program_"+programData[5]).html("<span style ='color:blue'>"+programData[1]+"</span>");
                            $("#satellite_sites_program_"+programData[5]).html("<span style ='color:brown'>"+programData[2]+"</span>");
                            $("#standalone_sites_program_"+programData[5]).html("<span style ='color:green'>"+programData[3]+"</span>");
                            $("#datasets_program_"+programData[5]).html("<span style ='color:purple'>"+programData[4]+"</span>");
                        }
                    );
                }  
            }
        );
        $(function()
        {
            //$("#programdata").dataTable();
        })

    }

    // For administration (delete)
    else if(display == "administration")
    {
        $('div#returned_messages').html("<span style = 'color:red;margin-left:30px'> DELETE EXISTING PROGRAMS</span>");

        var data =  "<div class='panel-body' style = 'margin-left:-30px;margin-top:-30px'>"+
                        "<table id= 'programdata' style = 'border-radius:5px'>"+
                        "<thead>"+
                            "<th style = 'font-weight:bold'>#</th>"+
                            "<th style = 'font-weight:bold'>Program</th>"+
                            "<th style = 'font-weight:bold;color:blue'># Sub-County Stores</th>"+
                            "<th style = 'font-weight:bold;color:blue'># Central Sites</th>"+
                            "<th style = 'font-weight:bold;color:brown'># Satellite Sites</th>"+
                            "<th style = 'font-weight:bold;color:green'># StandAlone Sites</th>"+
                            "<th style = 'font-weight:bold;color:purple'># Datasets</th>"+ 
                            "<th style = 'font-weight:bold;color:red'>Delete</th>"+                                
                        "</thead>"+
                        "<tbody>"+
                        "</tbody>"+
                        "</table>"+
                    "</div>";
        // Append
        $('div#facilities').html(data);

        //Fetch Programs
        var programs_url = "db/fetch/get_programs.php";
        
        $.getJSON
        (
            programs_url,
            function(receivedPrograms)
            {
                for(var counting=0; counting<receivedPrograms.length;counting++)
                { 
                    var itemNumber = counting+1;

                    var dataToAppend = "<tr>"+
                                            "<td>"+itemNumber+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedPrograms[counting].program_name+"</td>"+
                                            "<td id = 'subcounty_stores_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td id = 'central_sites_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td id = 'satellite_sites_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td id = 'standalone_sites_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td id = 'datasets_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td class = 'fa fa-trash' style = 'color:red;cursor: pointer;'"+
                                                "onclick='javascript:programOperations(\"delete\","+receivedPrograms[counting].program_id+");'>"+
                                            "</td>"+
                                        "</tr>";
                    $(dataToAppend).appendTo("#programdata tbody");
                    
                    // Get program stats
                    var program_stats_url = "db/fetch/get_program_site_number.php";
                    $.getJSON
                    (
                        program_stats_url,
                        {program:receivedPrograms[counting].program_id},
                        function(programData)
                        {
                            $("#subcounty_stores_program_"+programData[5]).html("<span style ='color:blue'>"+programData[0]+"</span>");
                            $("#central_sites_program_"+programData[5]).html("<span style ='color:blue'>"+programData[1]+"</span>");
                            $("#satellite_sites_program_"+programData[5]).html("<span style ='color:brown'>"+programData[2]+"</span>");
                            $("#standalone_sites_program_"+programData[5]).html("<span style ='color:green'>"+programData[3]+"</span>");
                            $("#datasets_program_"+programData[5]).html("<span style ='color:purple'>"+programData[4]+"</span>");
                        }
                    );
                }  
            }
        );
        $(function()
        {
            //$("#programdata").dataTable();
        })

    }

    // Display as a report
    else if(display == "report")
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> LIST OF CREATED PROGRAMS</span>");

        var data =  "<div class='panel-body' style = 'margin-left:-30px'>"+
                        "<table id= 'programdata' style = 'border-radius:5px'>"+
                        "<thead>"+
                            "<th style = 'font-weight:bold'>#</th>"+
                            "<th style = 'font-weight:bold'>Program</th>"+
                            "<th style = 'font-weight:bold;color:blue'># Sub-County Stores</th>"+
                            "<th style = 'font-weight:bold;color:blue'># Central Sites</th>"+
                            "<th style = 'font-weight:bold;color:brown'># Satellite Sites</th>"+
                            "<th style = 'font-weight:bold;color:green'># StandAlone Sites</th>"+
                            "<th style = 'font-weight:bold;color:purple'># Datasets</th>"+                               
                        "</thead>"+
                        "<tbody>"+
                        "</tbody>"+
                        "</table>"+
                    "</div>";
        // Append
        $('div#facilities').html(data);

        //Fetch Programs
        var programs_url = "db/fetch/get_programs.php";
        
        $.getJSON
        (
            programs_url,
            function(receivedPrograms)
            {
                for(var counting=0; counting<receivedPrograms.length;counting++)
                { 
                    var itemNumber = counting+1;

                    var dataToAppend = "<tr>"+
                                            "<td>"+itemNumber+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedPrograms[counting].program_name+"</td>"+
                                            "<td id = 'subcounty_stores_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td id = 'central_sites_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td id = 'satellite_sites_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td id = 'standalone_sites_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                            "<td id = 'datasets_program_"+receivedPrograms[counting].program_id+"'>"+
                                            "</td>"+
                                        "</tr>";
                    $(dataToAppend).appendTo("#programdata tbody");
                    
                    // Get program stats
                    var program_stats_url = "db/fetch/get_program_site_number.php";
                    $.getJSON
                    (
                        program_stats_url,
                        {program:receivedPrograms[counting].program_id},
                        function(programData)
                        {
                            $("#subcounty_stores_program_"+programData[5]).html("<span style ='color:blue'>"+programData[0]+"</span>");
                            $("#central_sites_program_"+programData[5]).html("<span style ='color:blue'>"+programData[1]+"</span>");
                            $("#satellite_sites_program_"+programData[5]).html("<span style ='color:brown'>"+programData[2]+"</span>");
                            $("#standalone_sites_program_"+programData[5]).html("<span style ='color:green'>"+programData[3]+"</span>");
                            $("#datasets_program_"+programData[5]).html("<span style ='color:purple'>"+programData[4]+"</span>");
                        }
                    );
                }  
            }
        );
        $(function()
        {
            //$("#programdata").dataTable();
        })

    }
}
// END FUNCTION
/*--------------------------------------------------------------------------------------------------------------------------------*/

// Function programOperations()
function programOperations(operation,programID)
{
    // add a new program
    if(operation == "add")
    {
        var program = document.getElementById("program_name");
        var programName = program.value;

        var pickList = document.getElementById("selected_program_datasets");
        var pickOptions = pickList.options;
        var pickOLength = pickOptions.length;


        if(programName == "")
        {
            $("div#program_name_status").html("<span style='color:red;font-size:8pt'>Please enter a program name</span>");
            setTimeout
            (
                function()
                {
                    $("div#program_name_status").empty();
                },
                2000
            );
        }
        else
        {
            if (pickOLength < 1) 
            {
                $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;font-size:8pt'>Please add dataset(s) from the Available list by selecting it and clicking the [>]</span>");
                return false;
                
            }
            else
            {
                $('div#search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");

                // Array to hold the program datasets
                var programDatasets = [];
                for (var i = 0; i < pickOLength; i++) 
                {
                    programDatasets.push(pickOptions[i].value);
                }

                // Insert program
                $.post
                (
                    'db/insertion/insert_programs.php',
                    {program_name:programName,program_datasetID:programDatasets},
                    function(statusMessage)
                    {
                        if(statusMessage == 0)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:green;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-check-square' style = 'color:white;'> Program has been saved</span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    $("div#returned_messages").empty();
                                    createPrograms();
                                },
                                1500
                            );
                        }

                        else if(statusMessage == 1)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:blue;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-ok' style = 'color:white;'> This program exists </span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    $("div#returned_messages").empty();
                                    createPrograms();
                                },
                                1500
                            );
                        }

                        else if(statusMessage == 10)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:green;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-ok' style = 'color:white;'> Program datasets updated</span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    $("div#returned_messages").empty();
                                    createPrograms();
                                },
                                1500
                            );
                        }

                        else if(statusMessage == -1)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:red;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-ok' style = 'color:white;'> Error. Program not inserted</span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    $("div#returned_messages").empty();
                                    createPrograms();
                                },
                                1500
                            );
                        }
                    }
                );
            }
        }
        
    }

    // Update existing programs
    else if (operation == "update")
    {
        var noteToAppend = "<span style = 'color:green;margin-left:30px'>EDIT PROGRAMS<br>"+
                                "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                "NOTE: Changes affect the classification"
                                "</span>"+
                            "</span>";
        $('div#returned_messages').html(noteToAppend);

        var data = "<div class='panel-heading' style = 'height:auto;width:80%;margin-right:10px;margin-bottom:5px;background-color:;border:1px solid #a4d2a3;'>"+
                        "<div class='form-inline'>"+
                          "<div class='form-group' style = 'margin-bottom:10px;'>"+
                            "<label class='sr-only' for='exampleInputEmail3'>Program Name</label>"+
                            "<span style = 'color:blue;padding:5px'>Program Name</span>"+
                            "<div id = 'program_name_status' style = 'margin-left:5px'></div>"+
                            "<input id = 'program_name' class='form-control' placeholder='Program Name'>"+
                          "</div>"+
                          "<br>"+

                          "<div style = 'margin-top:10px'>"+
                              // Available Header
                                "<div class='panel-heading' style = 'height:5%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initDatasets();'>"+
                                    "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='programOperations(\"update\","+programID+");'>Reset</button>"+
                                    "<span style = 'margin-left:30px'>Available Datasets</span>"+
                                    "<span class = 'glyphicon glyphicon-forward pull-right' style = 'color:#2A6496' ONCLICK='addIt(\"available_program_datasets\",\"selected_program_datasets\");'></span>"+
                                    "<span class = 'glyphicon glyphicon-chevron-right pull-right' style = 'margin-right:10px;color:#2A6496' ONCLICK='addIt(\"available_program_datasets\",\"selected_program_datasets\");'></span>"+
                                "</div>"+
                               // Selected header
                               "<div class='panel-heading' style = 'height:5%;width:40%;margin-bottom:5px'>"+                           
                                    "<span class = 'glyphicon glyphicon-backward pull-left' style = 'color:#2A6496' ONCLICK='delIt(\"available_program_datasets\",\"selected_program_datasets\");'></span>"+
                                    "<span class = 'glyphicon glyphicon-chevron-left pull-left' style = 'margin-left:10px;color:#2A6496' ONCLICK='delIt(\"available_program_datasets\",\"selected_program_datasets\");'></span>"+
                                    "<span style = 'margin-left:20px'>Existing Datasets</span>"+               
                                "</div>"+

                                // All facilities area
                                "<div id = 'program_dataset_status' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                                    //border:2px solid #2A6496
                                    // Search for filtering purposes
                                    "<input placeholder = 'Search' id = 'available_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"available_program_datasets\",\"available_filter_search\")'></input><br>"+
                                    "<select NAME='available_program_datasets' id = 'available_program_datasets' SIZE='10' multiple='multiple' style = 'width:100%;min-height:150px'>"+
                                    "</select>"+
                                "</div>"+
                                
                                // selected area
                                "<div id = 'selected_central_store' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                                    "<div id = 'search_field'>"+
                                        "<input placeholder = 'Search' id= 'selected_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"selected_program_datasets\",\"selected_filter_search\")'></input>"+
                                    "</div>"+
                                    "<select NAME='selected_program_datasets' ID='selected_program_datasets' SIZE='10' multiple='multiple' style = 'width:100%;min-height:150px'>"+
                                    "</select>"+
                                "</div>"+

                                "<div class = 'pull-left' style = 'position:absolute;margin-top:250px;margin-left:0px'>"+
                                    "<input type = 'button' class='btn btn-info' style = 'margin-top:5px' ONCLICK='programOperations(\"edit\","+programID+");' value = 'Submit'></input>"+
                                    "<input type = 'button' class='btn btn-danger' style = 'margin-top:5px;margin-left:10px' ONCLICK='getPrograms(\"update\");' value = 'Back'></input>"+
                                "</div>"+
                                "</div>"+
                            "</div>"+  
                    "</div>";
        // Append
        $('div#facilities').html(data);
                
        // Fetch Program Name
        var programUrl = "db/fetch/get_specific_program.php";
        $.getJSON
        ( 
            programUrl, 
            {program:programID},
            function(programName) 
            {
                var programInputField = "<input id = 'program_name' class='form-control' placeholder='"+programName[0].program_name+"' title = 'Rename the program here'>";
                $('input#program_name').replaceWith(programInputField);
            }
        );
        
        //Fetch All Datasets from DHIS2
        var datasets_url = "db/fetch/get_datasets.php";
        $.getJSON
        ( 
            datasets_url,
            function(receivedValues) 
            {
                for(var datasetsNo = 0; datasetsNo<receivedValues.length; datasetsNo++)
                {
                    $("<option id = 'available_datasets"+receivedValues[datasetsNo].dataset_id+"' value = '"+receivedValues[datasetsNo].dataset_id+"'>"
                    +receivedValues[datasetsNo].dataset_name+"</option>").appendTo("select#available_program_datasets");   
                }
            }
        );

        //Fetch program datasets
        var datasets_url = "db/fetch/get_program_datasets.php";
        $.getJSON
        ( 
            datasets_url,
            {program:programID},
            function(receivedValues) 
            {
                $('select#selected_program_datasets').empty();
                for(var datasetsNo = 0; datasetsNo<receivedValues.length; datasetsNo++)
                {
                    $("<option id = '"+receivedValues[datasetsNo].dataset_id+"' value = '"+receivedValues[datasetsNo].dataset_id+"'>"
                    +receivedValues[datasetsNo].dataset_name+"</option>").appendTo("select#selected_program_datasets");
                    
                    $("#available_datasets"+receivedValues[datasetsNo].dataset_id).remove();
                }
            }
        );
    }

    // Edit operation
    else if (operation == "edit")
    {
        var program = document.getElementById("program_name");
        var programName = program.value;

        var pickList = document.getElementById("selected_program_datasets");
        var pickOptions = pickList.options;
        var pickOLength = pickOptions.length;

        if (pickOLength < 1) 
        {
            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;font-size:8pt'>Please add dataset(s) from the Available list by selecting it and clicking the [>]</span>");
            return false;
            
        }
        else
        {
            $('div#search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");

            // Array to hold the program datasets
            var programDatasets = [];
            for (var i = 0; i < pickOLength; i++) 
            {
                programDatasets.push(pickOptions[i].value);
            }

            // Edit the program
            $.post
            (
                'db/update/update_programs.php',
                {program_id:programID,program_name:programName,program_datasetID:programDatasets},
                function(statusMessage)
                {
                    /*
                        NOTES: MESSAGE CODES
                               -1 - Error
                                0 - Program Name and Datasets Updated
                                1 - Program Name Updated
                               10 - Program datasets updated
                        */
                    if(statusMessage == -1)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "An error occured"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                var noteToAppend = "<span style = 'color:green;margin-left:30px'>EDIT PROGRAMS<br>"+
                                                        "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                                        "NOTE: Changes affect the classification"
                                                        "</span>"+
                                                    "</span>";
                                $('div#returned_messages').html(noteToAppend);
                                programOperations("update",programID);
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 0)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Program Name and Datasets Updated"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                var noteToAppend = "<span style = 'color:green;margin-left:30px'>EDIT PROGRAMS<br>"+
                                                        "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                                        "NOTE: Changes affect the classification"
                                                        "</span>"+
                                                    "</span>";
                                $('div#returned_messages').html(noteToAppend);
                                programOperations("update",programID);
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 1)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Program Name Updated"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                var noteToAppend = "<span style = 'color:green;margin-left:30px'>EDIT PROGRAMS<br>"+
                                                        "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                                        "NOTE: Changes affect the classification"
                                                        "</span>"+
                                                    "</span>";
                                $('div#returned_messages').html(noteToAppend);
                                programOperations("update",programID);
                            },
                            1500
                        );
                    }
                    else if(statusMessage == 10)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Program Datasets Updated"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                var noteToAppend = "<span style = 'color:green;margin-left:30px'>EDIT PROGRAMS<br>"+
                                                        "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                                        "NOTE: Changes affect the classification"
                                                        "</span>"+
                                                    "</span>";
                                $('div#returned_messages').html(noteToAppend);
                                programOperations("update",programID);
                            },
                            1500
                        );
                    }
                }
            );
        }        
    }

    // Delete operation
    else if(operation == "delete")
    {
       var confirmAction=confirm("ARE YOU SURE YOU WANT TO DELETE THIS ITEM?\nDeleting a program will result in loss of classification");
       if(confirmAction)
       {
            $.post
            (
                'db/deletion/delete_programs.php',
                {program_id:programID},
                function(statusMessage)
                {
                    /*
                        NOTES: MESSAGE CODES
                               -1 - Error
                                0 - Program deleted
                        */
                    if(statusMessage == -1)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "An error occured"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                var noteToAppend = "<span style = 'color:red;margin-left:30px'>DELETE PROGRAMS<br>"+
                                                        "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                                        "NOTE: Changes affect the classification"
                                                        "</span>"+
                                                    "</span>";
                                $('div#returned_messages').html(noteToAppend);
                                getPrograms('administration');
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 0)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Program Deleted"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                var noteToAppend = "<span style = 'color:red;margin-left:30px'>DELETE PROGRAMS<br>"+
                                                        "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                                        "NOTE: Changes affect the classification"
                                                        "</span>"+
                                                    "</span>";
                                $('div#returned_messages').html(noteToAppend);
                                getPrograms('administration');
                            },
                            1500
                        );
                    }
                }
            );
        }
        
    }
}
// END FUNCTION
/*--------------------------------------------------------------------------------------------------------------------------------*/