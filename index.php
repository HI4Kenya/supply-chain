<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>MSH|Login</title>
        <script src="http://s.codepen.io/assets/libs/modernizr.js" type="text/javascript"></script>
        <link href="assets/css/normalize.css" rel="stylesheet">
        <link href="assets/css/login.css" rel="stylesheet">
<<<<<<< HEAD
        <script type="text/javascript" src="assets/js/loginjs/prefixfree.min.js"></script>
        <script type="text/javascript" src="assets/js/projectjs/mshTask.js"></script>
=======

        <!-- jQuery v1.11.2 library-->
        <script type="text/javascript" src="assets/projectjs/jquery.min.js"></script>

        <!-- Login js -->
        <script type="text/javascript" src="assets/projectjs/login.js"></script>
        <script type="text/javascript" src="assets/js/loginjs/prefixfree.min.js"></script> 
>>>>>>> wahome_branch
    </head>

    <body style = "background-color:#1d5288">

        <div style = "background-color:;width:100%;height:10em;text-align:left;">
          <img style ='width:10%;height:50%;margin-left:50px;margin-top:20px;margin-right:10px;float:left;border:1px solid white' 
          src='assets/img/KenyaFlagImage1.png'>
          <h3>
            <p style = 'color:white;padding-top:20px;margin-left:180px;font-family:FontAwesome'>
              Supply Pipeline Hierarchy Tool
            </p>
          </h3>

          <h4>
            <p style = 'color:white;padding-top:px;margin-left:150px;font-family:arial;font-weight:normal'>
              Welcome to the Kenya Health <br>
              Information System
            </p>
          </h4>
        </div>

        <div class="login" style = "width:">
            <!-- Messages -->
            <div id = "login_messages"></div>

            <div class="photo"></div>
            <p class="name hidden" id="name"></p>
            <div class="username-wrap">
                <input type="username" class="username" placeholder="Username" id="username-input" title = "Type in your username and click enter" autofocus/>
            </div>
            <div class="pw-box">
                <span class="flap">
                    <div class="inner"></div>
                    <div class="spine"></div>
                    <div class="outer"></div>
                </span>
                <span class="shadow"></span>
                <input id = "password-input" type="password" class="password" placeholder="Password" onchange="javascript:userAuthentication();" title="Enter your password and hit enter" autofocus/>
            </div>
        </div>

        <div id="footerArea" style = "margin-top:450px;text-align:left;border-top:1px solid white;font-family:LiberationSans, sans-serif;font-size:10pt">
            <div id="leftFooterArea" class="innerFooterArea" style = 'margin-left:50px;padding-top:10px'>
                Powered by 
                <a href="http://www.twitter.com/kwahome_" style = 'color:white;margin-left:5px' target="_blank">
                    <span class = "fa fa-twitter" style ="color:;"></span>
                </a>
                <a href="https://ke.linkedin.com/in/kelvinwahome" style = 'color:white;margin-left:5px' target="_blank">
                    <span class = "fa fa-linkedin" style ="color:;"></span>
                </a>
                <a href="http://www.dhis2.org" style = 'color:white;margin-left:5px' target="_blank">DHIS 2</a>
                <span id="applicationFooter">
                  <a href="http://servicedesk.health.go.ke" style = 'color:white;margin-left:5px' target="_blank">
                    Report ANY System Problem to the Service Desk
                  </a>
                </span>
            </div>
          </div>
<<<<<<< HEAD

        <script type="text/javascript" src="assets/js/jquery-2.1.4.js"></script>
        <script type="text/javascript" src="assets/js/loginjs/index.js"></script>
=======
>>>>>>> wahome_branch
    </body>
</html>
