// Function getSupplyHierarchy()
// This function displays all classification in the data administration area
function getSupplyHierarchy()
{
    $('div#returned_messages').html("<span style = 'color:red;margin-left:30px'>DELETE SUPPLY PIPELINE HIERARCHY </span></span>");
                //Central Stores 
    var data = "<div class='panel panel-default' style = 'width:50%'>"+
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
                                                //To delete a program
                                                "&nbsp"+
                                                "<span class = 'fa fa-trash' style = 'color:red;cursor: pointer;'"+
                                                    "onclick='javascript:supplyHierarchyDelete(\"Program\","+responseData[no].program_id+");'>"+
                                                "</span>"+                                          
                                            "</div>"+
                                            "<div id='"+responseData[no].program_id+"' class='panel-collapse collapse'>"+
                                                "<div class='panel-body' id = 'program"+responseData[no].program_id+"'>"+

                                                    "<a data-toggle='collapse' data-parent='#supply_hierarchy_scs' href='#supply_hierarchy_scs"+responseData[no].program_id+"' style = 'margin-left:10px'>"+
                                                        "<span id = 'scs_icon_"+responseData[no].program_id+"' class='glyphicon glyphicon-plus-sign' onclick = 'javascript:changeIcon(\"scs_icon_"+responseData[no].program_id+"\",\"scs_folder_"+responseData[no].program_id+"\")'></span> "+
                                                    "</a>"+

                                                    "<span id = 'scs_folder_"+responseData[no].program_id+"' class = 'fa fa-folder-o unclickedColor color' style = 'font-size:10pt;'> Sub-County Stores</span>"+
                                                    // Delete all sub-county stores
                                                    "&nbsp"+
                                                    "<span class = 'fa fa-trash' style = 'color:red;cursor: pointer;'"+
                                                        "onclick='javascript:supplyHierarchyDelete(\"All Sub-County Stores\",\"\","+responseData[no].program_id+");'>"+
                                                    "</span>"+ 

                                                    "<div id = 'supply_hierarchy_scs"+responseData[no].program_id+"' class = 'panel-collapse collapse'>"+
                                                    "</div>"+
                                                    "<br>"+

                                                    "<a data-toggle='collapse' data-parent='#supply_hierarchy_cs' href='#supply_hierarchy_cs"+responseData[no].program_id+"' style = 'margin-left:10px'>"+
                                                        "<span id = 'cs_icon_"+responseData[no].program_id+"' class='glyphicon glyphicon-plus-sign' onclick = 'javascript:changeIcon(\"cs_icon_"+responseData[no].program_id+"\",\"cs_folder_"+responseData[no].program_id+"\")'></span> "+
                                                    "</a>"+

                                                    "<span id = 'cs_folder_"+responseData[no].program_id+"' class='fa fa-folder-o unclickedColor' style = 'font-size:10pt'> Central Sites</span>"+
                                                    // Delete all central sites
                                                    "&nbsp"+
                                                    "<span class = 'fa fa-trash' style = 'color:red;cursor: pointer;'"+
                                                        "onclick='javascript:supplyHierarchyDelete(\"All Central Sites\",\"\","+responseData[no].program_id+");'>"+
                                                    "</span>"+ 

                                                    "<div id = 'supply_hierarchy_cs"+responseData[no].program_id+"' class = 'panel-collapse collapse'>"+
                                                    "</div>"+ 
                                                    "<br>"+

                                                    "<a data-toggle='collapse' data-parent='#supply_hierarchy_sa' href='#supply_hierarchy_sa"+responseData[no].program_id+"' style = 'margin-left:10px'>"+
                                                        "<span id = 'sa_icon_"+responseData[no].program_id+"' class='glyphicon glyphicon-plus-sign' onclick = 'javascript:changeIcon(\"sa_icon_"+responseData[no].program_id+"\",\"sa_folder_"+responseData[no].program_id+"\")'></span> "+                                         
                                                    "</a>"+

                                                    "<span id = 'sa_folder_"+responseData[no].program_id+"' class='fa fa-folder-o unclickedColor' style = 'font-size:10pt'> StandAlone Sites</span>"+
                                                    // Delete all standalone sites
                                                    "&nbsp"+
                                                    "<span class = 'fa fa-trash' style = 'color:red;cursor: pointer;'"+
                                                        "onclick='javascript:supplyHierarchyDelete(\"All Standalone Sites\",\"\","+responseData[no].program_id+");'>"+
                                                    "</span>"+

                                                    "<div id = 'supply_hierarchy_sa"+responseData[no].program_id+"' class = 'panel-collapse collapse'>"+
                                                    "</div>"+ 

                                                "</div>"+
                                            "</div>";
                $(allProgramsToAppend).appendTo("div#central_stores");

                //Fetch sub-county stores
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
                                                // Delete
                                                "&nbsp"+
                                                "<span class = 'fa fa-trash' style = 'color:red;cursor: pointer;'"+
                                                    "onclick='javascript:supplyHierarchyDelete(\"Sub-County Store\",\""+received[j].facility_id+"\",\""+received[received.length-1].program_id+"\");'>"+
                                                "</span>"+                                           
                                            "</div>"+
                                            "<div id='program"+received[received.length-1].program_id+received[j].facility_id+"' class='panel-collapse collapse'>"+
                                                "<div class='panel-body' id = 'satellite"+received[received.length-1].program_id+received[j].facility_id+"'>"+
                                                "</div>"+
                                            "</div>";
                            $(toAppend).appendTo("div#supply_hierarchy_scs"+received[received.length-1].program_id);

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
                                                                    // Delete
                                                                    "&nbsp"+
                                                                    "<span class = 'fa fa-trash' style = 'color:red;cursor: pointer;'"+
                                                                        "onclick='javascript:supplyHierarchyDelete(\"Satellite Site\",\""+values[k].facility_id+"\",\""+values[values.length-1].program_id+"\");'>"+
                                                                    "</span>"+
                                                                    "&nbsp&nbsp"+
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
                                                // Delete
                                                "&nbsp"+
                                                "<span class = 'fa fa-trash' style = 'color:red;cursor: pointer;'"+
                                                    "onclick='javascript:supplyHierarchyDelete(\"Central Site\",\""+received[j].facility_id+"\",\""+received[received.length-1].program_id+"\");'>"+
                                                "</span>"+                                           
                                            "</div>"+
                                            "<div id='program"+received[received.length-1].program_id+received[j].facility_id+"' class='panel-collapse collapse'>"+
                                                "<div class='panel-body' id = 'satellite"+received[received.length-1].program_id+received[j].facility_id+"'>"+
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
                                                                    // Delete
                                                                    "&nbsp"+
                                                                    "<span class = 'fa fa-trash' style = 'color:red;cursor: pointer;'"+
                                                                        "onclick='javascript:supplyHierarchyDelete(\"Satellite Site\",\""+values[k].facility_id+"\",\""+values[values.length-1].program_id+"\");'>"+
                                                                    "</span>"+
                                                                    "&nbsp&nbsp"+
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
                            var standalonesToAppend = "<div class = 'unclickedColor' style='color:#23527C;font-size:8pt;margin-left:25px;' onclick =''>"+
                                                        received[j].facility_name+
                                                        // Delete
                                                        "&nbsp"+
                                                        "<span class = 'fa fa-trash' style = 'color:red;cursor: pointer;'"+
                                                            "onclick='javascript:supplyHierarchyDelete(\"Standalone Site\",\""+received[j].facility_id+"\",\""+received[received.length-1].program_id+"\");'>"+
                                                        "</span>"+
                                                        "</div>";
                            $(standalonesToAppend).appendTo("div#supply_hierarchy_sa"+received[received.length-1].program_id);
                        }  
                    }
                );               
            }
        }
    );
}
/*End Function*/
/*--------------------------------------------------------------------------------------------------------------------------------*/

