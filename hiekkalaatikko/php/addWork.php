<?php
/*
Adding new Work using prepared statements. POST request
ID


Verneri Närhi
*/
//Reading get or post request
   $obj = json_decode($_REQUEST["x"], false);

 
  /*
  //$workid = ;
  $header = "HEI"; 
  $employer = 1; 
  $startdate ="2017-12-24"; 
  $enddate = "2017-12-24"; 
  $starttime = "14:00:00"; 
  $duration = 2; 
  $salary = 400; 
  $competencyid = 3; 
  $booked = (int) false; 
  $completed = (int)false; 
  $description = "MOIHEIJOOMOI"; 
  $workerid = 3;
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


if ($statement = $db->prepare("INSERT INTO WORK(Header,EmployerID,
StartDate, EndDate, StartTime, Duration,Salary,CompetencyID,
Booked, Completed, Description, WorkerID)VALUES (?,?,?,
?,?,?,?,?,?,?,?,?)")) {
    console.log("TOIMII!")
$statement->bind_param("sisssiiiiisi",
  $obj->Header, 
  $obj->EmployerID,
  $obj->StartDate, 
  $obj->EndDate, 
  $obj->StartTime, 
  $obj->Duration, 
  $obj->Salary,
  $obj->CompetencyID, 
  (int)$obj->Booked,
  (int)$obj->Completed, 
  $obj->Description, 
  $obj->WorkerID);
    
 //Executing query
$statement->execute();

echo "DONE";

//Closing $statement
$statement->close();
}
else {
    
    echo $db->error;
}


$db->close();
console.log("CLosed")

?>