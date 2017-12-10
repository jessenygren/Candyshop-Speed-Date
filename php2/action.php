<?php

include 'connectionObject.php';

$post = file_get_contents('php://input');

$json   = json_decode($post);

//For testing

//$json->Action = "logout";
//$json = new stdClass();
//$json->Action="readuser";
//$json->UserSessionID="rukkanen";
//$json->SessionID="nolis";





//Creates new connection. 
$Connection = new connectionObject();

//Action. User is authenticated before any action. Returns json-object.
echo $Connection->action($json);
unset($Connection);

?>