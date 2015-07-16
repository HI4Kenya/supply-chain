// Function createUsers()
function createUsers(load,createdUserID,createdUserName)
{
    if(load == "details")
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USER DETAILS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Create a new user below by entering their details</span></span>");
        var detailsPanel = "<div class='panel-heading' style = 'height:auto;width:60%;margin-right:10px;margin-bottom:5px;background-color:;border:1px solid #a4d2a3;'>"+
                    // Employee NO
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Employee ID:</span>"+
                        "<input id = 'employee_no' type='text' class='form-control' placeholder='Employee ID' style = 'margin-top:-25px;margin-left:150px' required>"+
                        // "<span style = 'color:red;margin-left:10px'>*</span>"+
                    "</div>"+
                    // User Name
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Name:</span>"+
                        "<input id = 'user_name' type='text' class='form-control' placeholder='Name' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    // User Gender
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Gender:</span>"+
                        "<select id = 'user_gender' class='form-control' style = 'margin-top:-25px;margin-left:150px'>"+
                             "<option value = ''>[Select]</option>"+
                            "<option value = 'MALE'>MALE</option>"+
                            "<option value = 'FEMALE'>FEMALE</option>"+
                        "</select>"+
                    "</div>"+
                    // User email
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Email:</span>"+
                        // "<span class = 'fa fa-envelope-o' style = 'color:red;margin-left:10px'></span>"+
                        "<input id = 'user_email' type='text' class='form-control' placeholder='example@domain.com' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    // Phone
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Phone:</span>"+
                        "<input id = 'user_phone_no' type='text' class='form-control' placeholder='07XX123456' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    "<button type='submit' class='btn btn-success' style = 'margin-left:280px' onclick='javascript:userOperations(\"add\",\"details\");'>Submit</button>"+
                "</div>";
        // Append
        $('div#facilities').html(detailsPanel);
    }

    else if(load == "credentials")
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USER LOGIN CREDENTIALS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Assign a created user authentication credentials and a role</span></span>");
        var credentialPanel = "<div class='panel-heading' style = 'height:auto;width:60%;margin-right:10px;margin-bottom:5px;background-color:;border:1px solid #a4d2a3;'>"+
                    
                    // Created User Name
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px;color:blue'>USER:</span>"+
                        "<div id ='"+createdUserID+"'class='form-control' style = 'margin-top:-25px;margin-left:150px;background-color:#f5f5f5;'>"+
                            createdUserName+
                        "</div>"+
                    "</div>"+
                    // Username
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Username:</span>"+
                        "<input id = 'login_username' type='text' class='form-control' placeholder='Username' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    // password
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Password:</span>"+
                        // "<span class = 'fa fa-envelope-o' style = 'color:red;margin-left:10px'></span>"+
                        "<input id = 'login_password' type='password' class='form-control' placeholder='Password' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    // confirm password
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Confirm Password:</span>"+
                        // "<span class = 'fa fa-envelope-o' style = 'color:red;margin-left:10px'></span>"+
                        "<input id = 'confirm_login_password' type='password' class='form-control' placeholder='Confirm Password' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    // User Role
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>User Role:</span>"+
                        "<select id = 'user_role' class='form-control' style = 'margin-top:-25px;margin-left:150px'>"+
                            "<option value = ''>[Select]</option>"+
                            "<option value = 'READ'>READ</option>"+
                            "<option value = 'WRITE'>WRITE</option>"+
                            "<option value = 'ADMIN'>ADMIN</option>"+
                        "</select>"+
                    "</div>"+
                    "<button type='submit' class='btn btn-success' style = 'margin-left:280px' onclick='javascript:userOperations(\"add\",\"credentials\",\""+createdUserID+"\");'>Submit</button>"+
                "</div>";
        // Append
        $('div#facilities').html(credentialPanel);
    }
}
// END FUNCTION
/*--------------------------------------------------------------------------------------------------------------------------------*/

