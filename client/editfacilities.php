<?php include "templates/header.php";?>    

    <script>
        $(function() 
        {

            for(var count =201;count<=270;count++)
            {
                var url = "http://test.hiskenya.org/api/organisationUnits.jsonp?page="+count+"&callback=?";
                $.getJSON( url, 
                function(data) 
                {
                    $.each(data.organisationUnits, function(s, values) 
                    {
                        var query = values.href+".jsonp?callback=?";
                        $.getJSON( query, 
                        function(response)
                        {
                            if(response.level==4)
                            {
                                $.post
                                (
                                    '../db/insertion/edit_facilities.php',
                                    {id:response.id,name:response.name,parent:response.parent.id},
                                    function(message)
                                    {
                                        if(message == 0)
                                        {
                                            //alert("SUCCESS");
                                            var tblRow = "<tr>" + "<td style = 'color:blue;font-weight:bold'>" + response.id + "</td>" + "<td>" + response.name + "</td>" + "<td style = 'color:green'>" + "INSERTED" + "</td>" + "</tr>"
                                            $(tblRow).appendTo("#entrydata tbody");
                                            $(function()
                                            {
                                                $("#entrydata").dataTable();
                                            })
                                        }

                                        else if(message == 10)
                                        {
                                            //alert("SUCCESS");
                                            var tblRow = "<tr>" + "<td style = 'color:blue;font-weight:bold'>" + response.id + "</td>" + "<td>" + response.name + "</td>" + "<td style = 'color:blue'>" + "EDITED" + "</td>" + "</tr>"
                                            $(tblRow).appendTo("#entrydata tbody");
                                            $(function()
                                            {
                                                $("#entrydata").dataTable();
                                            })
                                        }

                                        else if(message == 1)
                                        {
                                            //alert("EXISTS");
                                            var tblRow = "<tr>" + "<td style = 'color:blue;font-weight:bold'>" + response.id + "</td>" + "<td>" + response.name + "</td>" + "<td style = 'color:orange'>" + "EXISTS" + "</td>" + "</tr>"
                                            $(tblRow).appendTo("#entrydata tbody");
                                            $(function()
                                            {
                                                $("#entrydata").dataTable();
                                            })
                                        }

                                        else if(message == -1)
                                        {
                                            //alert("ERROR");
                                            var tblRow = "<tr>" + "<td style = 'color:blue;font-weight:bold'>" + response.id + "</td>" + "<td>" + response.name + "</td>" + "<td style = 'color:red'>" + "ERROR" + "</td>" + "</tr>"
                                            $(tblRow).appendTo("#entrydata tbody");
                                            $(function()
                                            {
                                                $("#entrydata").dataTable();
                                            })
                                        }
                                    }
                                );
                            }

                        });

                    });

                    $(function()
                    {
                        $("#entrydata").dataTable();
                    })
                });

            }
        });
    </script>

    <div class = "row">
        <div class = "col-md-11" style = "margin-left:30px;margin-top:10px;border-radius:5px">
            <div class="panel panel-default">
                <div class="panel-heading">                                
                    <h3 class="panel-title">DHIS2 Facilities</h3>                              
                </div>

                <div class="panel-body">
                    <table id= "entrydata" style = "border-radius:5px">
                        <thead>
                            <th style = "font-weight:bold">ID</th>
                            <th style = "font-weight:bold">Name</th>  
                            <th style = "font-weight:bold">Status</th>                                
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
<?php include "templates/footer.php";?>  