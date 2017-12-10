<?php
/*
Completing job using prepared statements. POST request
Updates Completed field to value 1


Verneri Närhi
*/
//Reading get or post request

//id = $_REQUEST["id"];
 // $jsonobject = $_REQUEST;
  
  
  $WorkID = $_REQUEST["x"]; 
  

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

//Preparing Update statement
if ($statement = $db->prepare("UPDATE WORK SET Completed = 1 WHERE WorkID = ?")) {
$statement->bind_param("i", $WorkID);

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