<?php
/*
Reading work table using CompetencyID. POST request
ID


Verneri Närhi
*/
//Reading get or post request

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


if ($statement = $db->prepare("SELECT * FROM WORK WHERE CompetencyID= ? ")) {
$statement->bind_param("i",$id);
    
 //Executing query
$statement->execute();

//Binding result variables

$statement->bind_result($workid, $header, $employer,
$startdate,$enddate,$starttime,$duration,$salary,$competencyid,$booked,
$completed, $description,$workerid);


//Fetching results using while loop.
$list=array();
while ($statement->fetch()) {
    
    //Object    
  $userObject = new stdClass();
  $userObject->WorkID = $workid;
  $userObject->Header = $header; 
  $userObject->EmployerID = $employer; 
  $userObject->StartDate = $startdate; 
  $userObject->EndDate = $enddate; 
  $userObject->StartTime = $starttime; 
  $userObject->Duration = $duration; 
  $userObject->Salary = $salary; 
  $userObject->CompetencyID = $competencyid; 
  $userObject->Booked = $booked; 
  $userObject->Completed = $completed; 
  $userObject->Description = $description; 
  $userObject->WorkerID = $workid;
  
  
  
  array_push($list, $userObject);
  
 
}
  echo json_encode($list);
//Closing $statement
$statement->close();
}
else {
    
    echo $db->error;
}
//Preparing statement and binding variables to it. 



$db->close();




?>