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
    
    // Database connection parameters
    $servername = "localhost";
    $username = "root";
    $password = "1234pass";
    $dbname = "msh";

    // Create connection
    $conn = new mysqli($servername, $username, $password,$dbname);

    // Check connection
    if ($conn->connect_error) 
    {
        die("Connection failed: " . $conn->connect_error);
    }

    /*Success Message*/
    //echo "Connected successfully";
?> 
