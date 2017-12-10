<?php

include 'connectionObject.php';

$post = file_get_contents('php://input');

$json   = json_decode($post);

//For testing

//$json->Action = "logout";
$json = new stdClass();

$json->Action="readconvo";
$json->UserSessionID="qVJT00pbo3nRCUuYUqqrqLQQRSSTx1";
$json->SessionID="D7YPAnz1r6KTiza4wzj2oZtGQVx3dS";





//Creates new connection. .
$Connection = new connectionObject();

//Action. User is authenticated before any action. Returns json-object.
echo $Connection->action($json);

?>