// Function updateUser()
function getUsers(display)
{
    // Edit purposes
    if(display == 'update')
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> LIST OF CREATED USERS</span>");

        var data =  "<div class='panel panel-default' style = 'margin-left:-30px;margin-top:0px'>"+
                        "<table id= 'userdata' style = 'border-radius:5px'>"+
                            "<thead>"+
                                "<th style = 'font-weight:bold'>#</th>"+
                                "<th style = 'font-weight:bold'>User</th>"+
                                "<th style = 'font-weight:bold'>Gender</th>"+
                                "<th style = 'font-weight:bold'>Email</th>"+
                                "<th style = 'font-weight:bold'>phone</th>"+
                                "<th style = 'font-weight:bold;color:purple'>Login Name</th>"+ 
                                "<th style = 'font-weight:bold;color:magenta'>Role</th>"+ 
                                "<th style = 'font-weight:bold;color:green'>Account Status</th>"+
                                "<th style = 'font-weight:bold;color:blue'>Edit</th>"+ 
                                // "<th style = 'font-weight:bold;color:red'>Change Password</th>"+                            
                            "</thead>"+
                            "<tbody id = 'tbody'>"+
                            "</tbody>"+
                        "</table>"+
                    "</div>";
        // Append
        $('div#facilities').html(data);

        //Fetch user details
        var details_url = "db/fetch/get_user_details.php";
        
        $.getJSON
        (
            details_url,
            function(receivedUsers)
            {
                for(var counting=0; counting<receivedUsers.length;counting++)
                { 
                    var itemNumber = counting+1;

                    var dataToAppend = "<tr>"+
                                            "<td>"+itemNumber+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].name+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].gender+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].email+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].mobile_no+"</td>"+
                                            "<td style = 'text-align:left' id = 'username_"+receivedUsers[counting].user_identifier+"'></td>"+
                                            "<td style = 'text-align:left' id = 'role_"+receivedUsers[counting].user_identifier+"'></td>"+
                                            "<td style = 'text-align:left' id = 'account_status_"+receivedUsers[counting].user_identifier+"'></td>"+
                                            "<td class = 'fa fa-edit' style = 'color:blue;cursor: pointer;'"+
                                                "onclick='editUsers(\""+receivedUsers[counting].user_identifier+"\",\""+receivedUsers[counting].name+"\")'>"+
                                            "</td>"+
                                            // "<td class = 'fa fa-cog' style = 'color:red;cursor: pointer;'"+
                                            //     "onclick='javascript:adminEditPassword(\""+receivedUsers[counting].user_identifier+"\",\""+receivedUsers[counting].name+"\")'>"+
                                            // "</td>"+
                                        "</tr>";
                    $(dataToAppend).appendTo("#userdata tbody");

                    // Get user credentials
                    var credentials_url = "db/fetch/get_user_credentials.php";
                    $.getJSON
                    (
                        credentials_url,
                        {user:receivedUsers[counting].user_identifier},
                        function(receivedData)
                        {
                            $("#username_"+receivedData[0].user_id).html("<span style ='color:purple'>"+receivedData[0].username+"</span>");
                            $("#role_"+receivedData[0].user_id).html("<span style ='color:magenta'>"+receivedData[0].role+"</span>");
                            $("#account_status_"+receivedData[0].user_id).html("<span style ='color:green'>"+receivedData[0].account_status+"</span>")
                        }
                    );
                }  
            }
        );
    }

    // Data administration
    else if(display == 'administration')
    {
        $('div#returned_messages').html("<span style = 'color:red;margin-left:30px'>DEACTIVATE USERS</span>");

        var data =  "<div class='panel-body' style = 'margin-left:-30px;margin-top:-30px'>"+
                        "<table id= 'userdata' style = 'border-radius:5px'>"+
                        "<thead>"+
                            "<th style = 'font-weight:bold'>#</th>"+
                            // "<th style = 'font-weight:bold'>User Identifier</th>"+
                            "<th style = 'font-weight:bold'>User</th>"+
                            "<th style = 'font-weight:bold'>Gender</th>"+
                            "<th style = 'font-weight:bold'>Email</th>"+
                            "<th style = 'font-weight:bold'>phone</th>"+
                            "<th style = 'font-weight:bold;color:purple'>Login Name</th>"+ 
                            "<th style = 'font-weight:bold;color:green'>Role</th>"+  
                            "<th style = 'font-weight:bold;color:'>Account</th>"+
                            "<th style = 'font-weight:bold;color:blue'>More Details</th>"+                             
                        "</thead>"+
                        "<tbody>"+
                        "</tbody>"+
                        "</table>"+
                    "</div>";
        // Append
        $('div#facilities').html(data);

        //Fetch user details
        var details_url = "db/fetch/get_user_details.php";
        
        $.getJSON
        (
            details_url,
            function(receivedUsers)
            {
                for(var counting=0; counting<receivedUsers.length;counting++)
                { 
                    var itemNumber = counting+1;

                    var dataToAppend = "<tr>"+
                                            "<td>"+itemNumber+"</td>"+
                                            //"<td style = 'text-align:left'>"+receivedUsers[counting].user_identifier+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].name+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].gender+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].email+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].mobile_no+"</td>"+
                                            "<td style = 'text-align:left' id = 'username_"+receivedUsers[counting].user_identifier+"'></td>"+
                                            "<td style = 'text-align:left' id = 'role_"+receivedUsers[counting].user_identifier+"'></td>"+
                                            "<td id ='activate_deactivate_"+receivedUsers[counting].user_identifier+"' style = 'color:red;cursor: pointer;'>"+
                                                "<button id = 'btn_account_status_change' class = 'pull-right btn btn-danger btn-sm' onclick='userOperations(\"deactivate\",\"user\",\""+receivedUsers[counting].user_identifier+"\",\""+receivedUsers[counting].name+"\")'>Deactivate</button>"+
                                            "</td>"+
                                            "<td class = 'fa fa-list' style = 'color:blue;cursor: pointer;'"+
                                                "onclick='detailedUserProfile(\""+receivedUsers[counting].user_identifier+"\",\""+receivedUsers[counting].name+"\")'>"+
                                            "</td>"+
                                        "</tr>";
                    $(dataToAppend).appendTo("#userdata tbody");
                    
                    // Get user credentials
                    var credentials_url = "db/fetch/get_user_credentials.php";
                    $.getJSON
                    (
                        credentials_url,
                        {user:receivedUsers[counting].user_identifier},
                        function(receivedData)
                        {
                            $("#username_"+receivedData[0].user_id).html("<span style ='color:purple'>"+receivedData[0].username+"</span>");
                            $("#role_"+receivedData[0].user_id).html("<span style ='color:green'>"+receivedData[0].role+"</span>");

                            if(receivedData[0].account_status == "DEACTIVATED")
                            {
                                $('#activate_deactivate_'+receivedData[0].user_id).html("<button id = 'btn_account_status_change' class = 'pull-right btn btn-success btn-sm' onclick='userOperations(\"activate\",\"user\",\""+receivedData[0].user_id+"\",\""+receivedData[0].username+"\")'>Activate</button>");
                            }
                        }
                    );
                } 
            }
        );
    }

    // Display purposes
    else if(display == 'report')
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px;'> LIST OF CREATED USERS</span>");

        var data =  "<div class='panel-body' style = 'margin-left:-30px;margin-top:-30px'>"+
                        "<table id= 'userdata' style = 'border-radius:5px'>"+
                        "<thead>"+
                            "<th style = 'font-weight:bold'>#</th>"+
                            "<th style = 'font-weight:bold'>User Identifier</th>"+
                            "<th style = 'font-weight:bold'>User</th>"+
                            "<th style = 'font-weight:bold'>Gender</th>"+
                            "<th style = 'font-weight:bold'>Email</th>"+
                            "<th style = 'font-weight:bold'>phone</th>"+
                            "<th style = 'font-weight:bold;color:purple'>Login Name</th>"+ 
                            "<th style = 'font-weight:bold;color:green'>Role</th>"+                              
                        "</thead>"+
                        "<tbody>"+
                        "</tbody>"+
                        "</table>"+
                    "</div>";
        // Append
        $('div#facilities').html(data);

        //Fetch user details
        var details_url = "db/fetch/get_user_details.php";
        
        $.getJSON
        (
            details_url,
            function(receivedUsers)
            {
                for(var counting=0; counting<receivedUsers.length;counting++)
                { 
                    var itemNumber = counting+1;

                    var dataToAppend = "<tr>"+
                                            "<td>"+itemNumber+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].user_identifier+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].name+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].gender+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].email+"</td>"+
                                            "<td style = 'text-align:left'>"+receivedUsers[counting].mobile_no+"</td>"+
                                            "<td style = 'text-align:left' id = 'username_"+receivedUsers[counting].user_identifier+"'></td>"+
                                            "<td style = 'text-align:left' id = 'role_"+receivedUsers[counting].user_identifier+"'></td>"+
                                        "</tr>";
                    $(dataToAppend).appendTo("#userdata tbody");
                    
                    // Get user credentials
                    var credentials_url = "db/fetch/get_user_credentials.php";
                    $.getJSON
                    (
                        credentials_url,
                        {user:receivedUsers[counting].user_identifier},
                        function(receivedData)
                        {
                            $("#username_"+receivedData[0].user_id).html("<span style ='color:purple'>"+receivedData[0].username+"</span>");
                            $("#role_"+receivedData[0].user_id).html("<span style ='color:green'>"+receivedData[0].role+"</span>");
                        }
                    );
                }  
            }
        );
        $(function()
        {
            //$("#programdata").dataTable();
        })

    }
}
// END FUNCTION
/*------------------------------------------------------------------------------------------------------------------------------*/
// Function dhisUsers()
function dhisUsers()
{
    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> CREATE USERS FROM DHIS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Add a user from DHIS</span></span>");

    var data = "<div class='panel-headin' style = 'height:auto;width:100%;margin-right:10px;margin-bottom:5px;'>"+
                    "<div class='form-inline'>"+
                      "<div class='form-group' style = 'margin-bottom:10px;'>"+
                        "<label class='sr-only' for='exampleInputEmail3'>Name</label>"+
                        "<input id = 'search_name' class='form-control' placeholder='Search a DHIS user by name' style ='width:140%' onkeyup = 'javascript:searchDHISUser();'>"+
                      "</div>"+
                      "<br>"+ 
                      // Append the results
                      "<div id = 'user_search_results' class = 'panel panel-default' style = 'height:300px;overflow:scroll;width:30%;padding:5px'>"+
                      "</div>"+
                      "<div id = 'add_button' class = 'pull-left' style = 'position:absolute;margin-top:320px;margin-left:240px'>"
                      "</div>"+
                "</div>";
    // Append
    $('div#facilities').html(data);
}
/*------------------------------------------------------------------------------------------------------------------------------*/
// Function searchDHISUser()
function searchDHISUser()
{
    var itemToSearch = document.getElementById("search_name");
    var searchKey = itemToSearch.value;

    var dhisUsersUrl = "api/search_users.php";
    $('#user_search_results').html("<img src='assets/img/loading.gif' style = 'height:300px:width:30%'>");
    $.getJSON
    (
        dhisUsersUrl,
        {name:searchKey},
        function(found)
        {
            if(found.length>0)
            {
                $("#user_search_results").empty();
                $("#add_button").empty();
                for(var count=0; count<found.length;count++)
                {
                    var userToAppend = "<div id = '"+found[count].id+"'>"+found[count].name+"</div>"+
                                        "<input id = 'add_checkbox' type = 'checkbox' style = 'margin-left:250px;margin-top:-10px' value = "+found[count].id+">"+
                                        "</input>"+
                                        "<br>";
                    $(userToAppend).appendTo("#user_search_results");
                }
                var addButton = "<input type = 'button' class='btn btn-primary btn-sm' style = '' ONCLICK='addDHISUser();' value = 'Add'></input>";
                $(addButton).appendTo("#add_button");
            }
            else
            {
                if(found == 0)
                {
                    var userToAppend = "No results";
                    $("#user_search_results").html(userToAppend);
                }
                else
                {
                    var userToAppend = "<span class = 'fa fa-chain-broken' style = 'color:red;margin-left:30px'> CONNECTION ERROR</span>"+
                                        "<span class = 'fa fa-ok' style = 'color:brown;'>Check your <a href = 'http://test.hiskenya.org' target='_blank'>DHIS2</a> connection</span>";
                    $("#user_search_results").html(userToAppend);
                }
            }
        }
    );
}

