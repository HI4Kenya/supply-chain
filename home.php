    <?php
        // Require system config file
        require 'system/config.php';

        session_start();
        // Validate a user has logged in
        // If not logged in, redirect to the log in page
        if(!isset($_SESSION['login_id']))
        {
            header('Location:'.$base_path.'');
        }
    ?>
    <!-- Include header page -->
    <?php include "client/templates/header.php";?>

    <!-- This pages content -->
    <div class = "row" id = "row_body">

        <!-- Include default navigation -->
        <?php
            if($_SESSION["password_status"]!="NEW")
            {
                require "client/templates/navigation.php";
            }
        ?>

        <div class = "col-md-9" id = "col_body" style = "margin-left:2px;margin-top:-10px;border-radius:5px;width:;" id = 'content_div'>

                <?php
                    if($_SESSION["password_status"]=="NEW")
                    {
                        echo    "<div class='panel panel-default' style = 'background-color:;min-height:600px;margin-left:200px;width:100%'>";

                        echo    "<div class='panel-heading' id = 'returned_messages' style = 'height:50px;width:100%;color:blue'>
                                    <span style = 'color:green;margin-left:30px'> CHANGE YOUR PASSWORD<br>
                                        <span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>
                                            Update to a more secure and familiar password  
                                        </span>
                                    </span>
                                </div>";

                        echo    "<div class='row panel-body' id = 'facilities' style = 'margin-left:20px'>";

                                require "client/templates/changepassword.php";

                        echo    "</div>";

                        echo    "<span style = 'margin-right:px;margin-left:30px;padding:5px'>
                                    <span class = 'fa fa-external-link' style = 'color:blue'></span>   
                                    <a href='".$user_guide."' class = 'unclickedColor' target='_blank'>
                                        Help Center
                                    </a>
                                </span>
                                <span style ='color:black'>|</span>
                                <span class = 'fa fa-external-link' style = 'color:blue'></span>
                                <a href='".$documentation_url."' class = 'unclickedColor' target='_blank'>
                                    Read the Documentation
                                </a>";

                        echo    "</div>";
                    }
                    else
                    {
                        echo    "<div class='panel panel-default' style = 'background-color:white;min-height:600px'>";

                        echo    "<div id = 'supply_pipeline_heading' class='panel-heading' style = 'width:100%;height:50px;margin-bottom:30px'>
                                    <span>SUPPLY CHAIN HIERARCHY
                                        <span style ='color:black'>|</span>
                                        <span style = 'margin-right:10px;margin-top:0px;padding:5px'>
                                            <span class = 'fa fa-external-link' style = 'color:blue'></span>   
                                            <a href='".$user_guide."' class = 'unclickedColor' target='_blank'>
                                                Read the User Guide
                                            </a>
                                        </span>
                                    </span>                                                         
                                </div>";

                        echo    "<div class='panel-heading' id = 'returned_messages' style = 'height:50px;width:100%;margin-left:px;color:blue'>
                                    <span style ='margin-left:30px'>USER GUIDE</span>
                                </div>";

                        echo    "<!-- Append facilities here -->
                                <div class='row panel-body' id = 'facilities' style = 'margin-left:20px'>";

                                // Require user guide file
                                require "client/templates/userguide.php";
                                
                        echo    "</div>";

                        echo    "</div>";
                    }
                ?>
        </div>

    <!-- Include footer page -->
    <?php include "client/templates/footer.php";?> 