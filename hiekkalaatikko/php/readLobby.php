<?php
/*
COMPETENCY!!!

Reading Lobby table using WorkerID. POST request
ID


Verneri Närhi
*/
//Reading get or post request


//id = $_REQUEST["id"];
$id=$_REQUEST["x"];


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


if ($statement = $db->prepare("SELECT * FROM LOBBY WHERE WorkerID = ?")) {
$statement->bind_param("i",$id);
    
 //Executing query
$statement->execute();

//Binding result variables

$statement->bind_result($WorkerID, $WorkID);


//Fetching results using while loop.
$list=array();
  
   
while ($statement->fetch()) {
    
    //Object    
  $userObject = new stdClass();
  
  $userObject->WorkerID = $WorkerID;
  $userObject->WorkID = $WorkID; 
  
  
  array_push($list, $userObject);
}
  echo json_encode($list);
 

//Closing $statement
$statement->close();
}else {
    
    echo $db->error;
}

//Preparing statement and binding variables to it. 



$db->close();




?>