/*------------------------------------------------------------------------------------------------------------------------------*/
// Function searchDHISUser()
function addDHISUser()
{
    var usersToAdd = [];
    $("input:checkbox[id=add_checkbox]:checked").each
    (
        function()
        {
            usersToAdd.push($(this).val());
        }
    );

    // Place requests for the data of that user
    for(var i=0;i<usersToAdd.length;i++)
    {
        var userDetails = "api/get_user_details.php";
        $.getJSON
        (
            userDetails,
            {user_id:usersToAdd[i]},
            function(data)
            {
                // User Details
                var employeeID = data.id;
                var userName = data.name;
                var selectedUserGender = "NOT AVAILABLE";
                var userEmail = data.email;
                var phoneNO = data.phoneNumber;

                // Account credentials
                var loginUserName = data.userCredentials.code;
                var loginPassword = data.userCredentials.code;
                var selectedUserRole;
                
                if(data.access.write == 'true')
                {
                    selectedUserRole = "WRITE";
                }
                else
                {
                    selectedUserRole = "READ";
                }

                // Place an insert request to the database side
                $.post
                (
                    'db/insertion/insert_user_details.php',
                    {employeeID:employeeID,user_name:userName,user_gender:selectedUserGender,user_email:userEmail,user_phone:phoneNO},
                    function(statusMessage)
                    {
                        if(statusMessage == 0)
                        {
                            // Place user credentials insert request
                            $.post
                            (
                                'db/insertion/insert_user_credentials.php',
                                {user_id:employeeID,login_name:loginUserName,password:loginPassword,user_role:selectedUserRole},
                                function(statusMessage)
                                {
                                    if(statusMessage == 0)
                                    {
                                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:green;padding:5px;border-radius:3px;width:40%'>"+
                                                                "<span style ='margin-left:70px'>"+
                                                                    "<span class = 'fa fa-check-square' style = 'color:white;'>"+userName+" has been saved</span>"+
                                                                "</span>"+
                                                            "</div>";
                                        $("div#returned_messages").html(errorMessage);
                                        //Clear the error message after 1500 ms
                                        setTimeout
                                        (
                                            function()
                                            {
                                                $("div#returned_messages").empty();
                                                getUsers('report');
                                                
                                            },
                                            1500
                                        );
                                    }

                                    else if(statusMessage == 1)
                                    {
                                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:blue;padding:5px;border-radius:3px;width:40%'>"+
                                                                "<span style ='margin-left:70px'>"+
                                                                    "<span class = 'fa fa-ok' style = 'color:white;'>"+createdUserID+" credentials exist</span>"+
                                                                "</span>"+
                                                            "</div>";
                                        $("div#returned_messages").html(errorMessage);
                                        //Clear the error message after 1500 ms
                                        setTimeout
                                        (
                                            function()
                                            {
                                                $("div#returned_messages").empty();
                                                getUsers('report');
                                            },
                                            1500
                                        );
                                    }

                                    else if(statusMessage == -1)
                                    {
                                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:red;padding:5px;border-radius:3px;width:40%'>"+
                                                                "<span style ='margin-left:70px'>"+
                                                                    "<span class = 'fa fa-ok' style = 'color:white;'> Error. Credentials not inserted</span>"+
                                                                "</span>"+
                                                            "</div>";
                                        $("div#returned_messages").html(errorMessage);
                                        //Clear the error message after 1500 ms
                                        setTimeout
                                        (
                                            function()
                                            {
                                                $("div#returned_messages").empty();
                                                $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> CREATE USERS FROM DHIS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Add a user from DHIS</span></span>");
                                            },
                                            1500
                                        );
                                    }
                                }
                            );
                        }

                        else if(statusMessage == 1)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:blue;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-ok' style = 'color:white;'>"+userName+" exists </span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    $("div#returned_messages").empty();
                                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> CREATE USERS FROM DHIS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Add a user from DHIS</span></span>");
                                },
                                1500
                            );
                        }

                        else if(statusMessage == -1)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:red;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-ok' style = 'color:white;'> Error. "+userName+" not inserted</span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    $("div#returned_messages").empty();
                                    //createUsers('credentials');
                                },
                                1500
                            );
                        }
                    }
                );
            }

        );
    }
}

