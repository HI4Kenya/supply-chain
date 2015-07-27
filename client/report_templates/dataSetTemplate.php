<div class="container-fluid" id="content">
    <div class="panel panel-success">
        <div class="panel-heading">
            <h2>Ministry Of Health</h2></br>
            <h3 id="formName"></h3></br>
            <label style="color:black">Facility Name:</label><span id="facility_detail"></span>&nbsp;&nbsp;
            <label style="color:black">Master Facility Code:</label><span id="facility_id"></span>&nbsp;&nbsp;
            <label style="color:black">Period of Reporting:</label><span id="reportingperiod"></span>

            <?php
                session_start();
                if(($_SESSION["user_role"]=="WRITE")||($_SESSION["user_role"]=="ADMIN"))
                {
                    echo "<div class='col-md-offset-9'>
                            <button class='btn btn-success' type = 'button' data-toggle = 'modal' data-target = '#dhis_credentials'>
                                Post Aggregated Values to DHIS
                            </button>
                         </div>";
                }
            ?>

            <div id="loading"></div>
            <div id="post-log"></div>
        </div>
        <div class="panel-body" style="overflow: scroll" id="formData">
        </div>
    </div>

    <!-- Post back credentials modal -->
    <div id = 'dhis_credentials' class = 'modal fade' role = 'dialog' data-backdrop="static" data-keyboard="false" >
        <div class = 'modal-dialog'>
            <!-- Content -->
            <div class = 'modal-content'>
                <!-- Header -->
                <div class = 'modal-header'>
                    <button type = 'button' class ='close' data-dismiss = 'modal'>&times;</button>
                    <h5 class = 'modal-title' id = 'dhis_credentials_header'>Enter your DHIS2 Credentials</h5>
                </div>

                <!-- Body -->
                <div class = 'modal-body'>
                    <form name = 'dhis_user_credentials' onsubmit = 'return false;'>
                        <div class=''>
                            <div class='form-group' style = 'width:40%'>
                                <span style = 'color;padding:5px'>DHIS Username:</span>
                                <input id = 'dhis_username' type='text' class='form-control' placeholder='DHIS Username' style = 'margin-top:-25px;margin-left:150px'>
                                </input>
                            </div>
                            <div class='form-group' style = 'width:40%'>
                                <span style = 'color;padding:5px'>DHIS Password:</span>
                                <input id = 'dhis_password' type='password' class='form-control' placeholder='DHIS Password' style = 'margin-top:-25px;margin-left:150px'>
                            </div>
                        </div>
                        <button class='btn btn-success post-data' type = 'submit' style = 'margin-top:5px;margin-left:300px'>
                            Submit
                        </button>
                    </form>
                </div>

                <!-- Footer -->
                <div class = 'modal-footer'>
                    <button type = 'submit' class ='btn btn-danger' data-dismiss = 'modal'>Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <p>&nbsp;</p>

</div>
