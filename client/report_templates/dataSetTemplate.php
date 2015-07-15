<div class="container-fluid" id="content">
    <div class="panel panel-success">
        <div class="panel-heading">
            <h2>Ministry Of Health</h2></br>
            <h3 id="formName"></h3></br>
            <label style="color:black">Facility Name:</label><span id="facility_detail"></span>&nbsp;&nbsp;
            <label style="color:black">Master Facility Code:</label><span id="facility_id"></span>&nbsp;&nbsp;
            <label style="color:black">Period of Reporting:</label><span id="reportingperiod"></span>
            
            <?php
                if(($_SESSION["user_role"]=="WRITE")||($_SESSION["user_role"]=="ADMIN"))
                {
                    echo "<div class='col-md-offset-8'>
                            <button class='btn btn-success post-data'>Post Data</button>
                         </div>";
                }
            ?>

            <div id="loading"></div>
            <div id="post-log"></div>
        </div>
        <div class="panel-body" style="overflow: scroll" id="formData">
        </div>
    </div>

    <p>&nbsp;</p>

</div>
