
<?php

// Tässä on toimiva php palikka JSON objektin vastaanottamiseen.

header("Content-Type: application/json; charset=UTF-8");

$obj = json_decode($_POST["x"], false);

echo json_encode($obj);

?>