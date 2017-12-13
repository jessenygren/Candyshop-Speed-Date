<?php

include 'connectionObject.php';

$post = file_get_contents('php://input');

$json   = json_decode($post);

//For testing

//$json->Action = "logout";
$json = new stdClass();

$json->Action="readmessage";
$json->UserSessionID="WGpG6eeaNjQ1nUclD2HPDmvWY5m73V";
$json->SessionID="IsmENca4W6U2qQSxC5WFQsqqAf1bTb";





//Creates new connection. .
$Connection = new connectionObject();

//Action. User is authenticated before any action. Returns json-object.
echo $Connection->action($json);

?>