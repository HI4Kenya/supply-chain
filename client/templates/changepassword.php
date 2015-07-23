<div class='panel-heading' style = 'height:auto;width:60%;margin-right:10px;margin-bottom:5px;background-color:;border:1px solid #a4d2a3;'>
                
    <!-- Created User Name -->
    <div class='form-group' style = 'width:40%'>
        <span style = 'color;padding:5px;color:blue'>USER:</span>
        <div id ='user'class='form-control' style = 'margin-top:-25px;margin-left:150px;background-color:#f5f5f5;'>
            <?php echo $_SESSION['name'];?>
        </div>
    </div>
    <!-- password -->
    <div class='form-group' style = 'width:40%'>
        <span style = 'color;padding:5px'>Password:</span>
        <!-- <span class = 'fa fa-envelope-o' style = 'color:red;margin-left:10px'></span>"+ -->
        <input id = 'login_password' type='password' class='form-control' placeholder='Password' style = 'margin-top:-25px;margin-left:150px'>
    </div>
    <!-- confirm password -->
    <div class='form-group' style = 'width:40%'>
        <span style = 'color;padding:5px'>Confirm Password:</span>
            <!-- <span class = 'fa fa-envelope-o' style = 'color:red;margin-left:10px'></span> -->
        <input id = 'confirm_login_password' type='password' class='form-control' placeholder='Confirm Password' style = 'margin-top:-25px;margin-left:150px'>
    </div>
    <button id = 'update_password' type='submit' class='btn btn-success' style = 'margin-left:300px' onclick='javascript:updateUserPassword("LOGGED IN USER","<?php echo $_SESSION["username"];?>","<?php echo $_SESSION["password_status"];?>");'>Submit</button>
</div>