/*Function to get data from DHIS2 web API and insert into the database*/
function getData(level) 
{
    if(level == "datasets")
    {
        //Fetch Datasets from DHIS2
        var url = "http://test.hiskenya.org/api/dataSets.jsonp?paging=false&callback=?";
        $.ajax
        ({
            type: 'GET',
            url: url,
            dataType: 'json',
            contentType: 'application/json',
            success: function (receivedValues) 
            {
                $.each(receivedValues.dataSets, function(number,datavalues) 
                {        
                    // Insert these datasets into the local db
                    $('div#returned_messages').html("<span class = 'fa fa-exclamation-triangle' style = 'color:blue;'> Fetching DataSets. This may take a while <img src='assets/img/ajax-loader-3.gif'></span>");
                    $.post
                    (
                        'db/insertion/insert_datasets.php',
                        {id:datavalues.id,name:datavalues.name,href:datavalues.href,code:datavalues.code,},
                        function(statusMessage)
                        {
                            if(statusMessage == 0)
                            {
                                $('div#facilities').html("<span class = 'fa fa-check-square' style = 'color:blue;'>"+datavalues.name+" Inserted</span>");
                            }

                            else if(statusMessage == 1)
                            {
                                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:green;'>"+datavalues.name+" Found</span>");
                            }

                            else if(statusMessage == 10)
                            {
                                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:green;'>"+datavalues.name+" updated</span>");
                            }

                            else if(statusMessage == -1)
                            {
                                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:red;'>Error. "+datavalues.name+" not inserted</span>");
                            }
                        }
                    );

                    $('div#returned_messages').html("<span class = 'fa fa-check-square' style = 'color:green;'> Update Finished Successfully</span>");
                    // Fetch the number of facilities
                    var status_url = "db/fetch/system_status.php";  
                    $.getJSON
                    (
                        status_url,
                        {level:'datasets'},
                        function(status)
                        {
                            $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+status.length+" Datasets found</span>");
                            for(var j=0; j<status.length;j++)
                            {
                                //$('span#note').html("Loading <img src='assets/img/ajax-loader.gif'>");   
                                //$("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("div#facilities");
                            }   
                        }
                    );
                });

            },
            error: function () 
            {
                $('div#returned_messages').html("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> CONNECTION ERROR</span>");
                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:brown;'>Ensure you are logged in to <a href = 'http://test.hiskenya.org' target='_blank'>DHIS2</a></span>");
            }
        });
    }

    else
    {
        var count=1
        for(count =1;count<=20;count++)
        {
            var url = "http://test.hiskenya.org/api/organisationUnits.jsonp?page="+count+"&callback=?";
            $.ajax
            ({
                type: 'GET',
                url: url,
                dataType: 'json',
                contentType: 'application/json',
                success: function(data) 
                {
                    $.each(data.organisationUnits, function(s, values) 
                    {
                        var query = values.href+".jsonp?callback=?";
                        $.getJSON( query, 
                        function(response)
                        {
                            if(level==4)
                            {
                                $('div#returned_messages').html("<span class = 'fa fa-exclamation-triangle' style = 'color:blue;'> Fetching facilities. This may take a while <img src='assets/img/ajax-loader-3.gif'></span>");
                                if(response.level==4)
                                {
                                    $.post
                                    (
                                        'db/insertion/insert_facilities.php',
                                        {id:response.id,name:response.name,parent:response.parent.id,mfl_code:response.code},
                                        function(message)
                                        {
                                            if(message == 0)
                                            {
                                                $('div#facilities').html("<span class = 'fa fa-check-square' style = 'color:blue;'>"+response.name+" Inserted</span>");
                                            }

                                            else if(message == 1)
                                            {
                                                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:green;'>"+response.name+" Found</span>");
                                            }

                                            else if(message == 10)
                                            {
                                                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+response.name+" Updated</span>");
                                            }

                                            else if(message == -1)
                                            {
                                                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:red;'>Error. "+response.name+" not inserted</span>");
                                            }
                                        }
                                    );

                                    $('div#returned_messages').html("<span class = 'fa fa-check-square' style = 'color:green;'> Update Finished Successfully</span>");
                                    
                                    // Fetch the number of facilities
                                    var status_url = "db/fetch/system_status.php";  
                                    $.getJSON
                                    (
                                        status_url,
                                        {level:4},
                                        function(status)
                                        {
                                            $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+status.length+" Facilities found</span>");
                                            for(var j=0; j<status.length;j++)
                                            {
                                                //$('span#note').html("Loading <img src='assets/img/ajax-loader.gif'>");   
                                                //$("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("div#facilities");
                                            }   
                                        }
                                    );
                                }

                            }

                            else if(level == 3)
                            {
                                $('div#returned_messages').html("<span class = 'fa fa-exclamation-triangle' style = 'color:blue;'> Fetching sub counties. This may take a while <img src='assets/img/ajax-loader-3.gif'></span>");
                                if(response.level==3)
                                {
                                    $.post
                                    (
                                        'db/insertion/insert_sub_counties.php',
                                        {id:response.id,name:response.name,parent:response.parent.id},
                                        function(message)
                                        {
                                            if(message == 0)
                                            {
                                                $('div#facilities').html("<span class = 'fa fa-check-square' style = 'color:blue;'>"+response.name+" Inserted</span>");
                                            }

                                            else if(message == 1)
                                            {
                                                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:green;'>"+response.name+" Found</span>");
                                            }

                                            else if(message == 10)
                                            {
                                                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+response.name+" Updated</span>");
                                            }

                                            else if(message == -1)
                                            {
                                                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:red;'>Error</span>");
                                            }
                                        }
                                    );
                                    
                                    $('div#returned_messages').html("<span class = 'fa fa-check-square' style = 'color:green;'> Update Finished Successfully</span>");
                                    
                                    // Fetch the number of sub counties
                                    var status_url = "db/fetch/system_status.php";  
                                    $.getJSON
                                    (
                                        status_url,
                                        {level:3},
                                        function(status)
                                        {
                                            $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+status.length+" Sub Counties found</span>");
                                            for(var j=0; j<status.length;j++)
                                            {
                                                // $('span#note').html("Loading <img src='assets/img/ajax-loader.gif'>");   
                                                // $("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("div#facilities");
                                            }   
                                        }
                                    );
                                }

                            }

                            else if(level == 2)
                            {
                                $('div#returned_messages').html("<span class = 'fa fa-exclamation-triangle' style = 'color:blue;'> Fetching counties. This may take a while <img src='assets/img/ajax-loader-3.gif'></span>");
                                if(response.level==2)
                                {
                                    $.post
                                    (
                                        'db/insertion/insert_counties.php',
                                        {id:response.id,name:response.name,parent:response.parent.id},
                                        function(message)
                                        {
                                            //alert(message);
                                            if(message == 0)
                                            {
                                                $('div#facilities').html("<span class = 'fa fa-check-square' style = 'color:blue;'>"+response.name+" Inserted</span>");
                                            }

                                            else if(message == 1)
                                            {
                                                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:green;'>"+response.name+" Found</span>");
                                            }

                                            else if(message == 10)
                                            {
                                                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+response.name+" Updated</span>");
                                            }

                                            else if(message == -1)
                                            {
                                                $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:red;'>Error</span>");
                                            }
                                        }
                                    );
                                    
                                    $('div#returned_messages').html("<span class = 'fa fa-check-square' style = 'color:green;'> Update Finished Successfully</span>");
                                    
                                    // Fetch the number of counties
                                    var status_url = "db/fetch/system_status.php";  
                                    $.getJSON
                                    (
                                        status_url,
                                        {level:2},
                                        function(status)
                                        {
                                            $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+status.length+" Counties found</span>");
                                            for(var j=0; j<status.length;j++)
                                            {
                                                // $('span#note').html("Loading <img src='assets/img/ajax-loader.gif'>");   
                                                // $("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("div#facilities");
                                            }   
                                        }
                                    );
                                }

                            }

                        });

                    });
                },
                error: function () 
                {
                    $('div#returned_messages').html("<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> CONNECTION ERROR</span>");
                    $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:brown;'>Ensure you are logged in to <a href = 'http://test.hiskenya.org' target='_blank'>DHIS2</a></span>");
                }
            });
        }

    }
}
/*End of function*/
/*--------------------------------------------------------------------------------------------------------------------------------*/