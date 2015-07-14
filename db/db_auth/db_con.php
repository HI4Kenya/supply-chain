<?php
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
    **
    *..................................................................................*/
    
    # System config script include
    require '../../system/config.php';

    # Database connection parameters
    $servername = $server;
    $username = $user;
    $authentication = $password;
    $dbname = $database;

    # Create connection
    $conn = new mysqli($servername, $username, $authentication, $dbname);

    # Check connection
    if ($conn->connect_error) 
    {
        die("Connection failed: " . $conn->connect_error);
    }

    /*Success Message*/
    //echo "Connected successfully";
?> 
