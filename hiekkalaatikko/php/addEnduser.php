<?php
/*
Adding new endUser using prepared statements. POST request
ID


Verneri Närhi
*/
//Reading get or post request

//id = $_REQUEST["id"];
 // $jsonobject = $_REQUEST;
  $obj = json_decode($_REQUEST["x"], false);
 
  /*
  //$UserID = 8;
  $FirstName = "KIKKI"; 
  $LastName = "Hiiri";
  $PostallAddress = "DUMDUMDUM";
  $ZIPCode = 58956;
  $City = "VANTAA";
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


if ($statement = $db->prepare("INSERT INTO ENDUSER(FirstName,
LastName,PostallAddress,ZIPCode,City) VALUES (?,?,?,?,?)")) {
$statement->bind_param("sssis",$obj->FirstName, $obj->LastName,$obj->PostallAddress, $obj->ZIPCode, $obj->City);
    
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