/*------------------------------------------------------------------------------------------------------------------------------*/
// Function userOperations()
function userOperations(operation,item,createdUserID,createdUserName)
{
    // Add new user details
    if((operation == "add")&&(item == "details"))
    {
        var employeeID = document.getElementById("employee_no").value;
        var userName = document.getElementById("user_name").value;
        var userGender = document.getElementById("user_gender");
        var userGenderIndex = userGender.selectedIndex; 
        var userGenderOptions = userGender.options;
        var selectedUserGender = userGenderOptions[userGenderIndex].value;
        var userEmail = document.getElementById("user_email").value;
        var phoneNO = document.getElementById("user_phone_no").value;
        
        if(employeeID == "")
        {
            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                    "<span style ='margin-left:80px'>"+
                                        "Please enter the user employee ID"+
                                    "</span>"+
                                "</div>";
            $("div#returned_messages").html(errorMessage);
            //Clear the error message after 1500 ms
            setTimeout
            (
                function()
                {
                    $("div#returned_messages").empty();
                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USERS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Create a new user below</span></span>");
                },
                1500
            );
        }

        else
        {
            if(userName == "")
            {
                var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                        "<span style ='margin-left:80px'>"+
                                            "Please enter the name of the user"+
                                        "</span>"+
                                    "</div>";
                $("div#returned_messages").html(errorMessage);
                //Clear the error message after 1500 ms
                setTimeout
                (
                    function()
                    {
                        $("div#returned_messages").empty();
                        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USERS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Create a new user below</span></span>");
                    },
                    1500
                );
            }
            else
            {
                if(selectedUserGender == "")
                {
                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                            "<span style ='margin-left:80px'>"+
                                                "Please select the gender of the user"+
                                            "</span>"+
                                        "</div>";
                    $("div#returned_messages").html(errorMessage);
                    //Clear the error message after 1500 ms
                    setTimeout
                    (
                        function()
                        {
                            $("div#returned_messages").empty();
                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USERS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Create a new user below</span></span>");
                        },
                        1500
                    );
                }
                else
                {
                    if(userEmail == "")
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Please enter the user's email"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USERS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Create a new user below</span></span>");
                            },
                            1500
                        );
                    }
                    else
                    {
                        if(!validateEmail(userEmail))
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:80px'>"+
                                                        "The email entered is invalid"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                            "<span style ='margin-left:80px'>"+
                                                                "Email Format: example@domain.com"+
                                                            "</span>"+
                                                        "</div>";
                                    $("div#returned_messages").html(errorMessage);
                                    //Clear the error message after 1500 ms
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("div#returned_messages").empty();
                                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USERS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Create a new user below</span></span>");
                                        },
                                        2000
                                    );
                                },
                                1500
                            );
                        }
                        else
                        {
                            if(phoneNO == "")
                            {
                                var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                        "<span style ='margin-left:80px'>"+
                                                            "Please enter the user's phone number"+
                                                        "</span>"+
                                                    "</div>";
                                $("div#returned_messages").html(errorMessage);
                                //Clear the error message after 1500 ms                                
                                setTimeout
                                (
                                    function()
                                    {
                                        $("div#returned_messages").empty();
                                        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USERS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Create a new user below</span></span>");
                                    },
                                    2000
                                );
                            }
                            else
                            {
                                if(!validatePhoneNumber(phoneNO))
                                {
                                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                            "<span style ='margin-left:80px'>"+
                                                                "The phone number entered is invalid"+
                                                            "</span>"+
                                                        "</div>";
                                    $("div#returned_messages").html(errorMessage);
                                    //Clear the error message after 1500 ms
                                    setTimeout
                                    (
                                        function()
                                        {
                                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                                    "<span style ='margin-left:80px'>"+
                                                                        "Phone NO Format: 07XX123456"+
                                                                    "</span>"+
                                                                "</div>";
                                            $("div#returned_messages").html(errorMessage);
                                            //Clear the error message after 1500 ms
                                            setTimeout
                                            (
                                                function()
                                                {
                                                    $("div#returned_messages").empty();
                                                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USERS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Create a new user below</span></span>");
                                                },
                                                2000
                                            );
                                        },
                                        1500
                                    );   
                                }
                                else
                                {
                                    // Place an insert request to the database side
                                    $.post
                                    (
                                        'db/insertion/insert_user_details.php',
                                        {employeeID:employeeID,user_name:userName,user_gender:selectedUserGender,user_email:userEmail,user_phone:phoneNO},
                                        function(statusMessage)
                                        {
                                            if(statusMessage == 0)
                                            {
                                                var errorMessage = "<div style ='color:white;margin-left:40px;background-color:green;padding:5px;border-radius:3px;width:40%'>"+
                                                                        "<span style ='margin-left:70px'>"+
                                                                            "<span class = 'fa fa-check-square' style = 'color:white;'>"+userName+" has been saved</span>"+
                                                                        "</span>"+
                                                                    "</div>";
                                                $("div#returned_messages").html(errorMessage);
                                                //Clear the error message after 1500 ms
                                                setTimeout
                                                (
                                                    function()
                                                    {
                                                        $("div#returned_messages").empty();
                                                        createUsers('credentials',employeeID,userName);
                                                    },
                                                    1500
                                                );
                                            }

                                            else if(statusMessage == 1)
                                            {
                                                var errorMessage = "<div style ='color:white;margin-left:40px;background-color:blue;padding:5px;border-radius:3px;width:40%'>"+
                                                                        "<span style ='margin-left:70px'>"+
                                                                            "<span class = 'fa fa-ok' style = 'color:white;'>"+userName+" exists </span>"+
                                                                        "</span>"+
                                                                    "</div>";
                                                $("div#returned_messages").html(errorMessage);
                                                //Clear the error message after 1500 ms
                                                setTimeout
                                                (
                                                    function()
                                                    {
                                                        $("div#returned_messages").empty();
                                                        //createUsers('details',employeeID,userName);
                                                    },
                                                    1500
                                                );
                                            }

                                            else if(statusMessage == -1)
                                            {
                                                var errorMessage = "<div style ='color:white;margin-left:40px;background-color:red;padding:5px;border-radius:3px;width:40%'>"+
                                                                        "<span style ='margin-left:70px'>"+
                                                                            "<span class = 'fa fa-ok' style = 'color:white;'> Error. "+userName+" not inserted</span>"+
                                                                        "</span>"+
                                                                    "</div>";
                                                $("div#returned_messages").html(errorMessage);
                                                //Clear the error message after 1500 ms
                                                setTimeout
                                                (
                                                    function()
                                                    {
                                                        $("div#returned_messages").empty();
                                                        //createUsers('credentials');
                                                    },
                                                    1500
                                                );
                                            }
                                        }
                                    );
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // End add details

    // Add user credentials
    else if((operation == "add")&&(item == "credentials"))
    {
        var loginUserName = document.getElementById("login_username").value;
        var loginPassword = document.getElementById("login_password").value;      
        var confirmLoginPassword = document.getElementById("confirm_login_password").value;
        var userRole = document.getElementById("user_role"); 
        var userRoleIndex = userRole.selectedIndex; 
        var userRoleOptions = userRole.options;
        var selectedUserRole = userRoleOptions[userRoleIndex].value;
        
        if(loginUserName == "")
        {
            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                    "<span style ='margin-left:80px'>"+
                                        "Please enter the username"+
                                    "</span>"+
                                "</div>";
            $("div#returned_messages").html(errorMessage);
            //Clear the error message after 1500 ms
            setTimeout
            (
                function()
                {
                    $("div#returned_messages").empty();
                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USER LOGIN CREDENTIALS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Assign a created user authentication credentials and a role</span></span>");
                },
                1500
            );
        }

        else
        {
            if(loginPassword == "")
            {
                var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                        "<span style ='margin-left:80px'>"+
                                            "Please enter the password"+
                                        "</span>"+
                                    "</div>";
                $("div#returned_messages").html(errorMessage);
                //Clear the error message after 1500 ms
                setTimeout
                (
                    function()
                    {
                        $("div#returned_messages").empty();
                        $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USER LOGIN CREDENTIALS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Assign a created user authentication credentials and a role</span></span>");
                    },
                    1500
                );
            }
            else
            {
                if(loginPassword != confirmLoginPassword)
                {
                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                            "<span style ='margin-left:80px'>"+
                                                "Password did not match"+
                                            "</span>"+
                                        "</div>";
                    $("div#returned_messages").html(errorMessage);
                    //Clear the error message after 1500 ms
                    setTimeout
                    (
                        function()
                        {
                            $("div#returned_messages").empty();
                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USER LOGIN CREDENTIALS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Assign a created user authentication credentials and a role</span></span>");
                        },
                        1500
                    );
                }
                else
                {
                    if(selectedUserRole == "")
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Please select a user role"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> USER LOGIN CREDENTIALS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Assign a created user authentication credentials and a role</span></span>");
                            },
                            1500
                        );
                    }
                    else
                    {
                        $.post
                        (
                            'db/insertion/insert_user_credentials.php',
                            {user_id:createdUserID,login_name:loginUserName,password:loginPassword,user_role:selectedUserRole},
                            function(statusMessage)
                            {
                                if(statusMessage == 0)
                                {
                                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:green;padding:5px;border-radius:3px;width:40%'>"+
                                                            "<span style ='margin-left:70px'>"+
                                                                "<span class = 'fa fa-check-square' style = 'color:white;'>"+createdUserID+" credentials saved</span>"+
                                                            "</span>"+
                                                        "</div>";
                                    $("div#returned_messages").html(errorMessage);
                                    //Clear the error message after 1500 ms
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("div#returned_messages").empty();
                                            getUsers('report');
                                        },
                                        1500
                                    );
                                }

                                else if(statusMessage == 1)
                                {
                                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:blue;padding:5px;border-radius:3px;width:40%'>"+
                                                            "<span style ='margin-left:70px'>"+
                                                                "<span class = 'fa fa-ok' style = 'color:white;'>"+createdUserID+" credentials exist</span>"+
                                                            "</span>"+
                                                        "</div>";
                                    $("div#returned_messages").html(errorMessage);
                                    //Clear the error message after 1500 ms
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("div#returned_messages").empty();
                                            getUsers('report');
                                        },
                                        1500
                                    );
                                }

                                else if(statusMessage == -1)
                                {
                                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:red;padding:5px;border-radius:3px;width:40%'>"+
                                                            "<span style ='margin-left:70px'>"+
                                                                "<span class = 'fa fa-ok' style = 'color:white;'> Error. Credentials not inserted</span>"+
                                                            "</span>"+
                                                        "</div>";
                                    $("div#returned_messages").html(errorMessage);
                                    //Clear the error message after 1500 ms
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("div#returned_messages").empty();
                                        },
                                        1500
                                    );
                                }
                            }
                        );
                    }
                }
            }
        }
    }
    // End add credentials

    // User updating their own details
    else if((operation == "update")&&item == "User Update")
    {
        var userName = document.getElementById("user_name").value;
        var loginUserName = document.getElementById("login_username").value;
        var userEmail = document.getElementById("user_email").value;
        var phoneNO = document.getElementById("user_phone_no").value;

        // Get existing user details
        var userDetailsUrl = "db/fetch/get_individual_user.php";
        $.ajax
        ({
            type: 'GET',
            url: userDetailsUrl,
            data:{update:item,user:createdUserID},
            dataType: 'json',
            contentType: 'application/json',
            success: function (userData) 
            {
                if(userName == "")
                {
                    userName = userData[0].name;
                }
                if(loginUserName == "")
                {
                    loginUserName = userData[1].username;
                }
                // Email
                if(userEmail == "")
                {
                    userEmail = userData[0].email;
                }

                // Phone Number
                if(phoneNO == "")
                {
                    phoneNO = userData[0].mobile_no;
                }

                // Post to DB side
                $.post
                (
                    'db/update/update_user_profile.php',
                    {update:item,user:createdUserID,user_name:userName,login_name:loginUserName,user_email:userEmail,user_phone:phoneNO},
                    function(statusMessage)
                    {
                        if(statusMessage == 0)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:green;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-check-square' style = 'color:white;'> "+userData[0].name+" profile updated</span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    window.location.href="home.php";
                                },
                                1500
                            );
                        }
                        else if(statusMessage == 10)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:brown;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-ok' style = 'color:white;'> No changes have been made</span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    $("div#returned_messages").empty();
                                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> UPDATE YOUR PROFILE<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Edit your profile information</span></span>");
                                },
                                1500
                            );
                        }

                        else if(statusMessage == -1)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:red;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-ok' style = 'color:white;'> Error. Profile not inserted</span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    $("div#returned_messages").empty();
                                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> UPDATE YOUR PROFILE<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Edit your profile information</span></span>");
                                },
                                1500
                            );
                        }

                        else if(statusMessage == 12)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:80px'>"+
                                                        "The email entered is invalid"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                            "<span style ='margin-left:80px'>"+
                                                                "Email Format: example@domain.com"+
                                                            "</span>"+
                                                        "</div>";
                                    $("div#returned_messages").html(errorMessage);
                                    //Clear the error message after 1500 ms
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("div#returned_messages").empty();
                                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> UPDATE YOUR PROFILE<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Edit your profile information</span></span>");
                                        },
                                        2000
                                    );
                                },
                                1500
                            );
                        }

                        else if(statusMessage == 13)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:80px'>"+
                                                        "The phone number entered is invalid"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                            "<span style ='margin-left:80px'>"+
                                                                "Phone NO Format: 07XX123456"+
                                                            "</span>"+
                                                        "</div>";
                                    $("div#returned_messages").html(errorMessage);
                                    //Clear the error message after 1500 ms
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("div#returned_messages").empty();
                                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> UPDATE YOUR PROFILE<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Edit your profile information</span></span>");
                                        },
                                        2000
                                    );
                                },
                                1500
                            ); 
                        }
                    }
                );
            }
        });
    }
    // User updating their own details
    // End

    // Start admin updating user details
    else if((operation == "update")&&item == "Admin Edit")
    {
        var userName = document.getElementById("user_name").value;
        var loginUserName = document.getElementById("login_username").value;
        var userGender = document.getElementById("user_gender");
        var userGenderIndex = userGender.selectedIndex; 
        var userGenderOptions = userGender.options;
        var selectedUserGender = userGenderOptions[userGenderIndex].value;
        var userEmail = document.getElementById("user_email").value;
        var phoneNO = document.getElementById("user_phone_no").value;
        var userRole = document.getElementById("user_role"); 
        var userRoleIndex = userRole.selectedIndex; 
        var userRoleOptions = userRole.options;
        var selectedUserRole = userRoleOptions[userRoleIndex].value;

        // Get existing user details
        var userDetailsUrl = "db/fetch/get_individual_user.php";
        $.ajax
        ({
            type: 'GET',
            url: userDetailsUrl,
            data:{update:item,user:createdUserID},
            dataType: 'json',
            contentType: 'application/json',
            success: function (userData) 
            {
                // user's name
                if(userName == "")
                {
                    userName = userData[0].name;
                }
                // Login username
                if(loginUserName == "")
                {
                    loginUserName = userData[1].username;
                }
                // Email
                if(userEmail == "")
                {
                    userEmail = userData[0].email;
                }

                // Phone Number
                if(phoneNO == "")
                {
                    phoneNO = userData[0].mobile_no;
                }

                //Post to DB side
                $.post
                (
                    'db/update/update_user_profile.php',
                    {update:item,user:createdUserID,user_name:userName,login_name:loginUserName,user_gender:selectedUserGender,user_email:userEmail,user_phone:phoneNO,user_role:selectedUserRole},
                    function(statusMessage)
                    {
                        if(statusMessage == 0)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:green;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-check-square' style = 'color:white;'> "+userData[0].name+" profile updated</span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    getUsers('administration');
                                },
                                1500
                            );
                        }
                        else if(statusMessage == 10)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:brown;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-ok' style = 'color:white;'> No changes have been made</span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    $("div#returned_messages").empty();
                                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> EDIT USER DETAILS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Edit "+userName+"'s profile</span></span>");
                                },
                                1500
                            );
                        }

                        else if(statusMessage == -1)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:red;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-ok' style = 'color:white;'> Error. Profile not inserted</span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    $("div#returned_messages").empty();
                                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> EDIT USER DETAILS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Edit "+userName+"'s profile</span></span>");
                                },
                                1500
                            );
                        }

                        else if(statusMessage == 12)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:80px'>"+
                                                        "The email entered is invalid"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                            "<span style ='margin-left:80px'>"+
                                                                "Email Format: example@domain.com"+
                                                            "</span>"+
                                                        "</div>";
                                    $("div#returned_messages").html(errorMessage);
                                    //Clear the error message after 1500 ms
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("div#returned_messages").empty();
                                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> UPDATE YOUR PROFILE<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Edit your profile information</span></span>");
                                        },
                                        2000
                                    );
                                },
                                1500
                            );
                        }

                        else if(statusMessage == 13)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:80px'>"+
                                                        "The phone number entered is invalid"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                            "<span style ='margin-left:80px'>"+
                                                                "Phone NO Format: 07XX123456"+
                                                            "</span>"+
                                                        "</div>";
                                    $("div#returned_messages").html(errorMessage);
                                    //Clear the error message after 1500 ms
                                    setTimeout
                                    (
                                        function()
                                        {
                                            $("div#returned_messages").empty();
                                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> UPDATE YOUR PROFILE<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Edit your profile information</span></span>");
                                        },
                                        2000
                                    );
                                },
                                1500
                            ); 
                        }
                    }
                );
            }
        });
    }

    // Deactivate a user
    else if(operation == "deactivate")
    {
        var confirmAction=confirm("ARE YOU SURE YOU WANT TO DEACTIVATE "+createdUserName+"?\nOnce a user is deactivated, the cannot log in");
        if(confirmAction)
        {
            $.post
            (
                'db/deletion/deactivate_user.php',
                {user:createdUserID},
                function(statusMessage)
                {
                    /*
                        NOTES: MESSAGE CODES
                               -1 - Error
                                0 - Program deleted
                        */
                    if(statusMessage == -1)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "An error occured"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                var noteToAppend = "<span style = 'color:red;margin-left:30px'>DEACTIVATE USERS<br>"+
                                                        "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                                        //"NOTE: Changes affect the classification"
                                                        "</span>"+
                                                    "</span>";
                                $('div#returned_messages').html(noteToAppend);
                                getUsers('administration');
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 0)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    createdUserName+" Deactivated"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                var noteToAppend = "<span style = 'color:red;margin-left:30px'>DEACTIVATE USERS<br>"+
                                                        "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                                        //"NOTE: Changes affect the classification"
                                                        "</span>"+
                                                    "</span>";
                                $('div#returned_messages').html(noteToAppend);
                                getUsers('administration');
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 10)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    createdUserName+" is currently logged in"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                var noteToAppend = "<span style = 'color:red;margin-left:30px'>DEACTIVATE USERS<br>"+
                                                        "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                                        //"NOTE: Changes affect the classification"
                                                        "</span>"+
                                                    "</span>";
                                $('div#returned_messages').html(noteToAppend);
                                getUsers('administration');
                            },
                            1500
                        );
                    }
                }
            );
        }
    }
    // End deactivate user
    else if(operation == "activate")
    {
        var confirmAction=confirm("ARE YOU SURE YOU WANT TO ACTIVATE "+createdUserName+"?\nThis user will have access to the system");
        if(confirmAction)
        {
            $.post
            (
                'db/update/activate_user.php',
                {user:createdUserID},
                function(statusMessage)
                {
                    /*
                        NOTES: MESSAGE CODES
                               -1 - Error
                                0 - successful
                        */
                    if(statusMessage == -1)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "An error occured"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                var noteToAppend = "<span style = 'color:red;margin-left:30px'>DEACTIVATE USERS<br>"+
                                                        "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                                        //"NOTE: Changes affect the classification"
                                                        "</span>"+
                                                    "</span>";
                                $('div#returned_messages').html(noteToAppend);
                                getUsers('administration');
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 0)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    createdUserName+" activated"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                var noteToAppend = "<span style = 'color:red;margin-left:30px'>DEACTIVATE USERS<br>"+
                                                        "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                                        //"NOTE: Changes affect the classification"
                                                        "</span>"+
                                                    "</span>";
                                $('div#returned_messages').html(noteToAppend);
                                getUsers('administration');
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 10)
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    createdUserName+" is currently logged in"+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        //Clear the error message after 1500 ms
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                var noteToAppend = "<span style = 'color:red;margin-left:30px'>DEACTIVATE USERS<br>"+
                                                        "<span id = 'note' style ='color:red;font-weight:normal;font-size:10pt;margin-left:30px'>"+
                                                        //"NOTE: Changes affect the classification"
                                                        "</span>"+
                                                    "</span>";
                                $('div#returned_messages').html(noteToAppend);
                                getUsers('administration');
                            },
                            1500
                        );
                    }
                }
            );
        }
    }
}
//END FUNCTION
/*------------------------------------------------------------------------------------------------------------------------------*/
// Function updateUserPassword()
function updateUserPassword(user)
{
    var loginPassword = document.getElementById("login_password").value;      
    var confirmLoginPassword = document.getElementById("confirm_login_password").value;
    if(loginPassword == "")
    {
        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                "<span style ='margin-left:80px'>"+
                                    "Please enter the password"+
                                "</span>"+
                            "</div>";
        $("div#returned_messages").html(errorMessage);
        //Clear the error message after 1500 ms
        setTimeout
        (
            function()
            {
                $("div#returned_messages").empty();
                $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> CHANGE YOUR PASSWORD");
            },
            1500
        );
    }
    else
    {
        if(loginPassword != confirmLoginPassword)
        {
            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                    "<span style ='margin-left:80px'>"+
                                        "Password did not match"+
                                    "</span>"+
                                "</div>";
            $("div#returned_messages").html(errorMessage);
            //Clear the error message after 1500 ms
            setTimeout
            (
                function()
                {
                    $("div#returned_messages").empty();
                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> CHANGE YOUR PASSWORD");
                },
                1500
            );
        }
        else
        {
            if(loginPassword.length<6)
            {
                var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                        "<span style ='margin-left:80px'>"+
                                            "Password is too short."+
                                        "</span>"+
                                    "</div>";
                $("div#returned_messages").html(errorMessage);
                //Clear the error message after 1500 ms
                setTimeout
                (
                    function()
                    {
                        var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                                "<span style ='margin-left:80px'>"+
                                                    "Password should be atleast six characters."+
                                                "</span>"+
                                            "</div>";
                        $("div#returned_messages").html(errorMessage);
                        setTimeout
                        (
                            function()
                            {
                                $("div#returned_messages").empty();
                                $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> CHANGE YOUR PASSWORD");
                            },
                            1500
                        );
                    },
                    1500
                );
            }
            else
            {
                // Insert the new password
                $.post
                (
                    'db/update/update_user_password.php',
                    {theUser:user,password:loginPassword},
                    function(statusMessage)
                    {
                        if(statusMessage == 0)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:green;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-check-square' style = 'color:white;'> Password has been updated</span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    if(user == "LOGGED IN USER")
                                    {
                                        $("div#returned_messages").empty();
                                        var message = "<div style ='color:white;margin-left:40px;background-color:blue;padding:5px;border-radius:3px;width:40%'>"+
                                                                "<span style ='margin-left:70px'>"+
                                                                    "<span class = 'fa fa-exclamation-triangle' style = 'color:white;'> Use the new password to login</span>"+
                                                                "</span>"+
                                                            "</div>";
                                        $("div#returned_messages").html(message);
                                    }

                                    setTimeout
                                    (
                                        function()
                                        {
                                            if(user == "LOGGED IN USER")
                                            {
                                                window.location.href="home.php";
                                            }
                                            else
                                            {
                                                getUsers('administration');
                                            }
                                        },
                                        1500
                                    );
                                },
                                1500
                            );
                        }

                        else if(statusMessage == -1)
                        {
                            var errorMessage = "<div style ='color:white;margin-left:40px;background-color:red;padding:5px;border-radius:3px;width:40%'>"+
                                                    "<span style ='margin-left:70px'>"+
                                                        "<span class = 'fa fa-ok' style = 'color:white;'> Error. Password not updated</span>"+
                                                    "</span>"+
                                                "</div>";
                            $("div#returned_messages").html(errorMessage);
                            //Clear the error message after 1500 ms
                            setTimeout
                            (
                                function()
                                {
                                    $("div#returned_messages").empty();
                                    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> CHANGE YOUR PASSWORD");
                                },
                                1500
                            );
                        }
                    }
                );
            }
        }
    }
}
// END FUNCTION
/*--------------------------------------------------------------------------------------------------------------------------------*/

