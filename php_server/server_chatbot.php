<?php


//Hieman sekavasti toteutettu botti joka pitää huolta huoneen tilan vaihtumisesta kun huone on täyttynyt
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



while (true) {
    if ($statement2 = $db->prepare("SELECT * FROM LOBBY WHERE Capacity > 0")) {
        $statement2->bind_result($LobbyID, $Name, $Capacity, $Info, $UserAmount, $Prefer, $Timer);
        $statement3 = $db->prepare("UPDATE LOBBY SET  Capacity = ?, Timer = ? WHERE LobbyID =?");
        $statement3->bind_param("iii", $LobbyCapacity, $LobbyTimer, $LobbyIDD);
        $statement6 = $db->prepare("UPDATE USER SET  Message = NULL WHERE LobbyID =?");
        $statement6->bind_param("i", $LobbyIDD);
        $list = array();
        $statement2->execute();
        
        //Hakee käynnissä olevien lobbyjen tiedot ja lisää ne listaan
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
        
        
         if ($list[0] != null) {
       
       //Käy läpi listan
        for ($i = 0; $i < count($list); $i++) {
            
            //Jos listan kyseisen huoneen ajastin == 0, siirtyy seuraavaan tilaan/lopettaa huoneen toiminnan
            if ($list[$i]->Timer <= 0) {
                
                
                echo $list[$i]->Timer;
                echo $list[$i]->Capacity;
                //Huoneen tila ja ajastin
                $LobbyCapacity = $list[$i]->Capacity + 1;
                $LobbyTimer = 60;
                $LobbyIDD = $list[$i]->LobbyID;
                if($LobbyCapacity == 5){
                    $LobbyTimer = 10;
                }
                //Jos huone on tilassa 6 eli loppu, nollaa huoneen ja poistaa käyttäjät lobbysta
                $statement3->execute();
                if ($LobbyCapacity > 6){
                    if ($statement4 = $db->prepare("UPDATE USER SET LobbyID = NULL WHERE LobbyID =?")) {
                        $statement4->bind_param("i", $LobbyIDD);
                        $statement4->execute();
                    }
                    if ($statement5 = $db->prepare("UPDATE LOBBY SET UserAmount = NULL, Capacity = 0, Timer = NULL WHERE LobbyID = ?")) {
                        $statement5->bind_param("i", $LobbyIDD);
                        $statement5->execute();
                       
                    }
                }
                
            } else {
                //Vähentää aikaa huoneesta, tila ei muutu.
                $LobbyTimer = $list[$i]->Timer - 1;
                $LobbyCapacity = $list[$i]->Capacity;
                $LobbyIDD = $list[$i]->LobbyID;
                
                
                $statement3->execute();
                $statement6->execute();
                
                
            }
            
            
        }
        
        $statement3->close();
        $statement2->close();
        
        
       
    }
    //Hetken tauko.
       sleep(1);  
    }
    
   
}

?>