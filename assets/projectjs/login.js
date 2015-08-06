/***********************************************************************************
* HI4KENYA AFYAINFO BOOTCAMP 2015                                                  *
* -------------------------------                                                  *
* GROUP ONE                                                                        *
* MSH SUPPLY CHAIN HIERARCHY PROJECT                                               *
* JUNE 2015                                                                        *
* ----------------------------------                                               *
* KELVIN WAHOME                                                                    *
* Computer Science                                                                 *
* School of Computing and Informatics                                              *
* The University of Nairobi                                                        *
* kevowahome@gmail.com                                                             *
* ---------------------------------------------------------------------------------*
**
*This file contains JavaScript functions for the MSH Supply Chain Hierarchy project
*Login page
**
* ---------------------------------------------------------------------------------*/

$(document).ready
(
  function() 
  {
      var userInput = $('#username-input'),
          userWrap = $('.username-wrap'),
          user = $('#name');

      userInput.keyup(
        function (event)
        {
            if (event.which == 13) 
            {
                var usernameInput = document.getElementById("username-input");
                var username = usernameInput.value;

                if(username == "")
                {
                    // Error message no username
                    var messageToAppend =   "<div style ='color:white;background-color:#b64645;padding:5px;border-radius:3px;"+
                                                "<span style = 'color:white;background-color:red;font-size:8pt'>"+
                                                  "Please enter your username"+
                                                "</span>"+
                                            "</div>";
                    $('div#login_messages').html(messageToAppend);
                    setTimeout
                    (
                        function()
                        {
                            $('div#login_messages').empty();
                        },
                        1500
                    );
                }
                else
                {
                    var name = $(this).val();
                    user.text(name);
                    userInput.addClass('hidden');
                    userWrap.addClass('hidden');
                    user.removeClass('hidden');
                    user.parent().addClass('pw-active');
                    $('.password').focus();
                    return false; 
                }
            }
        }
      );
      
      // When a user clicks on the name
      user.click(
        function (event) 
        {
            user.addClass('hidden');
            user.parent().removeClass('pw-active'); 
            userInput.removeClass('hidden');
            userWrap.removeClass('hidden');
        }
      );
  }
);

/*Function to authenticate a user from their credentials*/
function userAuthentication()
{
    var usernameInput = document.getElementById("username-input");
    var username = usernameInput.value;

    if(username == "")
    {
        // Error message no username
        // blue #1d5288
        var messageToAppend =   "<div style ='color:white;background-color:#b64645;padding:5px;border-radius:3px;font-size:8pt"+
                                    "<span style = 'color:white;background-color:red'>Please enter a username</span>"+
                                "</div>";
        $('div#login_messages').html(messageToAppend);
    }
    else
    {
        var passwordInput = document.getElementById("password-input");
        var password = passwordInput.value;

        if(password == "")
        {
            // Error message no password
            var messageToAppend =   "<div style ='color:white;background-color:#b64645;padding:5px;border-radius:3px;font-size:8pt"+
                                        "<span style = 'color:white;background-color:red'>Please enter your password</span>"+
                                    "</div>";
            $('div#login_messages').html(messageToAppend);
            setTimeout
            (
                function()
                {
                    $('div#login_messages').empty();
                },
                1500
            );
        }
        else
        {
            $.post
            (
                'db/user_auth/auth.php',
                {user:username,password:password},
                function(statusMessage)
                {
                    if(statusMessage == 0)
                    {
                        var status_message =   "<div style ='color:white;background-color:green;padding:5px;border-radius:3px;font-size:8pt"+
                                                    "<span style = 'color:white;'>"+
                                                        "<span class = 'fa fa-check-square' style = 'color:gold'></span> Loading"+
                                                    "</span>"+
                                                "</div>";
                        $('div#login_messages').empty();
                        $('div#login_messages').html(status_message);
                        setTimeout
                        (
                            function()
                            {   
                                //window.location.href="db/user_auth/sess_set.php?user="+username+"&auth="+password;
                                window.location.href = "home.php";
                            },
                            1000
                        );
                    }

                    else if(statusMessage == 1)
                    {
                        var status_message =   "<div style ='color:white;background-color:#b64645;padding:5px;border-radius:3px;font-size:8pt"+
                                                    "<span style = 'color:white;background-color:red'>Wrong Username or Password</span>"+
                                                "</div>";
                        $('div#login_messages').empty();
                        $('div#login_messages').html(status_message);
                        setTimeout
                        (
                            function()
                            {
                                $('div#login_messages').empty();
                            },
                            1500
                        );
                    }

                    else if(statusMessage == 10)
                    {
                        var status_message =   "<div style ='color:white;background-color:#b64645;padding:5px;border-radius:3px;font-size:8pt"+
                                                    "<span style = 'color:white;background-color:red'>Deactivated Account<br>Contact Admin</span>"+
                                                "</div>";
                        $('div#login_messages').empty();
                        $('div#login_messages').html(status_message);
                        setTimeout
                        (
                            function()
                            {
                                $('div#login_messages').empty();
                            },
                            1500
                        );
                    }

                    else if(statusMessage == -1)
                    {
                        var status_message =   "<div style ='color:white;background-color:#b64645;padding:5px;border-radius:3px;font-size:8pt"+
                                                    "<span style = 'color:white;background-color:red'>Wrong Username or Password</span>"+
                                                "</div>";
                        $('div#login_messages').empty();
                        $('div#login_messages').html(status_message);
                        setTimeout
                        (
                            function()
                            {
                                $('div#login_messages').empty();
                            },
                            1500
                        );
                    }
                }
            );
        }
    }
}
/*END*/
/*----------------------------------------------------------------------------------*/
