<!--
/***********************************************************************************
* HI4KENYA AFYAINFO BOOTCAMP 2015                                                  *
* ................................                                                 *
* GROUP ONE                                                                        *
* MSH SUPPLY CHAIN HIERARCHY PROJECT                                               *
* JUNE 2015                                                                        *
* ...................................                                              *
* KELVIN WAHOME                                                                    *
* Computer Science                                                                 *
* School of Computing and Informatics                                              *
* The University of Nairobi                                                        *
* kevowahome@gmail.com                                                             *
* .................................................................................*
**
*Copyright ©2015, All Rights Reserved, Kelvin Wahome
**
*..................................................................................*/
--> 
<html>
    <head>
        <title>MSH|Home</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- END META SECTION -->

        <!-- NOTE: jQuery before JavaScript -->
        <!-- jQuery v1.11.2 library-->
        <script type="text/javascript" src="assets/js/jquery.min.js"></script>

        <!-- jQuery v2.1.4 library-->
        <!-- $.ajax() method uses this js -->
        <script type="text/javascript" src="assets/js/jquery-2.1.4.js"></script>

        <!-- jQuery.confirm -->
        <script type="text/javascript" src="assets/js/jquery.confirm.min.js"></script>

        <!-- PROJECT JS -->  
        <script type="text/javascript" src="assets/projectjs/artReports.js"></script>      
        <script type="text/javascript" src="assets/projectjs/classification.js"></script>
        <script type="text/javascript" src="assets/projectjs/common.js"></script>
        <script type="text/javascript" src="assets/projectjs/data.js"></script>
        <script type="text/javascript" src="assets/projectjs/dataAdministration.js"></script>
        <script type="text/javascript" src="assets/projectjs/deletionLog.js"></script>
        <script type="text/javascript" src="assets/projectjs/login.js"></script>
        <script type="text/javascript" src="assets/projectjs/logout.js"></script>
        <script type="text/javascript" src="assets/projectjs/programs.js"></script>
        <script type="text/javascript" src="assets/projectjs/reports.js"></script>
        <script type="text/javascript" src="assets/projectjs/selectlist.js"></script>
        <script type="text/javascript" src="assets/projectjs/siteReports.js"></script>
        <script type="text/javascript" src="assets/projectjs/users.js"></script>
        <script type="text/javascript" src="assets/projectjs/validation.js"></script>

        <!-- bootstrap js library-->
        <script type="text/javascript" src="assets/Bootstrap/dist/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="assets/Bootstrap/dist/js/jquery-ui.min.js"></script>

        <!-- Data Tables -->
        <script type="text/javascript" src="assets/template/js/plugins/datatables/jquery.dataTables.min.js"></script>
        
        <!-- CSS -->
        <link href="assets/Bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="assets/Bootstrap/dist/css/jquery-ui.min.css" rel="stylesheet">
        <link href="assets/css/mshTask.css" rel="stylesheet" type="text/css">
        <link href="assets/css/tables.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" type="text/css" id="theme" href="assets/template/css/theme-light.css"/>

        <!-- Data Table CSS -->
        <link rel="stylesheet" type="text/css" href="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/css/jquery.dataTables.css">
        
        <!-- Font Awesome -->
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

        <!-- FONTS-->        
        <!-- <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"> -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css">
        <link href="http://fonts.googleapis.com/css?family=Josefin+Slab:100,300,400,600,700,100italic,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
    
    </head>

    <body style = "background-color:;color:black">
        
        <!--Open page container -->
        <!-- NOTE: Page container closed in footer.php -->
        <div class="page-container">
            <div class = "navbar navbar-inverse navbar-static-top" id = "header" style = "background-color: #276696">
                <div class = "header_container" id = "container-fluid">

                    <a href="" class="navbar-brand" id = "logo">
                        <p style = "color:white;font-weight:bold;margin-left:10px;font-size:16pt">
                            <!-- <img style ='width:10%;height:200%;margin-left:px;margin-top:0px;margin-right:10px;float:left;border:1px solid white' src='assets/img/logos/HCSM Logo Color.png'> -->
                            <b style = "margin-left:120px">Supply Pipeline Hierarchy Tool
                        </p>
                    </a>

                    <span class = "pull-right" style = "margin-right:120px;margin-top:20px">
                        <span style ="color:white;margin-right:2px">
                            <?php echo $_SESSION["name"];?>
                        </span>
                        <span style = "margin-left:">|</span>
                        <span class = "fa fa-sign-out logoutButton user_logout_button" title = "Sign Out">
                            Sign Out
                        </span>
                    </span>
                </div>
            </div>