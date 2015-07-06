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

        $program = $_GET['program'];
        $data = array();

        $program_datasets = "SELECT * FROM datasets WHERE program_id = '$program'";
        $answer = mysqli_query($conn,$program_datasets);
        if(mysqli_num_rows($answer)>0)
        {
            $datasetID = array();
            $count = 0;
            while($row = mysqli_fetch_assoc($answer)) 
            {
                $datasetID[]= $row['dataset_id'];
                $count = $count+1;
            }

            $i=0;
            for($i=0;$i<$count;$i++)
            {
                $id = $datasetID[$i];
                $datasets = "SELECT * FROM dhis_datasets WHERE dataset_id='$id'";
                $result = mysqli_query($conn,$datasets);
                if(mysqli_num_rows($result)>0)
                {
                    while($row = mysqli_fetch_assoc($result)) 
                    {
                        $data[] = $row;
                    }
                }
            }
            $return = json_encode($data);
            echo $return;
        }

    	mysqli_close($conn);
    }
?> 