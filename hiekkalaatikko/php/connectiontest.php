<?php
/*
Database test file.

Verneri Närhi
*/

//Sql database configuration variables.

$servername = getenv('IP');
$username = getenv('C9_USER');
$password = "";
$database = "c9";
$port = 3306;

//Connecting to database.
$db = new mysqli($servername,$username,$password,$database,$port);

//Testing if connection was succesfull. If not -> Exit return error message.
if ($db->connect_error) {
    die("NO CONNECTION . $db->connect_error");
}

echo "Connected to database";

$db->close();











?>