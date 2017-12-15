<?php
//Tiedosto joka välittää eteenpäin käyttäjän kyselyt. Mahdollistaa modulaarisuuden.
include 'connectionObject.php';

$post = file_get_contents('php://input');

$json   = json_decode($post);


//Creates new connectionObject. 
$Connection = new connectionObject();

//Action. User is authenticated before any action. Returns json-object and destroys Connectionobject
echo $Connection->action($json);
unset($Connection);

?>