// Function changePassword()
function changePassword(userName)
{
    $.get("client/templates/changepassword.php").then
    (
        function(responseData) 
        {
            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> CHANGE YOUR PASSWORD");
            $('div#facilities').empty();
            $('div#facilities').append(responseData);
            $('div#user').append(userName);
        }
    );
}
// End function
/* -------------------------------------------------------------------------------------------------------------------------------*/

//function adminEditPassword()
function adminEditPassword(userID, userName)
{
    $.get("client/templates/changepassword.php").then
    (
        function(responseData) 
        {
            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> CHANGE <span style='color:blue'>"+userName+"'s</span> PASSWORD");
            $('div#facilities').empty();
            $('div#facilities').append(responseData);
            $('div#user').append(userName);

            var submitButton = " <button id = 'update_password' type='submit' class='btn btn-success' style = 'margin-left:300px' onclick='javascript:updateUserPassword(\""+userID+"\");'>Submit!</button>";
            //$('#update_password').empty();
            $('#update_password').replaceWith(submitButton);
        }
    );
}
//End function
/* --------------------------------------------------------------------------------------------------------------------------------*/
// function updateUserProfile()
function updateUserProfile(userID, userName)
{
    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> UPDATE YOUR PROFILE<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Edit your profile information</span></span>");
    $('div#facilities').empty();
    // Get existing user details
    var userDetailsUrl = "db/fetch/get_individual_user.php";
    $.ajax
    ({
        type: 'GET',
        url: userDetailsUrl,
        data:{user:userID},
        dataType: 'json',
        contentType: 'application/json',
        success: function (userData) 
        {
            var data = "<div class='panel-heading' style = 'height:auto;width:60%;margin-right:10px;margin-bottom:5px;background-color:;border:1px solid #a4d2a3;'>"+
                    // User Name
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Name:</span>"+
                        "<input id = 'user_name' type='text' class='form-control' placeholder='"+userData[0].name+"' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    // Username
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Username:</span>"+
                        "<input id = 'login_username' type='text' class='form-control' placeholder='"+userData[1].username+"' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    // User email
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Email:</span>"+
                        // <span class = 'fa fa-envelope-o' style = 'color:red;margin-left:10px'></span>
                        "<input id = 'user_email' type='text' class='form-control' placeholder='"+userData[0].email+"' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    // Phone
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Phone:</span>"+
                        "<input id = 'user_phone_no' type='text' class='form-control' placeholder='"+userData[0].mobile_no+"' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    "<button type='submit' class='btn btn-info' style = 'margin-left:280px' onclick='javascript:userOperations(\"update\",\"User Update\",\""+userID+"\");'>Update</button>"+
                "</div>";    
            $('div#facilities').append(data);
        }
    });
}
// END FUNCTION
/*-------------------------------------------------------------------------------------------------------------------------------------------------------*/