// Function supplyHierarchyDelete()
function supplyHierarchyDelete(itemToDelete,idToDelete,programID)
{
    // Prompt to confirm the delete action
    var confirmAction=confirm("ARE YOU SURE YOU WANT TO DELETE THIS ITEM?\nDeleting will result in loss of classification");
    if(confirmAction)
    {
        // Delete a program from the hierarchy
        if(itemToDelete == "Program")
        {
            $.post
            (
                'db/deletion/delete_programs.php',
                {program_id:idToDelete},
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
                                getSupplyHierarchy();
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }
                }
            );
        }

        // Delete all sub-county stores from the hierarchy
        else if(itemToDelete == "All Sub-County Stores")
        {
            $.post
            (
                'db/deletion/delete_all_subcounty_stores.php',
                {program_id:programID,classification:"Sub-County Store"},
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 0)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Sub-County Stores Deleted"+
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 10)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "There are no sub-county stores"+
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }
                }
            );
        }

        // Delete all central sites from the hierarchy
        else if(itemToDelete == "All Central Sites")
        {
            $.post
            (
                'db/deletion/delete_all_central_sites.php',
                {program_id:programID,classification:"Central Site"},
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 0)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Central Sites Deleted"+
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 10)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "There are no central sites"+
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }
                }
            );
        }

        // Delete all standalone sites from the hierarchy
        else if(itemToDelete == "All Standalone Sites")
        {
            $.post
            (
                'db/deletion/delete_all_standalone_sites.php',
                {program_id:programID,classification:"StandAlone"},
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 0)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Standalone Sites Deleted"+
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 10)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "There are no standalone sites"+
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }
                }
            );
        }

        // Delete a single classified facility
        else if(itemToDelete == "Sub-County Store")
        {
            $.post
            (
                'db/deletion/delete_specific_facilities.php',
                {facility_id:idToDelete,program_id:programID,classification:"Sub-County Store"},
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 0)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Sub-County Store Deleted"+
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }
                }
            );
        }

        else if(itemToDelete == "Central Site")
        {
            $.post
            (
                'db/deletion/delete_specific_facilities.php',
                {facility_id:idToDelete,program_id:programID,classification:"Central Site"},
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 0)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Central Site Deleted"+
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }
                }
            );  
        }

        else if(itemToDelete == "Satellite Site")
        {
            $.post
            (
                'db/deletion/delete_specific_facilities.php',
                {facility_id:idToDelete,program_id:programID,classification:"Satellite Site"},
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 0)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Satellite Site Deleted"+
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }
                }
            );
        }

        else if(itemToDelete == "Standalone Site")
        {
            $.post
            (
                'db/deletion/delete_specific_facilities.php',
                {facility_id:idToDelete,program_id:programID,classification:"StandAlone"},
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 0)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Standalone Site Deleted"+
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
                                getSupplyHierarchy();
                            },
                            1500
                        );
                    }
                }
            );
        }
         
    }

}
/*End Function*/
/*--------------------------------------------------------------------------------------------------------------------------------*/