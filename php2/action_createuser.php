<?php

include 'createUser.php';

$post = file_get_contents('php://input');

$json   = json_decode($post);

//For testing


//$json->Username = "MOIII";
//$json->Password = "asdsad";
//$json->Sex = "ALFA";
//$json->Prefer = 3;



//Creates new connection.
$Connection = new createUser();

 
echo $Connection->addUser($json);

?>