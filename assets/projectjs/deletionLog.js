// Function getDeletionLog()
function getDeletionLog()
{
	$('div#returned_messages').html("<span style = 'color:green;margin-left:30px;'> DELETED DATA</span>");

    var data =  "<div class='panel-body' style = 'margin-left:-30px;margin-top:-30px'>"+
                    "<table id= 'deleteddata' style = 'border-radius:5px'>"+
                    "<thead>"+
                        "<th style = 'font-weight:bold'>#</th>"+
                        "<th style = 'font-weight:bold'>NO Deleted</th>"+
                        "<th style = 'font-weight:bold'>Data Deleted</th>"+
                        "<th style = 'font-weight:bold'>What was Deleted</th>"+
                        "<th style = 'font-weight:bold'>Date Deleted</th>"+
                        "<th style = 'font-weight:bold'>Deleted By</th>"+
                        "<th style = 'font-weight:bold;color:green'>Recover</th>"+ 
                        "<th style = 'font-weight:bold;color:red'>Delete Permanently</th>"+                              
                    "</thead>"+
                    "<tbody>"+
                    "</tbody>"+
                    "</table>"+
                "</div>";
    // Append
    $('div#facilities').html(data);

    //Fetch deletion logs
    var deleted_data_url = "db/fetch/get_deletion_logs.php";
    
    $.getJSON
    (
        deleted_data_url,
        function(response)
        {
            for(var counting=0; counting<response.length;counting++)
            { 
                var itemNumber = counting+1;

                var dataToAppend = "<tr>"+
                                        "<td>"+itemNumber+"</td>"+
                                        "<td style = 'text-align:left'>"+response[counting].number_deleted+"</td>"+
                                        "<td style = 'text-align:left'>"+response[counting].deleted_item_id+"</td>"+
                                        "<td style = 'text-align:left'>"+response[counting].deleted_item_name+"</td>"+
                                        "<td style = 'text-align:left'>"+response[counting].date_deleted+"</td>"+
                                        "<td style = 'text-align:left' id = 'deleted_by_user_"+response[counting].deleted_by+"'>"+
                                        	response[counting].deleted_by+
                                        "</td>"+
                                        
                                        "<td class = 'fa fa-recycle' style = 'color:green;cursor: pointer;'"+
                                            "onclick='javascript:recoverData(\""+response[counting].id+"\");'>"+
                                        "</td>"+
                                        "<td class = 'fa fa-times' style = 'color:red;cursor: pointer;'"+
                                            "onclick='javascript:deleteDataPermanently(\""+response[counting].id+"\");'>"+
                                        "</td>"+
                                    "</tr>";
                $(dataToAppend).appendTo("#deleteddata tbody");
                
                // Get existing user details
    			var userDetailsUrl = "db/fetch/get_individual_user.php";
                // Get user who deleted these details
	            $.ajax
	            ({
	                type: 'GET',
	                url: userDetailsUrl,
	                data:{user:response[counting].deleted_by},
	                dataType: 'json',
	                contentType: 'application/json',
	                success: function (theUser) 
	                {
	                    var identifiedUser = "<span class = 'unclickedColor' onclick = 'detailedUserProfile(\""+theUser[0].user_identifier+"\",\""+theUser[0].name+"\")'>"+theUser[0].name+"</span>";
	                    $("#deleted_by_user_"+theUser[0].user_identifier).html(identifiedUser);
	                }
	            });
            }  
        }
    );
    // $(function()
    // {
    //     $("#deleteddata").dataTable();
    // })
}

/* ------------------------------------------------------------------------------------------------------------------------ */
// function recoverData()
function recoverData(logID)
{
    // Prompt to confirm the action
    var confirmAction=confirm("ARE YOU SURE YOU WANT TO RESTORE THIS ITEM?");
    if(confirmAction)
    {
        var dataRecoveryUrl = "db/recovery/data_recovery.php";
        $.post
        (
            dataRecoveryUrl,
            {log_id:logID},
            function(response)
            {
                if(response == -1)
                {
                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                            "<span style ='margin-left:80px'>"+
                                                "An Error Occured"+
                                            "</span>"+
                                        "</div>";
                    $("div#returned_messages").html(errorMessage);
                    //Clear the error message after 1500 ms
                    setTimeout
                    (
                        function()
                        {
                            $("div#returned_messages").empty();
                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px;'> DELETED DATA</span>");
                            getDeletionLog();
                        },
                        1500
                    );

                }

                else if(response == 0)
                {
                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:blue;padding:5px;border-radius:3px;width:40%'>"+
                                            "<span style ='margin-left:80px'>"+
                                                "Data Restored"+
                                            "</span>"+
                                        "</div>";
                    $("div#returned_messages").html(errorMessage);
                    //Clear the error message after 1500 ms
                    setTimeout
                    (
                        function()
                        {
                            $("div#returned_messages").empty();
                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px;'> DELETED DATA</span>");
                            getDeletionLog();
                        },
                        1500
                    );
                }

            }
        );

    }
}

/* ------------------------------------------------------------------------------------------------------------------------ */
// function deleteDataPermanently()
function deleteDataPermanently(logID)
{
    // Prompt to confirm the delete action
    var confirmAction=confirm("ARE YOU SURE YOU WANT TO PERMANENTLY DELETE THIS ITEM?\nOnce deleted permanently it may not be recovered");
    if(confirmAction)
    {
        var deleteDataPermanently = "db/deletion/delete_data_permanently.php";
        $.post
        (
            deleteDataPermanently,
            {log_id:logID},
            function(response)
            {
                if(response == -1)
                {
                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:#b64645;padding:5px;border-radius:3px;width:40%'>"+
                                            "<span style ='margin-left:80px'>"+
                                                "An Error Occured"+
                                            "</span>"+
                                        "</div>";
                    $("div#returned_messages").html(errorMessage);
                    //Clear the error message after 1500 ms
                    setTimeout
                    (
                        function()
                        {
                            $("div#returned_messages").empty();
                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px;'> DELETED DATA</span>");
                            getDeletionLog();
                        },
                        1500
                    );

                }

                else if(response == 0)
                {
                    var errorMessage = "<div style ='color:white;margin-left:40px;background-color:blue;padding:5px;border-radius:3px;width:40%'>"+
                                            "<span style ='margin-left:80px'>"+
                                                "Item Deleted"+
                                            "</span>"+
                                        "</div>";
                    $("div#returned_messages").html(errorMessage);
                    //Clear the error message after 1500 ms
                    setTimeout
                    (
                        function()
                        {
                            $("div#returned_messages").empty();
                            $('div#returned_messages').html("<span style = 'color:green;margin-left:30px;'> DELETED DATA</span>");
                            getDeletionLog();
                        },
                        1500
                    );
                }

            }
        );
        
    }

}