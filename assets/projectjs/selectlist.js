//PICKLIST

// PickList script
// Control flags for list selection and sort sequence
// Sequence is on option value (first 2 chars - can be stripped off in form processing)
// It is assumed that the select list is in sort sequence initially
var singleSelect = true;  // Allows an item to be selected once only
var sortSelect = true;  // Only effective if above flag set to true
var sortPick = true;  // Will order the picklist in sort sequence

// Initialise - invoked on load
function initIt() 
{
    var selectList = document.getElementById("SelectList");
    var selectOptions = selectList.options;
    var selectIndex = selectList.selectedIndex;
    var pickList = document.getElementById("PickList");
    var pickOptions = pickList.options;
    pickOptions[0] = null;  // Remove initial entry from picklist (was only used to set default width)
    if (!(selectIndex > -1)) 
    {
        selectOptions[0].selected = true;  // Set first selected on load
        selectOptions[0].defaultSelected = true;  // In case of reset/reload
    }
    selectList.focus();  // Set focus on the selectlist
}

// Adds a selected item into the picklist
function addIt(selectListID,pickListID) 
{
    var selectList = document.getElementById(selectListID);
    var selectIndex = selectList.selectedIndex;
    var selectOptions = selectList.options;
    var pickList = document.getElementById(pickListID);
    var pickOptions = pickList.options;
    var pickOLength = pickOptions.length;
    // An item must be selected
    while (selectIndex > -1) 
    {
        pickOptions[pickOLength] = new Option(selectList[selectIndex].text);
        pickOptions[pickOLength].value = selectList[selectIndex].value;
        // If single selection, remove the item from the select list
        if (singleSelect) 
        {
            selectOptions[selectIndex] = null;
        }
        if (sortPick) 
        {
            var tempText;
            var tempValue;
            // Sort the pick list
            while (pickOLength > 0 && pickOptions[pickOLength].value < pickOptions[pickOLength-1].value) 
            {
                tempText = pickOptions[pickOLength-1].text;
                tempValue = pickOptions[pickOLength-1].value;
                pickOptions[pickOLength-1].text = pickOptions[pickOLength].text;
                pickOptions[pickOLength-1].value = pickOptions[pickOLength].value;
                pickOptions[pickOLength].text = tempText;
                pickOptions[pickOLength].value = tempValue;
                pickOLength = pickOLength - 1;
            }
        }
        selectIndex = selectList.selectedIndex;
        pickOLength = pickOptions.length;
        $('div#search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
    }
    selectOptions[0].selected = true;
}
// Deletes an item from the picklist
function delIt(selectListID,pickListID) 
{
    var selectList = document.getElementById(selectListID);
    var selectOptions = selectList.options;
    var selectOLength = selectOptions.length;
    var pickList = document.getElementById(pickListID);
    var pickIndex = pickList.selectedIndex;
    var pickOptions = pickList.options;
    while (pickIndex > -1) 
    {
        // If single selection, replace the item in the select list
        if (singleSelect) 
        {
            selectOptions[selectOLength] = new Option(pickList[pickIndex].text);
            selectOptions[selectOLength].value = pickList[pickIndex].value;
        }
        pickOptions[pickIndex] = null;
        if (singleSelect && sortSelect) 
        {
            var tempText;
            var tempValue;
            // Re-sort the select list
            while (selectOLength > 0 && selectOptions[selectOLength].value < selectOptions[selectOLength-1].value) 
            {
                tempText = selectOptions[selectOLength-1].text;
                tempValue = selectOptions[selectOLength-1].value;
                selectOptions[selectOLength-1].text = selectOptions[selectOLength].text;
                selectOptions[selectOLength-1].value = selectOptions[selectOLength].value;
                selectOptions[selectOLength].text = tempText;
                selectOptions[selectOLength].value = tempValue;
                selectOLength = selectOLength - 1;
            }
        }
        pickIndex = pickList.selectedIndex;
        selectOLength = selectOptions.length;
    }
}
/*--------------------------------------------------------------------------------------------------------------------------------*/

/*
    Function submitIt(btn) 
    1 - Central Sites
    2 - Satellite Sites
    3 - StandAlone Sites
*/

// Selection - invoked on submit
function submitIt(btn) 
{
  var pickList = document.getElementById("PickList");
  var pickOptions = pickList.options;
  var pickOLength = pickOptions.length;

  //Programs
  var programPickList = document.getElementById("ProgramsPickList");
  var programPickOptions = programPickList.options;
  var programPickOLength = programPickOptions.length;
  var programPickIndex = 0;//programPickList.selectedIndex;

  if(btn==2)
  {
    // Central Site picklist
    var CSpickList = document.getElementById("CSPickList");
    var CSpickOptions = CSpickList.options;
    var CSpickOLength = CSpickOptions.length;
    var CSPickIndex = 0;//CSpickList.selectedIndex;

    if(programPickOLength<1)
    {
        $('div#programs_search_field').html("<span class = 'fa fa-ok' style = 'color:red;font-size:8pt'>No program selected. \nPlease add a program from the Available list by selecting it and clicking the [>]</span>");
        return false;
    }

    else
    {
        $('div#programs_search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
        if (CSpickOLength < 1) 
        {
            $('div#cs_search_field').html("<span class = 'fa fa-ok' style = 'color:red;font-size:8pt'>No Central Store has been selected. \nPlease add facilities from the Available list by selecting the facility and clicking the [>] button</span>");
            //alert("No Selections in the Picklist\nPlease Select using the [->] button");
            return false;
        }
        else
        {
            $('div#cs_search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
            if (pickOLength < 1) 
            {
                $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;font-size:8pt'>No facilities selected. \nPlease add facilities from the Available list by selecting the facility and clicking the [>] button</span>");
                //alert("No Selections in the Picklist\nPlease Select using the [->] button");
                return false;
            }
            else
            {
                $('div#search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
            }
        }

    }
  }

  else
  {
    $('div#cs_search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
    if(programPickOLength<1)
    {
        $('div#programs_search_field').html("<span class = 'fa fa-ok' style = 'color:red;font-size:8pt'>No program selected. \nPlease add a program from the Available list by selecting it and clicking the [>]</span>");
        return false;
    }

    else
    {
        $('div#programs_search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
        if (pickOLength < 1) 
        {
            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;font-size:8pt'>No facilities selected. \nPlease add facilities from the Available list by selecting the facility and clicking the [>] button</span>");
            return false;
        }
        else
        {
            $('div#search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
        }

    }
  }

  for (var i = 0; i < pickOLength; i++) 
  {
    pickOptions[i].selected = true;
    //programPickOptions[i].selected = true;

    /* Central Site */
    if(btn == 1)
    {
        $.ajax
        (
            { 
                type: "POST",   
                     url: "db/insertion/insert_sites.php",   
                     async: false,
                     data:{program:programPickOptions[programPickIndex].value,data:pickOptions[i].value,type:"Central Site"},
                     success:function(result)
                     {
                        if(result == -1)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>An error occured. Reset and try again<br><br></span>");
                        }
                        else if(result == 0)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:green;'>Central stores inserted<br><br></span>");
                            //Delete the item from the selected area
                            var idOfSelectList = "SelectList";
                            var idOfPickList = "PickList";
                            delIt(idOfSelectList,idOfPickList);
                        }

                        else if(result == 1)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>Store exists<br><br></span>");
                            //Delete the item from the selected area
                            var idOfSelectList = "SelectList";
                            var idOfPickList = "PickList";
                            delIt(idOfSelectList,idOfPickList);
                        }
                        else if(result == 10)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>Facility exists as a Stand Alone Site<br><br></span>");
                            //Delete the item from the selected area
                            var idOfSelectList = "SelectList";
                            var idOfPickList = "PickList";
                            delIt(idOfSelectList,idOfPickList);
                        }
                        else if(result == 11)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:blue;'>Facility updated<br><br></span>");
                            //Delete the item from the selected area
                            var idOfSelectList = "SelectList";
                            var idOfPickList = "PickList";
                            delIt(idOfSelectList,idOfPickList);
                        }

                     }
            }
        );

    }

    /* Satellite Site */
    else if(btn == 2)
    {
        $.ajax
        (
            { 
                type: "POST",   
                     url: "db/insertion/insert_sites.php",   
                     async: false,
                     data:{program:programPickOptions[programPickIndex].value,data:pickOptions[i].value,central:CSpickOptions[CSPickIndex].value,type:"Satellite Site"},
                     success:function(result)
                     {
                        if(result == -1)
                        {
                            $('div#cs_search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>An error occured. Reset and try again<br><br></span>");
                        }
                        else if(result == 0)
                        {
                            $('div#cs_search_field').html("<span class = 'fa fa-ok' style = 'color:green;'>Satellite Sites inserted<br><br></span>");
                            //Delete the item from the selected area
                            var idOfSelectList = "SelectList";
                            var idOfPickList = "PickList";
                            delIt(idOfSelectList,idOfPickList);
                        }

                        else if(result == 1)
                        {
                            $('div#cs_search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>Satelite Site exists<br><br></span>");
                            //Delete the item from the selected area
                            var idOfSelectList = "SelectList";
                            var idOfPickList = "PickList";
                            delIt(idOfSelectList,idOfPickList);
                        }
                        else if(result == 10)
                        {
                            $('div#cs_search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>Selected Satelite Site exists as a Stand Alone Site<br><br></span>");
                            //Delete the item from the selected area
                            var idOfSelectList = "SelectList";
                            var idOfPickList = "PickList";
                            delIt(idOfSelectList,idOfPickList);
                        }
                        else if(result == 11)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:blue;'>Facility updated<br><br></span>");
                            //Delete the item from the selected area
                            var idOfSelectList = "SelectList";
                            var idOfPickList = "PickList";
                            delIt(idOfSelectList,idOfPickList);
                        }


                     }
            }
        );

    }

    /*Stand Alone Sites*/
    else if(btn == 3)
    {
        $.ajax
        (
            { 
                type: "POST",   
                     url: "db/insertion/insert_sites.php",   
                     async: false,
                     data:{program:programPickOptions[programPickIndex].value,data:pickOptions[i].value,type:"StandAlone"},
                     success:function(result)
                     {
                        if(result == -1)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>An error occured. Reset and try again<br><br></span>");
                        }
                        else if(result == 0)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:green;'>Stand alone site inserted<br><br></span>");
                            //Delete the item from the selected area
                            var idOfSelectList = "SelectList";
                            var idOfPickList = "PickList";
                            delIt(idOfSelectList,idOfPickList);
                        }

                        else if(result == 1)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>Store exists<br><br></span>");
                            //Delete the item from the selected area
                            var idOfSelectList = "SelectList";
                            var idOfPickList = "PickList";
                            delIt(idOfSelectList,idOfPickList);
                        }

                        else if(result == 10)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>Facility exists as a central store<br><br></span>");
                            //Delete the item from the selected area
                            var idOfSelectList = "SelectList";
                            var idOfPickList = "PickList";
                            delIt(idOfSelectList,idOfPickList);
                        }
                        else if(result == 11)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:blue;'>Facility updated<br><br></span>");
                            //Delete the item from the selected area
                            var idOfSelectList = "SelectList";
                            var idOfPickList = "PickList";
                            delIt(idOfSelectList,idOfPickList);
                        }


                     }
            }
        );

    }
  }
  return true;
}

