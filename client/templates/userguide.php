<?php

    if($_SESSION["user_role"]=="ADMIN")
    {
        echo "<div class = 'col-md-3' style = 'font-family:arial'>
                <span style = 'color:blue;margin-bottom:5px'>Create Users</span>
                <p class = 'lead text-justify' style = 'font-size:10pt'>
                    Create users and assign them roles. Users can be created by entering their details
                    and login credentials or by pulling existing <a href = '".$dhis_url."' target = '_blank'> 
                    DHIS2 </a> users.
                    
                    Go to 
                    <a data-toggle='collapse' data-parent='#accordion' href='#collapseUsers'>
                    USERS
                    </a>, click on the create to enter user details or create from DHIS to pull existing users
                    from DHIS2.
                    You can also Edit user details and Activate/Deactivate users.
                </p>
            </div>";

        echo "<div class = 'col-md-3' style = 'font-family:arial'>
                <span style = 'color:blue;margin-bottom:5px'>Programs and Classifying</span>
                <p class = 'lead text-justify' style = 'font-size:10pt'>
                    Create programs that will be used in determination of the supply chain hierarchy.
                    Programs have their own distinct classification of sites.
                    Use <a data-toggle='collapse' data-parent='#accordion' href = '#collapsePrograms'>PROGRAMS</a>
                    to create and edit programs then go to 
                    <a data-toggle='collapse' data-parent='#accordion' href='#collapseFacilities'>
                    CLASSIFY FACILITIES
                    </a>, to make classifications under that program. Follow the prompts
                </p>
            </div>";

        echo "<div class = 'col-md-3' style = 'font-family:arial'>
                <span style = 'color:blue;'>Sorting using Org. Units</span>
                <p class = 'lead text-justify' style = 'font-size:10pt'>
                    There are over 9,474 facilities in the Kenya captured in 
                    <a href = '".$dhis_url."' target = '_blank'> DHIS2 </a>.
                    It is impossible to consider all of them at once for classification.
                    Use the <span style = 'color:green'>ORGANIZATION UNITS</span>
                    hierarchy on the right of the classification page
                    to narrow down to low level units.
                    Click on an organization unit to get a list of facilities under it.
                </p>
            </div>";

        echo "<div class = 'col-md-3' style = 'font-family:arial'>
                <span style = 'color:blue;'>Updating the System</span>
                <p class = 'lead text-justify' style = 'font-size:10pt'>
                    There is need to query DHIS2 for newly created organization units and/or datasets.
                    Use 
                    <a  data-toggle='collapse' data-parent='#accordion' href='#collapseUpdates'>
                        UPDATES
                    </a> 
                    to update the system database from DHIS2 Web API.
                    Updates fetch new organization units and/or datasets that may have been created. 
                    It also renames those that might have been renamed.

                </p>
            </div> ";
    }

    else if($_SESSION["user_role"]=="WRITE")
    {
        echo "<div class = 'col-md-4' style = 'font-family:arial'>
                <span style = 'color:blue;'>Reports</span>
                <p class = 'lead text-justify' style = 'font-size:10pt'>
                    This system provides several reports both from its internal database and from
                    <a href = '".$dhis_url."' target = '_blank'> DHIS2 </a>.
                    Use 
                    <a  data-toggle='collapse' data-parent='#accordion' href='#collapseReports'>
                        REPORTS
                    </a> 
                    to generate such kind of reports.
                    Programs report shows a breakdown of created programs.
                    Supply hierarchy reports shows the hierarchy classified under each program.
                    Dataset Report queries <a href = '".$dhis_url."' target = '_blank'> DHIS2 </a>
                    for specific dataset reports according to the program supply pipeline hierarchy.
                    Follow the prompts.
                </p>
            </div> ";

            echo "<div class = 'col-md-4' style = 'font-family:arial'>
                <span style = 'color:blue;'>Posting Back Data</span>
                <p class = 'lead text-justify' style = 'font-size:10pt'>
                    This system allows for posting back of data to respective
                    <a href = '".$dhis_url."' target = '_blank'> DHIS2 </a> datasets.
                    From
                    <a  data-toggle='collapse' data-parent='#accordion' href='#collapseReports'>
                        REPORTS
                    </a> generate a dataset report queries on which the changes to be written back
                    appear.
                    User the <span style = 'color:green'>POST</span> button to write back data to that specific
                    dataset. This button appears once the report has fully loaded.
                    You may need to supply your <a href = '".$dhis_url."' target = '_blank'> DHIS2 </a> once prompted
                    credentials for authentication purposes before posting the data.
            </div> ";

    }

    else if($_SESSION["user_role"]=="READ")
    {
        echo "<div class = 'col-md-4' style = 'font-family:arial'>
                <span style = 'color:blue;'>Reports</span>
                <p class = 'lead text-justify' style = 'font-size:10pt'>
                    This system provides several reports both from its internal database and from
                    <a href = '".$dhis_url."' target = '_blank'> DHIS2 </a>.
                    Use 
                    <a  data-toggle='collapse' data-parent='#accordion' href='#collapseReports'>
                        REPORTS
                    </a> 
                    to generate such kind of reports.
                    Programs report shows a breakdown of created programs.
                    Supply hierarchy reports shows the hierarchy classified under each program.
                    Dataset Report queries <a href = '".$dhis_url."' target = '_blank'> DHIS2 </a>
                    for specific dataset reports according to the program supply pipeline hierarchy.
                    Follow the prompts.
                </p>
            </div> ";

    }
?>