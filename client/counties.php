<?php include "templates/header.php";?>  

    <script>
        $(function() 
        {

            for(var count =1;count<=20;count++)
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
                            if(response.level==2)
                            {
                                $.post
                                (
                                    '../db/insertion/insert_counties.php',
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
        <!-- Include default navigation -->
        <?php require "templates/navigation.php";?>

        <div class = "col-md-8" style = "margin-left:10px;margin-top:10px;border-radius:5px">
            <div class="panel panel-default">
                <div class="panel-heading">                                
                    <h3 class="panel-title">DHIS2 Counties</h3>                              
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
<?php include "templates/footer.php";?>  