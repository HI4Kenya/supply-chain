/*Function*/
$(document).ready(function(){
	// function userSignout(logoutBtn)
	// {

	    $(".user_logout_button").confirm({
		    text: "Are you sure you want to logout?",
		    title: "CONFIRM LOGOUT",
		    confirm: function(button) 
		    {
		        window.location.href="db/user_auth/sess_unset.php";
		    },

		    cancel: function(button) 
		    {
		        // nothing to do
		    },

		    confirmButton: "YES",
		    cancelButton: "CANCEL",
		    post: true,
		    confirmButtonClass: "btn-danger",
		    cancelButtonClass: "btn-default",
		    dialogClass: "modal-dialog modal-sm" // Bootstrap classes for large modal
		});
	// }

});
/*--------------------------------------------------------------------------------------------------------------------------------*/