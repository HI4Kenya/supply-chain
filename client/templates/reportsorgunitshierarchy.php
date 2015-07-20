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
        
    <!-- HIERARCHY BASED ON THE ORGANIZATION UNITS AS CAPTURED IN DHIS -->
    <div >
        <div id="collapseOrgUnits" class="panel-collapse collapse in" style = "font-size:8pt">
            <div class="panel-body">
                <p>
                    <span data-toggle="collapse" data-parent="#collapseOrgUnits" href="" style = "padding-left:5px">
                        <span class = "unclickedColor color" id = "level_kenya" value = "kenya" level = "national" onclick="javascript:selectFacility('level_kenya')">
                            <span>
                                Kenya
                            </span>
                        </span>
                    </span>
                    <a class="pull-left" data-toggle="collapse" data-parent="#collapseOrgUnits" href="#counties">
                        <span id = "closed_kenya" class="glyphicon glyphicon-plus-sign" onclick="javascript:changeIcon('closed_kenya')"></span>
                        <span id = "closed_folder_kenya" class="fa fa-folder-o"></span>
                    </a>
                </p>
                <div id="counties" class="panel-collapse collapse">
                    <div class="panel-body">
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
                                            <span data-toggle='collapse' data-parent='#".$row['county_id']."' class = 'unclickedColor color' id = 'county_".$row['county_id']."'
                                                style = 'padding-left:5px' onclick='javascript:selectFacility(\"county_".$row['county_id']."\")' value = '".$row['county_id']."'
                                                level = 'county'>"
                                            ."<span class = 'fa fa-folder-o'>"." ".$row["county_name"]."</span>".
                                            "</span>";

                                    echo "<a class='pull-left' data-toggle='collapse' data-parent='#".$row['county_id']."' href='#".$row['county_id']."'>
                                                <span class='glyphicon glyphicon-plus-sign' onclick='javascript:changeIcon()'></span>
                                            </a>
                                        </p>";

                                    echo "<div id='".$row['county_id']."' class='panel-collapse collapse'>
                                            <div class='panel-body'>";

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
                                                                <span data-toggle='collapse' data-parent='#".$data['sub_county_id']."' class = 'unclickedColor color' id = 'sub_county_".$data['sub_county_id']."'
                                                                    style = 'padding-left:5px' onclick='javascript:selectFacility(\"sub_county_".$data['sub_county_id']."\")' value = '".$row['county_id']."'
                                                                    level= 'sub_county'>"
                                                                ."<span class = 'fa fa-folder-o'>"." ".$data["sub_county_name"]."</span>".
                                                                "</span>";

                                                        echo "<a class='pull-left' data-toggle='collapse' data-parent='#".$data['sub_county_id']."' href='#".$data['sub_county_id']."'>
                                                                    <span class='glyphicon glyphicon-plus-sign' onclick='javascript:changeIcon()'></span>
                                                                </a>
                                                            </p>";
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