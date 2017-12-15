<?php
//Tiedosto joka välittää eteenpäin käyttäjän kyselyn käyttäjän luomisesta. Mahdollistaa modulaarisuuden
include 'createUser.php';

$post = file_get_contents('php://input');

$json   = json_decode($post);




//Luo yhteys-olion
//Creates new connection.
$Connection = new createUser();

//Kokeilee luoda uuden käyttäjän 
echo $Connection->addUser($json);

?>