// function editUsers()
// Used by data administrators to change user details
function editUsers(userID, userName)
{
    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'> EDIT USER DETAILS<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt;margin-left:30px'>Edit "+userName+"'s profile</span></span>");
    $('div#facilities').empty();
    // Get existing user details
    var userDetailsUrl = "db/fetch/get_individual_user.php";
    $.ajax
    ({
        type: 'GET',
        url: userDetailsUrl,
        data:{user:userID},
        dataType: 'json',
        contentType: 'application/json',
        success: function (userData) 
        {
            var data = "<div class='panel-heading' style = 'height:auto;width:60%;margin-right:10px;margin-bottom:5px;background-color:;border:1px solid #a4d2a3;'>"+
                    // User Name
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Name:</span>"+
                        "<input id = 'user_name' type='text' class='form-control' placeholder='"+userData[0].name+"' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    // Username
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Username:</span>"+
                        "<input id = 'login_username' type='text' class='form-control' placeholder='"+userData[1].username+"' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    //User Gender
                    "<div class='form-group' id = 'gender_panel' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Gender:</span>"+
                        "<select id = 'user_gender' class='form-control' style = 'margin-top:-25px;margin-left:150px'>"+                            
                        "</select>"+
                    "</div>"+
                                // User email
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Email:</span>"+
                        // <span class = 'fa fa-envelope-o' style = 'color:red;margin-left:10px'></span>
                        "<input id = 'user_email' type='text' class='form-control' placeholder='"+userData[0].email+"' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    // Phone
                    "<div class='form-group' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>Phone:</span>"+
                        "<input id = 'user_phone_no' type='text' class='form-control' placeholder='"+userData[0].mobile_no+"' style = 'margin-top:-25px;margin-left:150px'>"+
                    "</div>"+
                    // User Role
                    "<div class='form-group' id = 'user_role_area' style = 'width:40%'>"+
                        "<span style = 'color;padding:5px'>User Role:</span>"+
                        "<select id = 'user_role' class='form-control' style = 'margin-top:-25px;margin-left:150px'>"+                            
                        "</select>"+
                    "</div>"+
                    "<button type='submit' class='btn btn-info' style = 'margin-left:280px' onclick='javascript:userOperations(\"update\",\"Admin Edit\",\""+userID+"\");'>Update</button>"+
                "</div>";    
            $('div#facilities').append(data);

            //User Gender
            if(userData[0].gender == "MALE")
            {
                var genderOptions = "<option value = 'MALE'>MALE</option>"+
                                    "<option value = 'FEMALE'>FEMALE</option>";
                $('select#user_gender').append(genderOptions);
            }

            else if(userData[0].gender == "FEMALE")
            {
                var genderOptions = "<option value = 'FEMALE'>FEMALE</option>"+
                                    "<option value = 'MALE'>MALE</option>";
                $('select#user_gender').append(genderOptions);
            }

            else
            {
                var genderOptions = "<option value = ''>NOT AVAILABLE</option>"+
                                    "<option value = 'FEMALE'>FEMALE</option>"+
                                    "<option value = 'MALE'>MALE</option>";
                $('select#user_gender').append(genderOptions);
            }

            //User role
            if(userData[1].role == "ADMIN")
            {
                var roleOptions =   "<option value = 'ADMIN'>ADMIN</option>"+
                                    "<option value = 'READ'>READ</option>"+
                                    "<option value = 'WRITE'>WRITE</option>";
                $('select#user_role').append(roleOptions);
            }

            else if(userData[1].role == "WRITE")
            {
                var roleOptions =   "<option value = 'WRITE'>WRITE</option>"+
                                    "<option value = 'ADMIN'>ADMIN</option>"+
                                    "<option value = 'READ'>READ</option>";
                $('select#user_role').append(roleOptions);
            }

            else if(userData[1].role == "READ")
            {
                var roleOptions =   "<option value = 'READ'>READ</option>"+
                                    "<option value = 'WRITE'>WRITE</option>"+
                                    "<option value = 'ADMIN'>ADMIN</option>";
                $('select#user_role').append(roleOptions);
            }
        }
    });
}
// End function
/* --------------------------------------------------------------------------------------------------------------------------*/

