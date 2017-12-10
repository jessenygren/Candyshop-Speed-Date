<?php
/*
Adding new Note using prepared statements. POST request
ID


Verneri Närhi
*/
//Reading get or post request

//id = $_REQUEST["id"];
 // $jsonobject = $_REQUEST;
  $obj = json_decode($_REQUEST["x"], false);
 
  /*
  //$noteid = 8;
  $EmployerID = 2; 
  $WorkerID = 3;
  $Note= "TESTESTTEST!!!";
  $WorkID = 6;
  */

//Sql database configuration variables.

$servername = getenv('IP');
$username = getenv('C9_USER');
$password = "";
$database = "NanoJobDB";
$port = 3306;

//Connecting to database.
$db = new mysqli($servername,$username,$password,$database,$port);

//Testing if connection was succesfull. If not -> Exit return error message.
if ($db->connect_error) {
    die("NO CONNECTION . $db->connect_error");
}


if ($statement = $db->prepare("INSERT INTO NOTE(EmployerID,
WorkerID, Note, WorkID)VALUES (?,?,?,?)")) {
$statement->bind_param("iisi", $obj->EmployerID,$obj->WorkerID, $obj->Note, $obj->WorkID);
    
 //Executing query
$statement->execute();

echo "DONE!";

//Closing $statement
$statement->close();
}
else {
    
    echo $db->error;
}


$db->close();


?>