    <?php
        // Require system config file
        require '../../system/config.php';

        session_start();
        // Validate a user has logged in
        // If not logged in, redirect to the log in page
        if(!isset($_SESSION['login_id']))
        {
            header('Location:'.$base_path.'');
        }
    ?>
    <script>
        $().ready(function() {
            var $scrollingDiv = $("#scrollingDiv");

            $(window).scroll(function(){
                $scrollingDiv
                    .stop()
                    .animate({"marginTop": ($(window).scrollTop() + 5) + "px"}, "slow" );
            });
        });
    </script>

    <div id="scrollingDiv" style = "margin-left:10px;margin-top:-10px;border-radius:5px;max-height:350px;width:25%; overflow:scroll;">
        
        <!-- HIERARCHY BASED ON THE ORGANIZATION UNITS AS CAPTURED IN DHIS -->
        <div class="panel panel-default">
            <div class="panel-heading">
                <p>
                    <span class = "unclickedColor" data-toggle="collapse" data-parent="#" href="#collapseOrgUnits" style = "padding-left:5px">ORGANIZATION UNITS</span>
                    <a class="pull-left" data-toggle="collapse" data-parent="#accordion" href="#collapseOrgUnits">
                        <span class="fa fa-sitemap" onclick="javascript:changeIcon()"></span>
                    </a>
                </p>
            </div>
            <div id="collapseOrgUnits" class="panel-collapse collapse in" style = "font-size:8pt">
                <div class="panel-body">
                    <p>
                        <span data-toggle="collapse" data-parent="#collapseOrgUnits" href="" style = "padding-left:5px">
                            <span class = "unclickedColor color" onclick="javascript:updateSelectList(1)">
                                <span id = "folder_kenya" class="fa fa-folder-o unclickedColor">
                                    Kenya
                                </span>
                            </span>
                        </span>
                        <a class="pull-left" data-toggle="collapse" data-parent="#collapseOrgUnits" href="#counties">
                            <span id = "closed_kenya" class="glyphicon glyphicon-plus-sign unclickedColor" onclick="javascript:changeIcon('closed_kenya','folder_kenya')">
                            </span>
                        </a>
                    </p>
                    <div id="counties" class="panel-collapse collapse">
                        <div class="panel-body" style = 'margin-top:-15px'>
                            <?php
                                require "../../db/db_auth/db_con.php";

                                //Color code :#23527C
                                //Fetch counties
                                $county = "SELECT * FROM counties ORDER BY county_name";
                                $result = mysqli_query($conn,$county);
                                if(mysqli_num_rows($result)>0)
                                {
                                    while($row = mysqli_fetch_assoc($result)) 
                                    {
                                        //class = 'unclickedColor color' onclick='javascript:changeColor()'
                                        $c_id = $row['county_id'];
                                        echo "<p style = 'font:8pt'>
                                                <span data-toggle='collapse' data-parent='#".$row['county_id']."' class = 'unclickedColor' style = 'padding-left:5px' onclick='javascript:updateSelectList(2,\"$c_id\")'>"
                                                ."<span id = 'closed_county_folder".$row['county_id']."' class = 'fa fa-folder-o unclickedColor'>"." ".$row["county_name"]."</span>".
                                                "</span>";
                                        echo "<a class='pull-left' data-toggle='collapse' data-parent='#".$row['county_id']."' href='#".$row['county_id']."'>
                                                    <span id = 'closed_county_".$row['county_id']."' class='glyphicon glyphicon-plus-sign unclickedColor' 
                                                    onclick='javascript:changeIcon(\"closed_county_".$row['county_id']."\",\"closed_county_folder".$row['county_id']."\")'></span>
                                                </a>
                                            </p>";

                                        echo "<div id='".$row['county_id']."' class='panel-collapse collapse'>
                                                <div class='panel-body' style = 'margin-top:-15px'>";

                                                /* LOGIC UNDER COUNTIES GOES IN HERE */

                                                    //Fetch subcounties of the current county
                                                    //Using a WHERE comparison
                                                    $county_id = $row['county_id'];
                                                    $sub_county = "SELECT * FROM sub_counties WHERE parent_id = '$county_id' ORDER BY sub_county_name";
                                                    $response = mysqli_query($conn,$sub_county);
                                                    if(mysqli_num_rows($response)>0)
                                                    {
                                                        while ($data = mysqli_fetch_assoc($response))
                                                        {
                                                            $sc_id = $data['sub_county_id'];

                                                            echo "<p>
                                                                    <span data-toggle='collapse' data-parent='#".$data['sub_county_id']."' class = 'unclickedColor' style = 'padding-left:5px' onclick='javascript:updateSelectList(3,\"$sc_id\")'>"
                                                                    ."<span id = 'closed_sub_county_folder_".$data['sub_county_id']."' class = 'fa fa-folder-o unclickedColor'>"." ".$data["sub_county_name"]."</span>".
                                                                    "</span>";
                                                            echo "<a class='pull-left' data-toggle='collapse' data-parent='#".$data['sub_county_id']."' href='#".$data['sub_county_id']."'>
                                                                        <span id = 'closed_sub_county_".$data['sub_county_id']."' class='glyphicon glyphicon-plus-sign unclickedColor' 
                                                                        onclick='javascript:changeIcon(\"closed_sub_county_".$data['sub_county_id']."\",\"closed_sub_county_folder_".$data['sub_county_id']."\")'></span>
                                                                    </a>
                                                                </p>";

                                                            echo "<div id='".$data['sub_county_id']."' class='panel-collapse collapse'>
                                                                    <div class='panel-body' style = 'margin-top:-15px'>";

                                                                    /* LOGIC UNDER SUB-COUNTIES GOES IN HERE */
                                                                    //Fetch facilities under the current sub county
                                                                    $sub_county_id = $data['sub_county_id'];
                                                                    $facility = "SELECT * FROM facilities WHERE parent_id = '$sub_county_id' ORDER BY facility_name";
                                                                    $return= mysqli_query($conn,$facility);
                                                                    if(mysqli_num_rows($return)>0)
                                                                    {
                                                                        while ($facilities = mysqli_fetch_assoc($return))
                                                                        {
                                                                            $f_id = $facilities['facility_id'];
                                                                            echo "<span onclick='javascript:updateSelectList(4,\"$f_id\")' class = 'unclickedColor color'>";
                                                                            echo "<span class = 'fa fa-university' style = 'margin-bottom:5px'>"." ".$facilities['facility_name']."</span>";
                                                                            echo "<br>";
                                                                            echo "</span>";
                                                                        }
                                                                    }
                                                            echo    "</div>
                                                                </div>";
                                                        }
                                                    }
                                        echo    "</div>
                                            </div>";
                                    }
                                }    
                                mysqli_close($conn);
                            ?>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- END HIERARCHY BASED ON THE ORGANIZATION UNITS AS CAPTURED IN DHIS -->
        
    </div>