// functin detailedUserProfile()
function detailedUserProfile(userID, userName)
{
    $('div#returned_messages').html("<span style = 'color:green;margin-left:30px'>"+userName+" DETAILS</span>");
    $('div#facilities').empty();
    // Get existing user details
    var userDetailsUrl = "db/fetch/get_individual_user.php";
    $.ajax
    ({
        type: 'GET',
        url: userDetailsUrl,
        data:{user:userID},
        dataType: 'json',
        contentType: 'application/json',
        success: function (userData) 
        {
            var userDetails =   "<div class = 'row'>"+
                                    //USER DETAILS
                                    "<div class='col-md-3 panel-heading' style = 'height:400px;width:40%;margin-right:px;margin-bottom:5px;background-color:;border:1px solid #a4d2a3;'>"+
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>User Identifier:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[0].user_identifier+
                                            "</div>"+
                                        "</div>"+
                                        // User Name
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Name:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[0].name+
                                            "</div>"+
                                        "</div>"+
                                        //User Gender
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Gender:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[0].gender+
                                            "</div>"+
                                        "</div>"+
                                        // User email
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Email:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[0].email+
                                            "</div>"+
                                        "</div>"+
                                        // Phone
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Phone:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[0].mobile_no+
                                            "</div>"+
                                        "</div>"+
                                        // Date Registered
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Registered On:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[0].date_created+
                                            "</div>"+
                                        "</div>"+
                                        // Registered by
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Registered By:</span>"+
                                            "<div id = 'user_details_created_by' class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[0].created_by+
                                            "</div>"+
                                        "</div>"+
                                        // Date details updated
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Last Update:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[0].details_last_updated+
                                            "</div>"+
                                        "</div>"+
                                        // Registered by
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Updated By:</span>"+
                                            "<div id = 'user_details_updated_by' class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[0].details_updated_by+
                                            "</div>"+
                                        "</div>"+
                                        "<button class = 'pull-right btn btn-info btn-sm' onclick='editUsers(\""+userData[0].user_identifier+"\",\""+userData[0].name+"\")'>Update</button>"+
                                    "</div>"+

                                    // ACCOUNT DETAILS
                                    "<div class='col-md-3 panel-heading' style = 'height:400px;width:40%;margin-left:5px;margin-bottom:5px;background-color:;border:1px solid #a4d2a3;'>"+
                                        // Username
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Username:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].username+
                                            "</div>"+
                                        "</div>"+
                                        // User Role
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>User Role:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].role+
                                            "</div>"+
                                        "</div>"+
                                        //
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Last Login:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].last_login+
                                            "</div>"+
                                        "</div>"+
                                        //
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Created On:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].account_created+
                                            "</div>"+
                                        "</div>"+
                                        //
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Created By:</span>"+
                                            "<div id = 'account_created_by' class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].account_created_by+
                                            "</div>"+
                                        "</div>"+
                                        //
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Details Updated:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].details_last_updated+
                                            "</div>"+
                                        "</div>"+
                                        //
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Updated By:</span>"+
                                            "<div id = 'account_details_updated_by' class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].details_last_updated_by+
                                            "</div>"+
                                        "</div>"+
                                        "<button class = 'pull-right btn btn-info btn-sm' onclick='editUsers(\""+userData[0].user_identifier+"\",\""+userData[0].name+"\")'>Update</button>"+
                                    "</div>"+

                                    // ACCOUNT STATUS
                                    "<div class='col-md-3 panel-heading' style = 'height:200px;width:40%;margin-left:px;margin-bottom:5px;background-color:;border:1px solid #a4d2a3;'>"+
                                        //
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Account Status:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].account_status+
                                            "</div>"+
                                        "</div>"+
                                        //
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Last Update:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].account_status_last_updated+
                                            "</div>"+
                                        "</div>"+
                                        //
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Updated By:</span>"+
                                            "<div id = 'account_status_updated_by' class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].account_status_updated_by+
                                            "</div>"+
                                        "</div>"+
                                        "<button id = 'btn_account_status_change' class = 'pull-right btn btn-danger btn-sm' onclick='userOperations(\"deactivate\",\"user\",\""+userData[0].user_identifier+"\",\""+userData[0].name+"\")'>Deactivate</button>"+
                                    "</div>"+

                                    // PASSWORD STATUS
                                    "<div class='col-md-3 panel-heading' style = 'height:200px;width:40%;margin-left:5px;margin-bottom:5px;background-color:;border:1px solid #a4d2a3;'>"+
                                        //
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Password Status:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].password_status+
                                            "</div>"+
                                        "</div>"+
                                        //
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Password Expires:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].password_expiry+
                                            "</div>"+
                                        "</div>"+
                                        //
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Last Update:</span>"+
                                            "<div class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].password_last_updated+
                                            "</div>"+
                                        "</div>"+
                                        //
                                        "<div class='form-group' style = 'width:70%'>"+
                                            "<span style = 'color;padding:5px'>Updated By:</span>"+
                                            "<div id = 'password_last_updated_by' class='form-control' style = 'margin-top:-25px;margin-left:115px'>"+
                                            userData[1].password_last_updated_by+
                                            "</div>"+
                                        "</div>"+
                                        "<button class = 'pull-right btn btn-success btn-sm' onclick='adminEditPassword(\""+userData[0].user_identifier+"\",\""+userData[0].name+"\")'>Change Password</button>"+
                                    "</div>"+
                                "</div>";  
            $('div#facilities').append(userDetails);

            if(userData[1].account_status == "DEACTIVATED")
            {
                $('#btn_account_status_change').replaceWith("<button id = 'btn_account_status_change' class = 'pull-right btn btn-success btn-sm' onclick='userOperations(\"activate\",\"user\",\""+userData[0].user_identifier+"\",\""+userData[0].name+"\")'>Activate</button>");
            }

            // Get user who created user details
            $.ajax
            ({
                type: 'GET',
                url: userDetailsUrl,
                data:{user:userData[0].created_by},
                dataType: 'json',
                contentType: 'application/json',
                success: function (theUser) 
                {
                    var identifiedUser = "<span class = 'unclickedColor' onclick = 'detailedUserProfile(\""+theUser[0].user_identifier+"\",\""+theUser[0].name+"\")'>"+theUser[0].name+"</span>";
                    $("div#user_details_created_by").html(identifiedUser);
                }
            });

            // Get user who updated user details
            $.ajax
            ({
                type: 'GET',
                url: userDetailsUrl,
                data:{user:userData[0].details_updated_by},
                dataType: 'json',
                contentType: 'application/json',
                success: function (theUser) 
                {
                    var identifiedUser = "<span class = 'unclickedColor' onclick = 'detailedUserProfile(\""+theUser[0].user_identifier+"\",\""+theUser[0].name+"\")'>"+theUser[0].name+"</span>";
                    $("div#user_details_updated_by").html(identifiedUser);
                }
            });

            // Get user who created account
            $.ajax
            ({
                type: 'GET',
                url: userDetailsUrl,
                data:{user:userData[1].account_created_by},
                dataType: 'json',
                contentType: 'application/json',
                success: function (theUser) 
                {
                    var identifiedUser = "<span class = 'unclickedColor' onclick = 'detailedUserProfile(\""+theUser[0].user_identifier+"\",\""+theUser[0].name+"\")'>"+theUser[0].name+"</span>";
                    $("div#account_created_by").html(identifiedUser);
                }
            });

            // Get user who updated account details
            $.ajax
            ({
                type: 'GET',
                url: userDetailsUrl,
                data:{user:userData[1].details_last_updated_by},
                dataType: 'json',
                contentType: 'application/json',
                success: function (theUser) 
                {
                    var identifiedUser = "<span class = 'unclickedColor' onclick = 'detailedUserProfile(\""+theUser[0].user_identifier+"\",\""+theUser[0].name+"\")'>"+theUser[0].name+"</span>";
                    $("div#account_details_updated_by").html(identifiedUser);
                }
            });

            // Get user who updated account status
            $.ajax
            ({
                type: 'GET',
                url: userDetailsUrl,
                data:{user:userData[1].account_status_updated_by},
                dataType: 'json',
                contentType: 'application/json',
                success: function (theUser) 
                {
                    var identifiedUser = "<span class = 'unclickedColor' onclick = 'detailedUserProfile(\""+theUser[0].user_identifier+"\",\""+theUser[0].name+"\")'>"+theUser[0].name+"</span>";
                    $("div#account_status_updated_by").html(identifiedUser);
                }
            });

            // Get user who updated account password
            $.ajax
            ({
                type: 'GET',
                url: userDetailsUrl,
                data:{user:userData[1].password_last_updated_by},
                dataType: 'json',
                contentType: 'application/json',
                success: function (theUser) 
                {
                    var identifiedUser = "<span class = 'unclickedColor' onclick = 'detailedUserProfile(\""+theUser[0].user_identifier+"\",\""+theUser[0].name+"\")'>"+theUser[0].name+"</span>";
                    $("div#password_last_updated_by").html(identifiedUser);
                }
            });
        }
    });
}