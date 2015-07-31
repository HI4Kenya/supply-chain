<?php

    if($_SESSION["user_role"]=="ADMIN")
    {
        echo "<div class = 'col-md-3' style = 'font-family:arial'>
                <span style = 'color:blue;margin-bottom:5px'>Users</span>
                <p class = 'lead text-justify' style = 'font-size:10pt'>
                    Use this Menu for creating users and assigning them roles. Users can be created by entering 
                    their details and login credentials or by pulling existing <a href = '".$dhis_url."' target = '_blank'> 
                    DHIS2 </a> users.                    
                    Go to 
                    <a data-toggle='collapse' data-parent='#accordion' href='#collapseUsers'>
                    USERS
                    </a>, 
                    click on CREATE button to enter the details for a new user or click on CREATE FROM DHIS button
                    to pull existing users from DHIS2. 
                    You can also edit user details and roles by clicking on the UPDATE button. Only Admin level users 
                    can activate/deactivate other users.
                </p>
            </div>";

        echo "<div class = 'col-md-3' style = 'font-family:arial'>
                <span style = 'color:blue;margin-bottom:5px'>Programs</span>
                <p class = 'lead text-justify' style = 'font-size:10pt'>
                    Use this menu to create new programs for which you want to map the supply chain hierarchy, e.g.
                    Family Planning, ART. NB: different Programs classify their types of sites differently. 
                    Go to <a data-toggle='collapse' data-parent='#accordion' href = '#collapsePrograms'>PROGRAMS</a>,
                    then click on CREATE to create a new program. Click on UPDATE to edit the
                    details of an existing program. Only Admin level users can delete programs.
                </p>
            </div>";

        echo "<div class = 'col-md-3' style = 'font-family:arial'>
                <span style = 'color:blue;margin-bottom:5px'>Classify</span>
                <p class = 'lead text-justify' style = 'font-size:10pt'>
                    This menu allows the user to create facilities by the types relevant to the supply chain hierarchy of a
                    program. 4 types have been catered for: Sub-county stores, Central sites, Standalone sites and 
                    Satellite sites (also caters for the Central site Dispensing point). Go to 
                    <a data-toggle='collapse' data-parent='#accordion' href='#collapseFacilities'>
                    CLASSIFY
                    </a>
                    , then click on 
                    the relevant type of facility, e.g. Sub-county stores, Central sites, Standalone sites and Satellite
                    sites. Select the relevant program then add facilities under the selected facility type. The list of 
                    facilities is synchronised with the master facility list in the <a href = '".$dhis_url."' target = '_blank'> DHIS2 </a>. 
                    Use the <span style = 'color:green'>ORGANIZATION UNITS </span>hierarchy on the side of the Classify
                    page to narrow down to the required county, sub-county and hen facility. 
                    Click on the facility name to select it.
                </p>
            </div>";

        echo "<div class = 'col-md-3' style = 'font-family:arial'>
                    <span style = 'color:blue;'>Reports</span>
                    <p class = 'lead text-justify' style = 'font-size:10pt'>
                        This menu allows the user to access various reports generated using the available data.
                        Go to <span style = 'color:green'> DATA SET REPORT </span>to access the report for a 
                        particular program, data set (reporting tool), reporting period and facility. Select the
                        facility by drilling down through the facility type, e.g. if a facility is supplied by, 
                        and reports to, a sub-county store, select the relevant sub-county store, then locate the
                        facility name under it. 
                        Go to <span style = 'color:green'>SITES ANALYTICS</span> to access
                        list of facilities by program and by type. 
                        Go to <span style = 'color:green'>ART REPORTS</span>to access reports limited to ART program,
                        e.g. patient numbers.  Go to PROGRAMS to access the full list of created programs. 
                        Go to <span style = 'color:green'> SUPPLY HIERARCHY </span> to access the supply chain hierarchy/site 
                        classification by program.
                    </p>
                </div> ";

        echo "<div class = 'col-md-3' style = 'font-family:arial'>
                <span style = 'color:blue;'>Updates</span>
                <p class = 'lead text-justify' style = 'font-size:10pt'>
                    The tool’s database requires updating for newly created organization units and/or datasets or edits of
                    the existing data. This is done by aligning it with <a href = '".$dhis_url."' target = '_blank'> DHIS2 </a>.
                    This menu is used to update the tool database from DHIS2 Web API.
                    Go to 
                    <a  data-toggle='collapse' data-parent='#accordion' href='#collapseUpdates'>
                        UPDATES
                    </a> 
                    and then select the relevant organisation unit to be updated, e.g.
                    Counties, Sub counties, facilities, datasets.
                </p>
            </div> ";

        echo "<div class = 'col-md-3' style = 'font-family:arial'>
                <span style = 'color:blue;'>Administration</span>
                <p class = 'lead text-justify' style = 'font-size:10pt'>
                    This menu is used by Admin level users to modify the database, e.g. delete existing programs and
                    their hierarchy, recover data deleted erroneously by other users.
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