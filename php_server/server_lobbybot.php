<?php

//Käy läpi huoneita ja tarkistaa ovatko ne täynnä.

//Tietokannan tiedot
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



//Statementtien valmisteleminen

if ($statement1 = $db->prepare("UPDATE USER SET LobbyID = NULL WHERE UserSessionID = NULL AND SessionID = NULL")) {
    $statement2 = $db->prepare("SELECT * FROM LOBBY WHERE CAPACITY = 0");
    $statement2->bind_result($LobbyID, $Name, $Capacity, $Info, $UserAmount, $Prefer, $Timer);
    $statement3 = $db->prepare("SELECT UserID FROM USER WHERE LobbyID = ?");
    $statement3->bind_param("i", $lobby_LobbyID);
    $statement4 = $db->prepare("UPDATE LOBBY SET UserAmount = ? WHERE LobbyID = ? AND Capacity = 0");
    $statement4->bind_param("ii", $useramount, $lobby_LobbyID);
    
    $statement5 = $db->prepare("UPDATE LOBBY SET Capacity = 1, Timer = 10 WHERE LobbyID = ?");
    $statement5->bind_param("i", $lobby_LobbyID);
    
    //Executing query
    
    while (true) {
        
        //Update user set lobbyID = NUll Where UsersessionID Ja SessionID = NULL'
        //Poistaa mahdolliset jämät systeemistä.
        $statement1->execute();
        
        
        $list = array();
        $statement2->execute();
        //Hakee lobbyjen tiedot listaan
        while ($statement2->fetch()) {
            $userObject             = new stdClass();
            $userObject->LobbyID    = $LobbyID;
            $userObject->Name       = $Name;
            $userObject->Capacity   = $Capacity;
            $userObject->Info       = $Info;
            $userObject->UserAmount = $UserAmount;
            $userObject->Prefer     = $Prefer;
            $userObject->Timer      = $Timer;
            
            
            array_push($list, $userObject);
        }
        
        $roomcount = count($list);
        //Käy huoneet läpi ja päivittää käyttäjien määrän huoneessa.
        for ($i = 0; $i < $roomcount; $i++) {
            
            $lobby_LobbyID = $list[$i]->LobbyID;
            
            $statement3->execute();
            
            $statement3->store_result();
            $usercount  = $statement3->num_rows;
            $useramount = (int) $usercount;
            
            $statement4->execute();
            
            
            
            //"UPDATE LOBBY SET Capacity = 1 WHERE LobbyID = ?"
            //Jos huone on täynnä, flagaa huoneen täydeksi. 
            if ($useramount == 4) {
                $statement5->execute();
                
            }
            
            
            //Sekunnin odotusaika
            
            
        }
        sleep(1);
        echo count($list);
        
        
        
    }
} else {
    //Failure-viesti
    $userObject = new stdClass();
    
    $userObject->isitVALID = false;
    $userObject->expl      = "DATABASE PROBLEM";
    $userJSON              = json_encode($userObject);
    
    $db->close();
    echo ($userJSON);
    
}



?>