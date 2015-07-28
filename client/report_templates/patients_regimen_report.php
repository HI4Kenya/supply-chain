<div class="container-fluid" id="content">
    <div class="panel panel-success">
        <div class="panel-heading">
            <h2>Ministry Of Health</h2></br>
            <h3 id="formName"></h3></br>
            <div id="reportTitle">
                <label style="color:black">LEVEL:</label><span id="orgUnitLevel"></span>&nbsp;&nbsp;-
                <label style="color:black"></label><span id="orgUnitName"></span>&nbsp;&nbsp;
                <label style="color:black">PERIOD:</label><span id="period"></span>
            </div>
        </div>
        <div class="panel-body" style="overflow: scroll">
            <table class="table table-responsive table-striped">
                <thead>
                <th>Category</th>
                <th>Total</th>
                </thead>
                <tbody id="formData">

                </tbody>

            </table>
        </div>
    </div>

    <p>&nbsp;</p>

</div>

var data =  "<div class='panel panel-default' style = 'margin-left:-30px;margin-top:0px'>"+
                        "<div class='panel-heading' style = 'color:black'>"+
                            "<span class='panel-title' id='reportTitle' style = 'font-family:font awesome'>"+
                                "<span>Program: "+
                                    "<span id = 'program_name' style = 'color:green;font-size:11pt'></span>"+
                                "</span><br>"+
                                "<span>Pipeline: "+
                                    "<span style = 'font-size:11pt;color:green'>KEMSA</span>"+
                                "</span><br>"+
                                "<span>Report: "+
                                    "<span style = 'font-size:11pt;color:green'>Patients by Regimen Report</span>"+
                                "</span><br>"+
                                "<span>Level: "+
                                    "<span id = 'report_level' style = 'font-size:11pt;color:green'></span>"+
                                "</span><br>"+
                                "<span>Date Generated: <span style = 'color:green;font-size:11pt'>"+dateGenerated+"</span></span><br>"+
                            "</span>"+                             
                        "</div>"+

                        "<table class = 'table table-responsive table-striped' style = 'border-radius:5px;width:95%;margin-top:20px'>"+
                            "<thead>"+
                                "<th style = 'font-weight:bold'>Category</th>"+
                                "<th style = 'font-weight:bold'>Totals</th>"+                            
                            "</thead>"+
                            "<tbody id = 'formData'>"+
                            "</tbody>"+
                        "</table>"+
                    "</div>";