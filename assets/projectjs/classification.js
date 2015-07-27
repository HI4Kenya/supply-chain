/***********************************************************************************
* HI4KENYA AFYAINFO BOOTCAMP 2015                                                  *
* -------------------------------                                                  *
* GROUP ONE                                                                        *
* MSH SUPPLY CHAIN HIERARCHY PROJECT                                               *
* JUNE 2015                                                                        *
* ----------------------------------                                               *
* KELVIN WAHOME                                                                    *
* Computer Science                                                                 *
* School of Computing and Informatics                                              *
* The University of Nairobi                                                        *
* kevowahome@gmail.com                                                             *
* ---------------------------------------------------------------------------------*
**
*This file contains JavaScript functions for the MSH Supply Chain Hierarchy project
**
* ---------------------------------------------------------------------------------*/

/*
 function satelliteClassificationType()
*/
function satelliteClassificationType()
{
    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+ 
                                "SATELLITE SITES (Have Central Sites or Sub-County Stores as their parent)</span>");

        var data =  // Select Program under which these satellite sites are classified
                    "<div style ='width:90%'>"+
                        "<span class='panel-heading' style = 'height:5%;width:81%;margin-bottom:5px;margin-top:-10px;background-color:white;'>"+
                            "How do you want to classify satellites?"+
                        "</span>"+
                        "<button class ='btn btn-info btn-md' style = 'margin-left:0px;margin-top:20px;width:25%;font-weight:bold' ONCLICK='classifyFacilities(3,\"sub-county satellites\")'>Sub-County Store Satellites</button>"+
                        "<button class ='btn btn-success btn-md' style = 'margin-left:30px;margin-top:20px;width:25%;font-weight:bold' ONCLICK='classifyFacilities(3,\"central site satellites\")'>Central Site Satellites</button>"+                        
                    //Organization units hierarchy area
                    "<div id = 'org_units_area' style = 'width:100%;margin-top:25px'></div>";
        // Append
        $('div#facilities').html(data);
}
/*
    Function classifyFacilities()
    1 - Central Sites
    2 - Satellite Sites
    3 - Stand Alone Sites
*/

