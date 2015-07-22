<div class="container-fluid" id="content">
    <div class="panel panel-success">
        <div class="panel-heading">
            <h2>Ministry Of Health</h2></br>
            <h3 id="formName"></h3></br>
            <label style="color:black"></label><span id="orgUnitName"></span>&nbsp;&nbsp;
            <label style="color:black">Level:</label><span id="orgUnitLevel"></span>&nbsp;&nbsp;
            <label style="color:black">Period:</label><span id="period"></span>
            <div id="loading">Loading</div>

            <div class="col-md-offset-10">
                <span>
                     <a  class="btn btn-success" download="list_of_patients_by_ordering_points.xls" href="#"
                        onclick="return ExcellentExport.excel(this, 'artReport', 'List of Patients By Ordering Points');">
                         <i></i>Download as Excel
                     </a>
                </span>
            </div>

        </div>
        <div class="panel-body" style="overflow: scroll">
            <table class="table table-responsive table-striped" id="artReport">
                <thead>
                <th>#</th>
                <th>MFL Code</th>
                <th>Name of Ordering Points</th>
                <th>Adult ART</th>
                <th>Adult PEP</th>
                <th>Adult PMTCT</th>
                <th>Paed ART</th>
                <th>Paed PEP</th>
                <th>Paed PMTCT</th>
                </thead>
                <tbody id="formData">

                </tbody>

            </table>
        </div>
    </div>

    <p>&nbsp;</p>

</div>
