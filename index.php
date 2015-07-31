<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>MSH|Login</title>
        <script src="http://s.codepen.io/assets/libs/modernizr.js" type="text/javascript"></script>
        <link href="assets/css/normalize.css" rel="stylesheet">
        <link href="assets/css/login.css" rel="stylesheet">

        <!-- jQuery v1.11.2 library-->
        <script type="text/javascript" src="assets/js/jquery.min.js"></script>

        <!-- Login js -->
        <script type="text/javascript" src="assets/projectjs/login.js"></script>
    </head>

    <body style = "background-color:#00AEEF">

        <div style = "background-color:;height:10em;text-align:left;margin-left:560px">
            <img style ='width:18%;height:60%;margin-left:50px;margin-top:20px;margin-right:10px;float:left;border:1px solid white' 
              src='assets/img/logos/MOH.jpg'>
        </div>

        <p style = 'color:white;font-family:"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif;font-size:18pt;font-weight:bold;margin-top:-30px'>
            SUPPLY CHAIN HIERARCHY TOOL
        </p>
        <!-- Logos -->

        <div style = "width:40%;height:15%;position:absolute;margin-left:410px;margin-top:350px;border-radius:5px;color:blue">            
            <!-- <img style ='background-color:white;width:30%;height:80%;margin-left:5px;margin-top:10px;margin-right:5px;float:left;border:1px solid white' 
            src='assets/img/logos/usaid_logo.png'>

            <img style ='background-color:white;width:27%;height:80%;margin-left:5px;margin-top:10px;margin-right:5px;float:left;border:1px solid white' 
            src='assets/img/logos/Kenya-PEPFAR-Logo.png'>

            <img style ='background-color:white;width:30%;height:80%;margin-left:5px;margin-top:10px;margin-right:5px;float:left;border:1px solid white' 
            src='assets/img/logos/HCSM Logo Color.png'> -->
            <p>
                This tool was developed for the Ministry of Health by USAID- funded Health Commodities & Services Management
                Program implemented by Management Sciences for Health. Contents do not necessarily reflect the views of USAID
                or the United States Government.
            <p>
        </div>

        <!-- Login panel -->
        <div class="login">
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

        <!-- Footer -->

        <div id="footerArea" style = "margin-top:470px;text-align:left;border-top:1px solid white;font-family:LiberationSans, sans-serif;font-size:10pt">
            <div id="leftFooterArea" class="innerFooterArea" style = 'margin-left:50px;padding-top:10px'>
                Powered by 
                &nbsp
                *
                <span id="applicationFooter">
                    <a href="http://www.twitter.com/kwahome_" class = "fa fa-twitter" style = 'color:white;' target="_blank">
                    </a>
                </span>
                *
                <span id="applicationFooter">
                    <a href="https://ke.linkedin.com/in/kelvinwahome" class = "fa fa-linkedin" style = 'color:white;' target="_blank">
                    </a>
                </span>
                *
                <span id="applicationFooter">
                    <a href="http://www.dhis2.org" style = 'color:white;' target="_blank">DHIS 2</a>
                </span>
                *
                <span id="applicationFooter">
                  <a href="http://servicedesk.health.go.ke" style = 'color:white;' target="_blank">
                    Report ANY System Problem to the Service Desk
                  </a>
                </span>
                *
                <span id="applicationFooter">
                  <a href="http://dhis2-supply-chain-documentation.readthedocs.org/en/latest/index.html" style = 'color:white;' target="_blank">
                    Documentation
                  </a>
                </span>
            </div>
          </div>
    </body>
</html>
