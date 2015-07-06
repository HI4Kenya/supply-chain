<?php
    
    session_start();

    $_SESSION["login_id"] = $row['login_id'];
    $_SESSION["user_role"] = $row['role'];
    $_SESSION["user_id"] = $row['user_id'];
    $_SESSION["password_status"] = $row['password_status'];

    $this_user = $row['user_id'];

    $get_user_details = "SELECT * FROM users WHERE user_identifier = '$this_user'";
    $response = mysqli_query($conn,$get_user_details);
    if(mysqli_num_rows($response)>0)
    {
        while($the_user_row = mysqli_fetch_assoc($response))
        {
            $_SESSION["name"]=$the_user_row['name'];
        }
    }

?>