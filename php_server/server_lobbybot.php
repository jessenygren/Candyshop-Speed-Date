<?php
$servername = getenv('IP');
$username   = getenv('C9_USER');
$password   = "";
$database   = "MashleyDB";
$port       = 3306;
$count      = 1;
$db         = new mysqli($servername, $username, $password, $database, $port);

if ($db->error) {
    echo $db->error();
}
if ($statement1 = $db->prepare("UPDATE USER SET LobbyID = NULL WHERE UserSessionID = NULL AND SessionID = NULL")) {
    $statement2 = $db->prepare("SELECT * FROM LOBBY WHERE CAPACITY = 0");
    $statement3 = $db->prepare("SELECT UserID FROM USER WHERE LobbyID = ?");
    $statement3->bind_param("i", $count);
    $statement4 = $db->prepare("UPDATE LOBBY SET UserAmount = ? WHERE LobbyID = ? AND Capacity = 0");
    $statement4->bind_param("ii", $realcount, $count);
    
    $statement5 = $db->prepare("UPDATE LOBBY SET Capacity = 1 WHERE LobbyID = ?");
    $statement5->bind_param("i", $count);
    
    //Executing query
    $counter = 1;
    while (true) {
        
        //Update user set lobbyID = NUll Where UsersessionID Ja SessionID = NULL'
        //Poistaa mahdolliset jämät systeemistä.
        $statement1->execute();
        
        //Select * from lobby Where Capacity = 0
        //Hakee taulut jotka eivät ole täynnä.
        $statement2->execute();
        $statement2->store_result();
        
        //Hakee huoneiden määrän ja tallentaa sen $realroomcount. Tarkistaa myöhemmin onko¨
        //Listan lopussa
        $roomcount     = $statement2->num_rows;
        $realroomcount = (int) $roomcount;
        //Hakee loopin "kierrosnumeron" eli esim vuorossa huone 1.
        $count         = $counter;
        
        //Hakee $countilla esim huoneen 1 käyttäjät
        $statement3->execute();
        //tallentaa käyttäjien määrän 
        $statement3->store_result();
        $usercount = $statement3->num_rows;
        $realcount = (int) $usercount;
        //"UPDATE LOBBY SET UserAmount = ? WHERE LobbyID = ? AND Capacity = 0"
        //Tallentaa käyttäjien määrän huoneeseen
        $statement4->execute();
        
        //"UPDATE LOBBY SET Capacity = 1 WHERE LobbyID = ?"
        //Jos huone on täynnä, flagaa huoneen täydeksi. 
        if ($realcount == 4) {
            $statement5->execute();
            
        }
        
        
        
        //tarkistaa ollaanko listan loppupäässä. Jos ei, niin jatketaan. 
        if ($counter >= $roomcount) {
            $counter = 1;
            echo $count;
            sleep(1);
        } else {
            $counter++;
        }
        
        //Sekunnin odotusaika
        
        
    }
    
    
    
    
} else {
    $userObject = new stdClass();
    
    $userObject->isitVALID = false;
    $userObject->expl      = "DATABASE PROBLEM";
    $userJSON              = json_encode($userObject);
    
    $db->close();
    echo ($userJSON);
    
}



?>