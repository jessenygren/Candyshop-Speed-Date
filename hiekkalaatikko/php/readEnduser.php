<?php
/*
Reading endUser table using UserID. 
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


if ($statement = $db->prepare("SELECT * FROM ENDUSER WHERE UserID= ?")) {
$statement->bind_param("i",$id);
    
 //Executing query
$statement->execute();

//Binding result variables

$statement->bind_result($userid, $firstname, $lastname,
$postalladdress,$zipcode,$city);


//Fetching results using while loop.

$list=array();
  

while ($statement->fetch()) {
    
    //Object    
  $userObject = new stdClass();
  
  $userObject->UserID = $userid;
  $userObject->FirstName = $firstname; 
  $userObject->LastName = $lastname; 
  $userObject->PostallAddress = $postalladdress; 
  $userObject->ZIPCode = $zipcode; 
  $userObject->City = $city; 
  
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