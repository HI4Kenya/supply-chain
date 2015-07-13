<?php
    // Require system config file
    require '../../system/config.php';

    session_start();
    // Validate a user has logged in
    // If not logged in, redirect to the log in page
    if(!isset($_SESSION['login_id']))
    {
        header('Location:../../');
    }
    else
    {
        // If user has logged in
    	require '../db_auth/db_con.php';

        $program_id = $_GET['program'];
        $data = array();

        // Number of sub-county stores
        $subcounty_stores = "SELECT * FROM facility_program_mapping WHERE program_id ='$program_id'
        AND classification = 'Sub-County Store'";
        $subcounty_stores_response = mysqli_query($conn,$subcounty_stores);
        $data[] = mysqli_num_rows($subcounty_stores_response);

        // Number of central sites
        $central_sites = "SELECT * FROM facility_program_mapping WHERE program_id ='$program_id'
        AND classification = 'Central Site'";
        $central_sites_response = mysqli_query($conn,$central_sites);
        $data[] = mysqli_num_rows($central_sites_response);

        // Number of satellite sites
        $satellite_sites = "SELECT * FROM facility_program_mapping WHERE program_id ='$program_id'
        AND classification = 'Satellite Site'";
        $satellite_sites_response = mysqli_query($conn,$satellite_sites);
        $data[] = mysqli_num_rows($satellite_sites_response);

        // Number of standalone sites
        $standalone_sites = "SELECT * FROM facility_program_mapping WHERE program_id ='$program_id'
        AND classification = 'StandAlone'";
        $standalone_sites_response = mysqli_query($conn,$standalone_sites);
        $data[] = mysqli_num_rows($standalone_sites_response);

        // Number of datasets
        $datasets = "SELECT * FROM datasets WHERE program_id ='$program_id'";
        $datasets_response = mysqli_query($conn,$datasets);
        $data[] = mysqli_num_rows($datasets_response);

        // Append the program id at the last position
        $data[]=$program_id;

        $return = json_encode($data);
        echo $return;

    	mysqli_close($conn);
    }
?> 