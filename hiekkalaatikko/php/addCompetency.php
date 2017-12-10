<?php
/*
Adding new Competency POST request



Verneri Närhi
*/
//Reading get or post request


// $jsonobject = $_REQUEST;
  $obj = json_decode($_REQUEST["x"], false);
 
 console.log($obj->name) ;
  

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


if ($statement = $db->prepare("INSERT INTO COMPETENCY(Name) VALUES (?)")) {
$statement->bind_param("s", $obj->Name);
    
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