/*Function filterFacilities()*/
// Function to filter a facility typed in the search button
function filterFacilities(selectID,inputID)
{
    jQuery.fn.filterByText = function filterByText(textbox, selectSingleMatch) 
    {
        return this.each(function() 
        {
            var select = this;
            var options = [];

            $(select).find('option').each(function() 
            {
                options.push({value: $(this).val(), text: $(this).text()});
            });

            $(select).data('options', options);

            $(textbox).bind('change keyup', function() 
            {
                var options = $(select).empty().scrollTop(0).data('options');
                var search = $.trim($(this).val());
                var regex = new RegExp(search,'gi');

                $.each(options, function(i) 
                {
                    var option = options[i];
                    if(option.text.match(regex) !== null) 
                    {
                      $(select).append(
                         $('<option>').text(option.text).val(option.value)
                      );
                    }
                });

                if (selectSingleMatch === true && 
                $(select).children().length === 1) 
                {
                    $(select).children().get(0).selected = true;
                }
            });
        });
    };

    $('#'+selectID).filterByText($('#'+inputID), true);

}
// End function filterFacilities()
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/

/*Function updateSelectList()*/
//Use the DHIS2 Org Units to drill the list down
function updateSelectList(level,unit_id)
{
    var url = "db/fetch/get_facilities.php";
    $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");       
    $.getJSON
    (
        url,
        {id:unit_id,type:level},
        function(received)
        {
            $("select#SelectList").empty();
            for(var j=0; j<received.length;j++)
            {
                //alert(received[j].facility_name);
                $("<option id = 'options' VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("select#SelectList");
            }
            $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
        }
    );
 
}
/*End Function*/
/*--------------------------------------------------------------------------------------------------------------------------------*/