function classifyFacilities(type, satelliteClassification)
{
    /* SUB-COUNTY STORES */
    if(type == 1)
    {
        $('div#returned_messages').html("<span id = 'classification_desc' style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+ 
                                " SUB-COUNTY STORES</span>");

        var data = // Select Program under which these central sites are classified
                    "<div style ='width:90%'>"+
                        "<span class='panel-heading' style = 'height:5%;width:81%;margin-bottom:5px;color:blue;'>"+
                            "Program: The program selected will have these central sites attributed to it"+
                        "</span>"+
                        // Available Header
                        "<div class='panel-heading' style = 'height:6%;width:40%;margin-right:10px;margin-bottom:5px;' onLoad='initIt();'>"+
                            "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='javascript:classifyFacilities(1)'>Reset</button>"+
                            "<span style = 'margin-left:70px'>Available Programs</span>"+
                            "<span class = 'glyphicon glyphicon-forward pull-right unclickedColor' style = 'color:;margin-top:3px' ONCLICK='addIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-right pull-right unclickedColor' style = 'margin-right:10px;color:;margin-top:3px' ONCLICK='addIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                        "</div>"+
                       // Selected header
                       "<div class='panel-heading' style = 'height:6%;width:40%;margin-bottom:5px'>"+                           
                            "<span class = 'glyphicon glyphicon-backward pull-left unclickedColor' style = 'color:;margin-top:3px' ONCLICK='delIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-left pull-left unclickedColor' style = 'margin-left:10px;color:;margin-top:3px' ONCLICK='delIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                            "<span style = 'margin-left:10px'>Selected Programs</span>"+ 
                            "<button class ='btn btn-success btn-sm' style = 'margin-left:70px;width:20%' ONCLICK='submitIt(1)'>Submit</button>"+                 
                        "</div>"+
                        // All facilities area
                        "<div id = 'all_programs' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<input placeholder = 'Search' id = 'programs_available_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"ProgramsSelectList\",\"programs_available_filter_search\")'></input><br>"+
                            "<select NAME='ProgramsSelectList' ID='ProgramsSelectList' SIZE='5' multiple='multiple' style = 'width:100%;min-height:100px'>"+
                            "</select>"+
                        "</div>"+                    
                        // selected area
                        "<div id = 'selected_programs' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<div id = 'programs_search_field'>"+
                                "<input placeholder = 'Search' id= 'programs_selected_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"ProgramsPickList\",\"programs_selected_filter_search\")'></input>"+
                                "</div>"+
                            "<select NAME='ProgramsPickList' ID='ProgramsPickList' SIZE='5' multiple='multiple' style = 'width:100%;min-height:100px'>"+
                            "</select>"+
                        "</div>"+
                        /*End Programs*/

                        /*CENTRAL SITES FOR THE ABOVE PROGRAM*/
                        // Available Header
                        "<span class='panel-heading' style = 'height:5%;width:81%;margin-bottom:5px;color:brown;'>"+
                            "Sub-County Stores: Have the program above attributed to them"+
                        "</span>"+

                        "<div class='panel-heading' style = 'height:5%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initIt();'>"+
                            // "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='javascript:classifyFacilities(1)'>Reset</button>"+
                            "<span style = 'margin-left:100px'>Available</span>"+
                            "<span class = 'glyphicon glyphicon-forward pull-right unclickedColor' style = 'color:' ONCLICK='addIt(\"SelectList\",\"PickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-right pull-right unclickedColor' style = 'margin-right:10px;color:' ONCLICK='addIt(\"SelectList\",\"PickList\");'></span>"+
                        "</div>"+
                       // Selected header
                       "<div class='panel-heading' style = 'height:5%;width:40%;margin-bottom:5px'>"+                           
                            "<span class = 'glyphicon glyphicon-backward pull-left unclickedColor' style = 'color:' ONCLICK='delIt(\"SelectList\",\"PickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-left pull-left unclickedColor' style = 'margin-left:10px;color:' ONCLICK='delIt(\"SelectList\",\"PickList\");'></span>"+
                            "<span style = 'margin-left:30px'>Selected</span>"+                 
                        "</div>"+
                        // All facilities area
                        "<div id = 'all_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            //border:2px solid #2A6496
                            // Search for filtering purposes
                            "<input placeholder = 'Search' id = 'available_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"SelectList\",\"available_filter_search\")'></input><br>"+
                            "<select NAME='SelectList' ID='SelectList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                            "</select>"+
                        "</div>"+
                        
                        // selected area
                        "<form id = 'facilities_to_insert'>"+
                        "<div id = 'selected_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<div id = 'search_field'>"+
                                "<input placeholder = 'Search' id = 'selected_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"PickList\",\"selected_filter_search\")'></input>"+
                            "</div>"+
                            "<select NAME='PickList' ID='PickList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                            "</select>"+
                        "</div>"+
                        "</form>"+
                    "</div>"+
                    //Organization units hierarchy area
                    "<div id = 'org_units_area' style = 'width:100%;margin-top:25px'></div>";
        // Append
        $('div#facilities').html(data);

        // Fetch facilities and display in the picklist
        var url = "db/fetch/get_facilities.php";
        $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");      
        $.getJSON
        (
            url,
            {id:"",type:"init"},
            function(received)
            {
                for(var j=0; j<received.length;j++)
                {
                    $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");    
                    $("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("select#SelectList");
                }
                $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
            }
        );

        // DHIS2 Org Units Hierarchy
        $.get("client/templates/orgunitshierarchy.php").then
        (
            function(responseData) 
            {
                $('div#org_units_area').empty();
                $('div#org_units_area').append(responseData);
            }
        );

    }
    /* CENTRAL STORES */
    else if(type == 2)
    {
        $('div#returned_messages').html("<span id = 'classification_desc' style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+ 
                                "CENTRAL SITES</span>");

        var data = // Select Program under which these central sites are classified
                    "<div style ='width:90%'>"+
                        "<span class='panel-heading' style = 'height:5%;width:81%;margin-bottom:5px;color:blue;'>"+
                            "Program: The program selected will have these central sites attributed to it"+
                        "</span>"+
                        // Available Header
                        "<div class='panel-heading' style = 'height:6%;width:40%;margin-right:10px;margin-bottom:5px;' onLoad='initIt();'>"+
                            "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='javascript:classifyFacilities(2)'>Reset</button>"+
                            "<span style = 'margin-left:70px'>Available Programs</span>"+
                            "<span class = 'glyphicon glyphicon-forward pull-right unclickedColor' style = 'color:;margin-top:3px' ONCLICK='addIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-right pull-right unclickedColor' style = 'margin-right:10px;color:;margin-top:3px' ONCLICK='addIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                        "</div>"+
                       // Selected header
                       "<div class='panel-heading' style = 'height:6%;width:40%;margin-bottom:5px'>"+                           
                            "<span class = 'glyphicon glyphicon-backward pull-left unclickedColor' style = 'color:;margin-top:3px' ONCLICK='delIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-left pull-left unclickedColor' style = 'margin-left:10px;color:;margin-top:3px' ONCLICK='delIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                            "<span style = 'margin-left:10px'>Selected Programs</span>"+ 
                            "<button class ='btn btn-success btn-sm' style = 'margin-left:70px;width:20%' ONCLICK='submitIt(2)'>Submit</button>"+                 
                        "</div>"+
                        // All facilities area
                        "<div id = 'all_programs' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<input placeholder = 'Search' id = 'programs_available_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"ProgramsSelectList\",\"programs_available_filter_search\")'></input><br>"+
                            "<select NAME='ProgramsSelectList' ID='ProgramsSelectList' SIZE='5' multiple='multiple' style = 'width:100%;min-height:100px'>"+
                            "</select>"+
                        "</div>"+                    
                        // selected area
                        "<div id = 'selected_programs' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<div id = 'programs_search_field'>"+
                                "<input placeholder = 'Search' id= 'programs_selected_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"ProgramsPickList\",\"programs_selected_filter_search\")'></input>"+
                                "</div>"+
                            "<select NAME='ProgramsPickList' ID='ProgramsPickList' SIZE='5' multiple='multiple' style = 'width:100%;min-height:100px'>"+
                            "</select>"+
                        "</div>"+
                        /*End Programs*/

                        /*CENTRAL SITES FOR THE ABOVE PROGRAM*/
                        // Available Header
                        "<span class='panel-heading' style = 'height:5%;width:81%;margin-bottom:5px;color:brown;'>"+
                            "Central Sites: Have the program above attributed to them"+
                        "</span>"+

                        "<div class='panel-heading' style = 'height:5%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initIt();'>"+
                            // "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='javascript:classifyFacilities(1)'>Reset</button>"+
                            "<span style = 'margin-left:100px'>Available</span>"+
                            "<span class = 'glyphicon glyphicon-forward pull-right unclickedColor' style = 'color:' ONCLICK='addIt(\"SelectList\",\"PickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-right pull-right unclickedColor' style = 'margin-right:10px;color:' ONCLICK='addIt(\"SelectList\",\"PickList\");'></span>"+
                        "</div>"+
                       // Selected header
                       "<div class='panel-heading' style = 'height:5%;width:40%;margin-bottom:5px'>"+                           
                            "<span class = 'glyphicon glyphicon-backward pull-left unclickedColor' style = 'color:' ONCLICK='delIt(\"SelectList\",\"PickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-left pull-left unclickedColor' style = 'margin-left:10px;color:' ONCLICK='delIt(\"SelectList\",\"PickList\");'></span>"+
                            "<span style = 'margin-left:30px'>Selected</span>"+                 
                        "</div>"+
                        // All facilities area
                        "<div id = 'all_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            //border:2px solid #2A6496
                            // Search for filtering purposes
                            "<input placeholder = 'Search' id = 'available_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"SelectList\",\"available_filter_search\")'></input><br>"+
                            "<select NAME='SelectList' ID='SelectList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                            "</select>"+
                        "</div>"+
                        
                        // selected area
                        "<form id = 'facilities_to_insert'>"+
                        "<div id = 'selected_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<div id = 'search_field'>"+
                                "<input placeholder = 'Search' id = 'selected_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"PickList\",\"selected_filter_search\")'></input>"+
                            "</div>"+
                            "<select NAME='PickList' ID='PickList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                            "</select>"+
                        "</div>"+
                        "</form>"+
                    "</div>"+
                    //Organization units hierarchy area
                    "<div id = 'org_units_area' style = 'width:100%;margin-top:25px'></div>";
        // Append
        $('div#facilities').html(data);

        // Fetch facilities and display in the picklist
        var url = "db/fetch/get_facilities.php";
        $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");      
        $.getJSON
        (
            url,
            {id:"",type:"init"},
            function(received)
            {
                for(var j=0; j<received.length;j++)
                {
                    $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");    
                    $("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("select#SelectList");
                }
                $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
            }
        );

        // DHIS2 Org Units Hierarchy
        $.get("client/templates/orgunitshierarchy.php").then
        (
            function(responseData) 
            {
                $('div#org_units_area').empty();
                $('div#org_units_area').append(responseData);
            }
        );
    }
    /*End CENTRAL STORES*/
    /*-------------------------------------------------------------------------------------------------------------------------*/

    /*SATELLITE SITES*/
    else if(type == 3)
    {
        if(satelliteClassification == "central site satellites")
        {
            $('div#returned_messages').empty();
            $('div#returned_messages').html("<span id = 'classification_desc' style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+ 
                                "CENTRAL SITE SATELLITES (Have Central Sites as their parent)</span>");
        }

        else if (satelliteClassification == "sub-county satellites")
        {
            $('div#returned_messages').empty();
            $('div#returned_messages').html("<span id = 'classification_desc' style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+ 
                                "SUB-COUNTY STORE SATELLITES (Have Sub-County Stores as their parent)</span>");
        }

        var data =  // Select Program under which these satellite sites are classified
                    "<div style ='width:90%'>"+
                        "<span class='panel-heading' style = 'height:5%;width:81%;margin-bottom:5px;color:blue;'>"+
                            "Program: The program selected will have these central sites attributed to it"+
                        "</span>"+
                        // Available Header
                        "<div class='panel-heading' style = 'height:6%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initIt();'>"+
                            "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='javascript:classifyFacilities(3,\""+satelliteClassification+"\")'>Reset</button>"+
                            "<span style = 'margin-left:70px'>Available Programs</span>"+
                            "<span class = 'glyphicon glyphicon-forward pull-right unclickedColor' style = 'color:;margin-top:3px' ONCLICK='addIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-right pull-right unclickedColor' style = 'margin-right:10px;color:;margin-top:3px' ONCLICK='addIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                        "</div>"+
                       // Selected header
                       "<div class='panel-heading' style = 'height:6%;width:40%;margin-bottom:5px'>"+                           
                            "<span class = 'glyphicon glyphicon-backward pull-left unclickedColor' style = 'color:;margin-top:3px' ONCLICK='delIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-left pull-left unclickedColor' style = 'margin-left:10px;color:;margin-top:3px' ONCLICK='delIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                            "<span style = 'margin-left:10px'>Selected Programs</span>"+ 
                            "<button class ='btn btn-success btn-sm' style = 'margin-left:70px;width:20%' ONCLICK='submitIt(3)'>Submit</button>"+                 
                        "</div>"+
                        // All facilities area
                        "<div id = 'all_programs' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<input placeholder = 'Search' id = 'programs_available_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"ProgramsSelectList\",\"programs_available_filter_search\")'></input><br>"+
                            "<select NAME='ProgramsSelectList' ID='ProgramsSelectList' SIZE='3' multiple='multiple' style = 'width:100%;min-height:70px' onchange='javascript:programCentralSites(\""+satelliteClassification+"\");'>"+
                            "</select>"+
                        "</div>"+                    
                        // selected area
                        "<div id = 'selected_programs' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<div id = 'programs_search_field'>"+
                                "<input placeholder = 'Search' id= 'programs_selected_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"ProgramsPickList\",\"programs_selected_filter_search\")'></input>"+
                                "</div>"+
                            //Update the central stores according to this program 
                            "<select NAME='ProgramsPickList' ID='ProgramsPickList' SIZE='3' multiple='multiple' style = 'width:100%;min-height:70px'>"+
                            "</select>"+
                        "</div>"+
                        /*End Programs*/

                        // Select Central Site which ones the satellites
                        "<span id = 'parent_site_type' class='panel-heading' style = 'height:5%;width:81%;margin-bottom:5px;color:blue;'>"+
                        "</span>"+
                        // Available Header
                        "<div class='panel-heading' style = 'height:5%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initIt();'>"+
                            "<span style = 'margin-left:100px'>Available</span>"+
                            "<span class = 'glyphicon glyphicon-forward pull-right unclickedColor' style = 'color:' ONCLICK='addIt(\"CSSelectList\",\"CSPickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-right pull-right unclickedColor' style = 'margin-right:10px;color:' ONCLICK='addIt(\"CSSelectList\",\"CSPickList\");'></span>"+
                        "</div>"+
                       // Selected header
                       "<div class='panel-heading' style = 'height:5%;width:40%;margin-bottom:5px'>"+                           
                            "<span class = 'glyphicon glyphicon-backward pull-left unclickedColor' style = 'color:' ONCLICK='delIt(\"CSSelectList\",\"CSPickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-left pull-left unclickedColor' style = 'margin-left:10px;color:' ONCLICK='delIt(\"CSSelectList\",\"CSPickList\");'></span>"+
                            "<span style = 'margin-left:30px'>Selected</span>"+               
                        "</div>"+
                        // All facilities area
                        "<div id = 'all_central_stores' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            //border:2px solid #2A6496
                            // Search for filtering purposes
                            "<input placeholder = 'Search' id = 'cs_available_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"CSSelectList\",\"cs_available_filter_search\")'></input><br>"+
                            "<select NAME='CSSelectList' ID='CSSelectList' SIZE='5' multiple='multiple' style = 'width:100%;min-height:100px'>"+
                            "</select>"+
                        "</div>"+
                        
                        // selected area
                        "<div id = 'selected_central_store' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<div id = 'cs_search_field'>"+
                                "<input placeholder = 'Search' id= 'cs_selected_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"CSPickList\",\"cs_selected_filter_search\")'></input>"+
                                "</div>"+
                            "<select NAME='CSPickList' ID='CSPickList' SIZE='5' multiple='multiple' style = 'width:100%;min-height:100px'>"+
                            "</select>"+
                        "</div>"+
                        /*End Central Store*/

                        /*SATELLITE SITES FOR THE ABOVE CENTRAL SITE*/
                        // Available Header
                        "<span id = 'satellites_area' class='panel-heading' style = 'height:5%;width:81%;margin-bottom:5px;color:brown;'>"+
                        "</span>"+
                        "<div class='panel-heading' style = 'height:6%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initIt();'>"+
                            // "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='javascript:classifyFacilities(2)'>Reset</button>"+
                            "<span style = 'margin-left:100px'>Available</span>"+
                            "<span class = 'glyphicon glyphicon-forward pull-right unclickedColor' style = 'color:;margin-top:3px' ONCLICK='addIt(\"SelectList\",\"PickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-right pull-right unclickedColor' style = 'margin-right:10px;color:;margin-top:3px' ONCLICK='addIt(\"SelectList\",\"PickList\");'></span>"+
                        "</div>"+
                       // Selected header
                       "<div class='panel-heading' style = 'height:6%;width:40%;margin-bottom:5px'>"+                           
                            "<span class = 'glyphicon glyphicon-backward pull-left unclickedColor' style = 'color:;margin-top:3px' ONCLICK='delIt(\"SelectList\",\"PickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-left pull-left unclickedColor' style = 'margin-left:10px;color:;margin-top:3px' ONCLICK='delIt(\"SelectList\",\"PickList\");'></span>"+
                            "<span style = 'margin-left:30px'>Selected</span>"+ 
                            "<button class ='btn btn-success btn-sm' style = 'margin-left:130px;width:20%' ONCLICK='submitIt(3)'>Submit</button>"+                 
                        "</div>"+
                        // All facilities area
                        "<div id = 'all_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            //border:2px solid #2A6496
                            // Search for filtering purposes
                            "<input placeholder = 'Search' id = 'available_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"SelectList\",\"available_filter_search\")'></input><br>"+
                            "<select NAME='SelectList' ID='SelectList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                            "</select>"+
                        "</div>"+
                        
                        // selected area
                        "<div id = 'selected_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<div id = 'search_field'>"+
                                "<input placeholder = 'Search' id = 'selected_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"PickList\",\"selected_filter_search\")'></input>"+
                            "</div>"+
                            "<select NAME='PickList' ID='PickList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                            "</select>"+
                        "</div>"+
                    "</div>"+
                    //Organization units hierarchy area
                    "<div id = 'org_units_area' style = 'width:100%;margin-top:25px'></div>";
        // Append
        $('div#facilities').html(data);

        if(satelliteClassification == "central site satellites")
        {
            $('span#parent_site_type').html("Central Site: The site selected is the parent to the satellite sites");
            $('span#satellites_area').html("Satellite Sites: Have the Central Site above as their parent");
        }

        else if (satelliteClassification == "sub-county satellites")
        {
            $('span#parent_site_type').html("Sub-County Store: The site selected is the parent to the satellite sites");
            $('span#satellites_area').html("Satellite Sites: Have the Sub-County Store above as their parent");
        }

        
        // Fetch Central Sites and display in the Central Sites picklist
        var cs_url = "db/fetch/get_central_sites.php";
        $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");         
        $.getJSON
        (
            cs_url,
            function(returned)
            {
                for(var j=0; j<returned.length;j++)
                {
                    $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");   
                    $("<option VALUE='"+returned[j].facility_id+"'>"+returned[j].facility_name+"</option>").appendTo("select#CSSelectList");
                }
                //$('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
            }
        );

        // Fetch facilities and display in the picklist
        var url = "db/fetch/get_facilities.php";
        $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");         
        $.getJSON
        (
            url,
            {id:"",type:"init"},
            function(received)
            {
                for(var j=0; j<received.length;j++)
                {
                    $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");    
                    $("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("select#SelectList");
                }
                $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
            }
        );

        // DHIS2 Org Units Hierarchy
        $.get("client/templates/orgunitshierarchy.php").then
        (
            function(responseData) 
            {
                $('div#org_units_area').empty();
                $('div#org_units_area').append(responseData);
            }
        );
    }
    /*END SATELLITE SITES*/
    /*--------------------------------------------------------------------------------------------------------------------------------*/

    /*STAND ALONES*/
    else if(type == 4)
    {
        $('div#returned_messages').html("<span id = 'classification_desc' style = 'color:green;margin-left:30px'>"+
                                "<span id = 'maximize_icon' title = 'Full Screen' onclick = 'javascript:maximizeView();'>"+
                                "<img src='assets/img/full-screen.png' class = 'unclickedColor' style = 'height:;width:;'>"+
                                "</span>"+
                                "&nbsp <span style = 'color:black'>|</span>"+ 
                                "STANDALONE SITES</span>");

        var data = // Select Program under which these stand alone sites are classified
                    "<div style = 'width:90%'>"+
                        "<span class='panel-heading' style = 'height:5%;width:81%;margin-bottom:5px;color:blue;'>"+
                            "Program: The program selected will have these standalone sites attributed to it"+
                        "</span>"+
                        // Available Header
                        "<div class='panel-heading' style = 'height:6%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initIt();'>"+
                            "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='javascript:classifyFacilities(4)'>Reset</button>"+
                            "<span style = 'margin-left:70px'>Available Programs</span>"+
                            "<span class = 'glyphicon glyphicon-forward pull-right unclickedColor' style = 'color:;margin-top:3px' ONCLICK='addIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-right pull-right unclickedColor' style = 'margin-right:10px;color:;margin-top:3px' ONCLICK='addIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                        "</div>"+
                       // Selected header
                       "<div class='panel-heading' style = 'height:6%;width:40%;margin-bottom:5px'>"+                           
                            "<span class = 'glyphicon glyphicon-backward pull-left unclickedColor' style = 'color:;margin-top:3px' ONCLICK='delIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-left pull-left unclickedColor' style = 'margin-left:10px;color:;margin-top:3px' ONCLICK='delIt(\"ProgramsSelectList\",\"ProgramsPickList\");'></span>"+
                            "<span style = 'margin-left:10px'>Selected Programs</span>"+ 
                            "<button class ='btn btn-success btn-sm' style = 'margin-left:70px;width:20%' ONCLICK='submitIt(4)'>Submit</button>"+                 
                        "</div>"+
                        // All facilities area
                        "<div id = 'all_programs' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<input placeholder = 'Search' id = 'programs_available_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"ProgramsSelectList\",\"programs_available_filter_search\")'></input><br>"+
                            "<select NAME='ProgramsSelectList' ID='ProgramsSelectList' SIZE='5' multiple='multiple' style = 'width:100%;min-height:100px'>"+
                            "</select>"+
                        "</div>"+                    
                        // selected area
                        "<div id = 'selected_programs' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<div id = 'programs_search_field'>"+
                                "<input placeholder = 'Search' id= 'programs_selected_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"ProgramsPickList\",\"programs_selected_filter_search\")'></input>"+
                                "</div>"+
                            "<select NAME='ProgramsPickList' ID='ProgramsPickList' SIZE='5' multiple='multiple' style = 'width:100%;min-height:100px'>"+
                            "</select>"+
                        "</div>"+
                        /*End Programs*/


                        /*STANDALONE SITES FOR THE ABOVE PROGRAM*/
                        // Available Header
                        "<span class='panel-heading' style = 'height:5%;width:81%;margin-bottom:5px;color:brown;'>"+
                            "StandAlone Sites: Have the program above attributed to them"+
                        "</span>"+
                        "<div class='panel-heading' style = 'height:5%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initIt();'>"+
                            "<span style = 'margin-left:100px'>Available</span>"+
                            "<span class = 'glyphicon glyphicon-forward pull-right unclickedColor' style = 'color:' ONCLICK='addIt(\"SelectList\",\"PickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-right pull-right unclickedColor' style = 'margin-right:10px;color:' ONCLICK='addIt(\"SelectList\",\"PickList\");'></span>"+
                        "</div>"+
                       // Selected header
                       "<div class='panel-heading' style = 'height:5%;width:40%;margin-bottom:5px'>"+                           
                            "<span class = 'glyphicon glyphicon-backward pull-left unclickedColor' style = 'color:' ONCLICK='delIt(\"SelectList\",\"PickList\");'></span>"+
                            "<span class = 'glyphicon glyphicon-chevron-left pull-left unclickedColor' style = 'margin-left:10px;color:' ONCLICK='delIt(\"SelectList\",\"PickList\");'></span>"+
                            "<span style = 'margin-left:30px'>Selected</span>"+                
                        "</div>"+
                        // All facilities area
                        "<div id = 'all_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            //border:2px solid #2A6496
                            // Search for filtering purposes
                            "<input placeholder = 'Search' id = 'available_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"SelectList\",\"available_filter_search\")'></input><br>"+
                            "<select NAME='SelectList' ID='SelectList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                            "</select>"+
                        "</div>"+
                        
                        // selected area
                        "<form id = 'facilities_to_insert'>"+
                        "<div id = 'selected_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                            "<div id = 'search_field'>"+
                                "<input placeholder = 'Search' id = 'selected_filter_search' style = 'width:100%;margin-bottom:3px' onkeypress='javascript:filterFacilities(\"PickList\",\"selected_filter_search\")'></input></div>"+
                            "<select NAME='PickList' ID='PickList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                            "</select>"+
                        "</div>"+
                        "</form>"+
                    "</div>"+
                    //Organization units hierarchy area
                    "<div id = 'org_units_area' style = 'width:100%;margin-top:25px'></div>";
        // Append
        $('div#facilities').html(data);

        // Fetch facilities and display in the picklist
        var url = "db/fetch/get_facilities.php";
        $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");          
        $.getJSON
        (
            url,
            {id:"",type:"init"},
            function(received)
            {
                for(var j=0; j<received.length;j++)
                {
                    $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");    
                    $("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("select#SelectList");
                }
                $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
            }
        );

        // DHIS2 Org Units Hierarchy
        $.get("client/templates/orgunitshierarchy.php").then
        (
            function(responseData) 
            {
                $('div#org_units_area').empty();
                $('div#org_units_area').append(responseData);
            }
        );

    }
    /*END STANDALONES*/
    
    /*--------------------------------------------------------------------------------------------------------------------------------------*/
    // Fetch programs and display in the selectlist
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
                $("<option VALUE='"+receivedPrograms[counting].program_id+"'>"+receivedPrograms[counting].program_name+"</option>").appendTo("select#ProgramsSelectList");
            }
            $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
        }
    );
}
/*End Function*/
/*--------------------------------------------------------------------------------------------------------------------------------*/

//Function programCentralSites()
//Update the central sites select list according to the selected program
function programCentralSites(satelliteClassification)
{
    //Programs
    var programSelectList = document.getElementById("ProgramsSelectList");
    var programSelectIndex = programSelectList.selectedIndex; 
    var programSelectOptions = programSelectList.options;
    var selectedProgramID = programSelectOptions[programSelectIndex].value;

    // Fetch Central Sites and display in the Central Sites picklist
    var program_central_sites_url;
    var theClassification;
    if(satelliteClassification == "central site satellites")
    {
        program_central_sites_url = "db/fetch/get_program_central_sites.php";
        theClassification = "Central Site";
    }

    else if (satelliteClassification == "sub-county satellites")
    {
        program_central_sites_url = "db/fetch/get_program_subcounty_stores.php";
        theClassification = "Sub-County Store"
    }

    $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");         
    $.getJSON
    (
        program_central_sites_url,
        {program_id:selectedProgramID,classification:theClassification},
        function(returnedData)
        {
            $("select#CSSelectList").empty();
            for(var j=0; j<returnedData.length;j++)
            {
                $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");   
                $("<option VALUE='"+returnedData[j].facility_id+"'>"+returnedData[j].facility_name+"</option>").appendTo("select#CSSelectList");
            }
            $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
        }
    );
}
/*End Function*/
/*--------------------------------------------------------------------------------------------------------------------------------*/