/*Function to get data from DHIS2 web API and insert into the database*/
function getData(level) 
{
    if(level == "datasets")
    {
        var url = "api/get_datasets.php";

        var itemUpdating = "Datasets";

        $('div#returned_messages').html("<span class = 'fa fa-exclamation-triangle' style = 'color:blue;'> Fetching "+itemUpdating+". This may take a while </span>");
        $('div#facilities').html("<img src='assets/img/loading.gif' style = 'height:500px:width:80%'>");
        $.ajax
        ({
            type: 'GET',
            url: url,
            data:{level:level},
            dataType: 'json',
            contentType: 'application/json',
            success: function(data) 
            {
                if(data == 0)
                {
                    $('div#returned_messages').html("<span class = 'fa fa-check-square' style = 'color:green;'> Update Finished Successfully</span>");
                                
                    // Fetch the number of facilities
                    var status_url = "db/fetch/system_status.php";  
                    $.getJSON
                    (
                        status_url,
                        {level:level},
                        function(status)
                        {
                            $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+status.length+" "+itemUpdating+" found</span>");  
                        }
                    );

                }
                else if(data == -1)
                {
                    $('div#returned_messages').html("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> An error has occured. Refresh and try again</span>");
                    $('div#facilities').empty();
                    $('div#facilities').html("<span class = 'fa fa-exclamation-triangle' style = 'color:blue;'> Check your internet connection.</span>");
                }
            },

            error:function(err)
            {
                console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
                $('div#returned_messages').html("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> CONNECTION ERROR</span>");
                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:brown;'>Ensure your connection to <a href = 'http://test.hiskenya.org' target='_blank'>DHIS2</a> is working</span>");
            }
        });
    }

    else
    {
        var url = "api/get_organisation_units.php";

        var itemUpdating;
        if(level == 4)
        {
            itemUpdating = "Facilities";
        }
        else if(level == 3)
        {
            itemUpdating = "Sub-Counties";
        }
        else if(level == 2)
        {
            itemUpdating = "Counties";
        }

        $('div#returned_messages').html("<span class = 'fa fa-exclamation-triangle' style = 'color:blue;'> Fetching "+itemUpdating+". This may take a while </span>");
        $('div#facilities').html("<img src='assets/img/loading.gif' style = 'height:500px:width:80%'>");
        $.ajax
        ({
            type: 'GET',
            url: url,
            data:{level:level},
            dataType: 'json',
            contentType: 'application/json',
            success: function(data) 
            {
                if(data == 0)
                {
                    $('div#returned_messages').html("<span class = 'fa fa-check-square' style = 'color:green;'> Update Finished Successfully</span>");
                                
                    // Fetch the number of facilities
                    var status_url = "db/fetch/system_status.php";  
                    $.getJSON
                    (
                        status_url,
                        {level:level},
                        function(status)
                        {
                            $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+status.length+" "+itemUpdating+" found</span>");  
                        }
                    );

                }
                else if(data == -1)
                {
                    $('div#returned_messages').html("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> An error has occured. Refresh and try again</span>");
                    $('div#facilities').empty();
                    $('div#facilities').html("<span class = 'fa fa-exclamation-triangle' style = 'color:blue;'> Check your internet connection.</span>");
                }
            },
            error:function()
            {
                $('div#returned_messages').html("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> CONNECTION ERROR</span>");
                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:brown;'>Ensure your connection to <a href = 'http://test.hiskenya.org' target='_blank'>DHIS2</a> is working</span>");
            }
        });
    }
}
/*End of function*/
/*--------------------------------------------------------------------------------------------------------------------------------*/