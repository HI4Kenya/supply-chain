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
            <div id="loading">Loading...</div>

            <div class="col-md-offset-10">
                <span>
                     <a  class="btn btn-success" download="regimen_report.xls" href="#"
                         onclick="return ExcellentExport.excel(this, 'artReport', 'reportTitle');">
                         <i class="fa fa-file-excel-o"></i>Export
                     </a>
                </span>
            </div>

        </div>
        <div class="panel-body">
            <table class="table table-responsive table-striped dataTable" id="artReport">
                <thead>
                <th>#</th>
                <th>Data Elements</th>
                <th>Values</th>
                </thead>
                <tbody id="formData">
                </tbody>
            </table>
        </div>
    </div>

    <p>&nbsp;</p>

</div>
