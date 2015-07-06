<!--Default Navigation -->
<div class = "col-md-2" style = "margin-left:10px;margin-top:-10px;border-radius:5px;max-height:600px; overflow:scroll;">
    <div>
        <!--begin collapsible-->  
        <div>
            <!-- BEGIN LOGGED IN USER DETAILS -->
            <div class="panel-default" style = 'border:1px solid green;height:15%;border-radius:3px'>
                <div class="panel-body">
                    <span class="fa fa-user" style = "color:blue"></span>
                    <span style ="color:blue;margin-right:10px;">
                        <?php echo $_SESSION["name"]."";?>
                    </span> 
                    <br>
                    <span style ="color:;margin-right:10px;">
                        <?php echo $_SESSION["user_role"];?>
                    </span>
                    <br>
                    <span class="fa fa-edit unclickedColor" onclick="javascript:updateUserProfile('<?php echo $_SESSION["user_id"];?>','<?php echo $_SESSION["name"];?>')"></span>
                    <span class = "unclickedColor"><a style ='color:red' onclick="javascript:updateUserProfile('<?php echo $_SESSION["user_id"];?>','<?php echo $_SESSION["name"];?>')">(update profile!)</a></span>
                    <br>
                    <div style = "margin-top:5px">
                        <span class="fa fa-cog unclickedColor" onclick="javascript:changePassword('<?php echo $_SESSION["name"];?>')"></span>
                        <span class="fa fa-power-off unclickedColor" style ="margin-left:5px" onclick="javascript:userSignout();"></span>
                    </div>            
                </div>
            </div>
             <!-- END LOGGED IN USER DETAILS -->
            <br>

            <div class="panel-group" id="accordion" style = "cursor:auto">               
                <?php
                    if($_SESSION["user_role"]=="ADMIN")
                    {
                        echo "<!--USERS -->
                                <div class='panel panel-default'>
                                    <div class='panel-heading'>
                                        <p>
                                            <a data-toggle='collapse' data-parent='#accordion' href='#collapseUsers' style = 'padding-left:5px'>USERS</a>
                                            <a class='pull-left'  data-toggle='collapse' data-parent='#accordion' href='#collapseUsers'>
                                                <span class='fa fa-users' onclick='javascript:changeIcon()'></span>
                                            </a>
                                        </p>
                                    </div>
                                    <div id='collapseUsers' class='panel-collapse collapse'>
                                        <div class='panel-body'>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:createUsers(\"details\")'>
                                                Create
                                            </div>
                                            <br>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:getUsers(\"update\")'>
                                                Update
                                            </div>                            
                                        </div>
                                    </div>
                                </div>
                                <!-- END USERS -->";

                        echo "<!--PROGRAMS -->
                                <div class='panel panel-default'>
                                    <div class='panel-heading'>
                                        <p>
                                            <a data-toggle='collapse' data-parent='#accordion' href='#collapsePrograms' style = 'padding-left:5px'>PROGRAMS</a>
                                            <a class='pull-left'  data-toggle='collapse' data-parent='#accordion' href='#collapsePrograms'>
                                                <span class='fa fa-briefcase' onclick='javascript:changeIcon()'></span>
                                            </a>
                                        </p>
                                    </div>
                                    <div id='collapsePrograms' class='panel-collapse collapse'>
                                        <div class='panel-body'>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:createPrograms()'>
                                                Create
                                            </div>
                                            <br>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:getPrograms(\"update\")'>
                                                Update
                                            </div>                            
                                        </div>
                                    </div>
                                </div>
                                <!-- END PROGRAMS -->";

                        echo "<!-- CLASSIFY FACILITIES -->
                                <div class='panel panel-default'>
                                    <div class='panel-heading'>
                                        <p>
                                            <a data-toggle='collapse' data-parent='#accordion' href='#collapseFacilities' style = 'padding-left:5px'>CLASSIFY</a>
                                            <a class='pull-left' data-toggle='collapse' data-parent='#accordion' href='#collapseFacilities'>
                                                <span class='fa fa-pencil-square-o' onclick='javascript:changeIcon()'></span>
                                            </a>
                                        </p>
                                    </div>
                                    <div id='collapseFacilities' class='panel-collapse collapse'>
                                        <div class='panel-body'>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:classifyFacilities(1)' data-toggle='collapse' data-parent='#accordion' href='#collapseOrgUnits'>
                                                Central Sites
                                            </div>
                                            <br>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:classifyFacilities(2)' data-toggle='collapse' data-parent='#accordion' href='#collapseOrgUnits'>
                                                Satellite Sites
                                            </div>
                                            <br>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:classifyFacilities(3)' data-toggle='collapse' data-parent='#accordion' href='#collapseOrgUnits'>
                                                Stand Alones
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- END CLASSIFY FACILITIES -->";

                        echo "<!-- UPDATES -->
                                <div class='panel panel-default'>
                                    <div class='panel-heading'>
                                        <p>
                                            <a data-toggle='collapse' data-parent='#accordion' href='#collapseUpdates' style = 'padding-left:5px'>UPDATES</a>
                                            <a class='pull-left' data-toggle='collapse' data-parent='#accordion' href='#collapseUpdates'>
                                                <span class='fa fa-download' onclick='javascript:changeIcon()'></span>
                                            </a>
                                        </p>
                                    </div>
                                    <div id='collapseUpdates' class='panel-collapse collapse'>
                                        <div class='panel-body'>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:getData(2)'>
                                                Counties
                                            </div>
                                            <br>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:getData(3)'>
                                                Sub Counties
                                            </div>
                                            <br>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:getData(4)'>
                                                Facilities
                                            </div>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:getData(\"datasets\")'>
                                                Data Sets
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- END UPDATES -->";

                        echo "<!-- DATA ADMINISTRATION -->
                                <div class='panel panel-default'>
                                    <div class='panel-heading'>
                                        <p>
                                            <a data-toggle='collapse' data-parent='#accordion' href='#collapseDataAdministration' style = 'padding-left:5px'>ADMINISTRATION</a>
                                            <a class='pull-left' data-toggle='collapse' data-parent='#accordion' href='#collapseDataAdministration'>
                                                <span class='fa fa-cogs' onclick='javascript:changeIcon()'></span>
                                            </a>
                                        </p>
                                    </div>
                                    <div id='collapseDataAdministration' class='panel-collapse collapse'>
                                        <div class='panel-body'>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:getUsers(\"administration\")'>
                                                Users
                                            </div>
                                            <br>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:getPrograms(\"administration\");'>
                                                Programs
                                            </div> 
                                            <br>
                                            <div class = 'btn btn-default btn-md' style = 'margin-bottom:5px; width:100%' onclick='javascript:getSupplyHierarchy();'>
                                                Supply Hierarchy
                                            </div> 
                                            <br>
                                        </div>
                                    </div>
                                </div>
                                <!-- END DATA ADMINISTRATION-->";
                    }
                ?>

                <!-- REPORTS -->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <p>
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseReports" style = "padding-left:5px">REPORTS</a>
                            <a class="pull-left" data-toggle="collapse" data-parent="#accordion" href="#collapseReports">
                                <span class="fa fa-newspaper-o" onclick="javascript:changeIcon()"></span>
                            </a>
                        </p>
                    </div>
                    <div id="collapseReports" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class = "btn btn-default btn-md" style = "margin-bottom:5px; width:100%" onclick="javascript:getUsers('report')">
                                Users
                            </div>
                            <br>
                            <div class = "btn btn-default btn-md" style = "margin-bottom:5px; width:100%" onclick="javascript:getPrograms('report')">
                                Programs
                            </div>
                            <div class = "btn btn-default btn-md" style = "margin-bottom:5px; width:100%" onclick="javascript:hierarchyReport()">
                                Supply Hierarchy
                            </div>
                            <br>
                            <div class = "btn btn-default btn-md" style = "margin-bottom:5px; width:100%" onclick="javascript:getAnalytics()">
                                Data Set Report
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END REPORTS -->

            </div>
        </div>   
        <!-- end collapsible--> 
    </div>
</div>
<!-- Default Navigation -->