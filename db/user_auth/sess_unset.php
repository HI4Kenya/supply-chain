<?php
	// Require system config file
    // Contains the path to the root
    require '../../system/config.php';
    session_start();
	// remove all session variables
	session_unset();
	unset($_SESSION['login_id']);
	// destroy the session
	session_destroy();

	// Redirect to the login page
	header('Location:'.$base_path.'');
?>