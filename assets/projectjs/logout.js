/*Function*/
function userSignout()
{
    var confirmLogOut = confirm("CONFIRM LOGOUT");
    if(confirmLogOut)
    {
        // Send a destroy session request 
        window.location.href="db/user_auth/sess_unset.php";
    }
}
/*--------------------------------------------------------------------------------------------------------------------------------*/