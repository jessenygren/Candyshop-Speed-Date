<?php
include 'Authenticate.php';

$post = file_get_contents('php://input');

$json   = json_decode($post);

$UserIDD =  authentiCATE($json->UserSessionID, $json->SessionID);


if ($UserIDD == 0) {
    
    $userObject = new stdClass();
    
    $userObject->isitVALID = false;
    $userObject->expl = "PLEASE LOGIN AGAIN!";
    $userJSON              = json_encode($userObject);
    die ($userJSON);
}

$servername = getenv('IP');
$username   = getenv('C9_USER');
$password   = "";
$database   = "MashleyDB";
$port       = 3306;

//Connecting to database.
$db = new mysqli($servername, $username, $password, $database, $port);

//Testing if connection was succesfull. If not -> Exit return error message.
if ($db->connect_error) {
     $userObject = new stdClass();
    
    $userObject->isitVALID = false;
    $userObject->expl = "DB CONNECTION FAILURE!";
    $userJSON              = json_encode($userObject);
    die ($userJSON);
}
    
if ($statement = $db->prepare("UPDATE USER SET SessionID=NULL, UserSessionID=NUll WHERE UserID = ?")) {
    $statement->bind_param('i', $UserIDD);
    
    //Päivittää SessionID
    $statement->execute();
    $userObject = new stdClass();
    
    $userObject->isitVALID = true;
    $userObject->expl = "DONE!";
    $userJSON              = json_encode($userObject);
    echo ($userJSON);
   
  
}
$db->close();




?> 