<?php

class connectionObject
{
    
    private $servername, $username, $password, $database, $port;
    
    private $user_UserID, $user_Username, $user_Password, $user_Sex, $user_Prefer, $user_SessionID, $user_UserSessionID, $user_LobbyID, $user_Url;
    
    function __construct()
    {
        
        //Tietokantaan yhdistäminen
        $this->servername = getenv('IP');
        $this->username   = getenv('C9_USER');
        $this->password   = "";
        $this->database   = "MashleyDB";
        $this->port       = 3306;
        
    }
    
    
    
    private function checkauth($SessionID, $UserSessionID)
    {
        
        
        //Yhdistää databaseen
        $this->db = new mysqli($this->servername, $this->username, $this->password, $this->database, $this->port);
        
        //Testaa yhteyden luomisen
        if ($this->db->connect_error) {
            return false;
        }
        
        //Valmistelee statementin ja bindaa muuttujat statementtiin.
        if ($statement = $this->db->prepare("SELECT * FROM USER WHERE binary UserSessionID= ? AND binary SessionID = ? ")) {
            $statement->bind_param("ss", $UserSessionID, $SessionID);
            
            //Suoritetaan kysely
            $statement->execute();
            
            //Bindataan tulokset muuttujiin:
            
            $statement->bind_result($useridreturn, $Username, $Password, $Sex, $Prefer, $SessionID, $UserSessionID, $LobbyID, $picurl);
            
            if ($statement->fetch()) {
                $this->user_UserID   = $useridreturn;
                $this->user_Username = $Username;
                $this->user_Sex      = $Sex;
                $this->user_Prefer   = $Prefer;
                $this->user_LobbyID  = $LobbyID;
                $this->user_Url      = $picurl;
                
                
                $statement->close();
                return true;
            }
            
            
            //Closing $statement
            $statement->close();
            $this->db->close();
            return false;
        } else {
            //If cannot connect to database
            return false;
        }
        
        
        
    }
    
    private function logOut($jsonObject)
    {
        
        //Asettaa 
        if ($statement = $this->db->prepare("UPDATE USER SET SessionID=NULL, UserSessionID=NULL, LobbyID=NULL WHERE UserID = ?")) {
            $statement->bind_param("i", $this->user_UserID);
            
            $statement->execute();
            
            $userObject            = new stdClass();
            $userObject->isitVALID = true;
            $userObject->expl      = "LOGGED OUT!";
            $userJSON              = json_encode($userObject);
            $statement->close();
            $this->db->close();
            return ($userJSON);
            
            
        }
        return $this->failure("Session expired", true);
    }
    
    
    private function readLobbies($jsonObject)
    {
        
        if ($statement = $this->db->prepare("SELECT * FROM LOBBY WHERE Capacity = 0")) {
            //$statement->bind_param("i", $id);
            
            //Executing query
            $statement->execute();
            
            //Binding result variables
            
            $statement->bind_result($LobbyID, $LobbyName, $Capacity, $Info, $UserAmount, $prefer);
            
            
            //Fetching results using while loop.
            $list = array();
            
            
            while ($statement->fetch()) {
                
                //Object    
                $userObject             = new stdClass();
                $userObject->isitVALID  = true;
                $userObject->expl       = "Lobbies fetched";
                $userObject->LobbyID    = $LobbyID;
                $userObject->Name       = $LobbyName;
                $userObject->Info       = $Info;
                $userObject->UserAmount = $UserAmount;
                
                
                array_push($list, $userObject);
            }
            $statement->close();
            $this->db->close();
            return json_encode($list);
            
            
        } else {
            return $this->failure("Something went wrong", true);
            
        }
    }
    
    
    
    //Lukee käyttäjän tiedot ja palauttaa ne.
    private function readUser($jsonObject)
    {
        if ($statement = $this->db->prepare("SELECT * FROM USER WHERE UserID = ?")) {
            $statement->bind_param("i", $this->user_UserID);
            
            //Executing query
            $statement->execute();
            
            //Binding result variables
            
            $statement->bind_result($UserID, $Username, $Password, $Sex, $Prefer, $SessionID, $UserSessionID, $LobbyID, $picurl);
            
            
            
            if ($statement->fetch()) {
                
                //Object    
                $userObject            = new stdClass();
                $userObject->isitVALID = true;
                $userObject->expl      = "USER details fetched";
                $userObject->Username  = $Username;
                $userObject->Sex       = $Sex;
                $userObject->Prefer    = $Prefer;
                $userObject->LobbyID   = $LobbyID;
                $userObject->URL       = $picurl;
                
                
                
                
            }
            $statement->close();
            $this->db->close();
            return json_encode($userObject);
            
            
        } else {
            return $this->failure("Something went wrong", true);
        }
    }
    
    //KESKEN, tulee palauttamaan kaiken tiedon jota käyttäjä tarvitsee 
    //keskustellessaan.
    private function readConvo($jsonObject)
    {
        if ($this->user_LobbyID == 0 or $this->user_LobbyID == null) {
            return $this->failure("You are not in a chatroom!", true);
        }
        
        if ($statement = $this->db->prepare("SELECT Username,Sex, URL FROM USER WHERE LobbyID = ?")) {
            $statement->bind_param("i", $this->user_LobbyID);
            
            if ($statement2 = $this->db->prepare("SELECT Name,Capacity, Info, UserAmount, Prefer FROM LOBBY WHERE LobbyID = ?")) {
                $statement2->bind_param("i", $this->user_LobbyID);
                //Executing query
                $statement->execute();
                
                
                //Binding result variables
                
                $statement->bind_result($Username, $Sex, $URL);
                
                
                $list = array();
                
                while ($statement->fetch()) {
                    
                    //Object    
                    $userObject            = new stdClass();
                    $userObject->isitVALID = true;
                    $userObject->expl      = "userinfo";
                    $userObject->Username  = $Username;
                    $userObject->Sex       = $Sex;
                    $userObject->URL       = $URL;
                    array_push($list, $userObject);
                    
                }
                $statement2->execute();
                $statement2->bind_result($Name, $Capacity, $Info, $UserAmount, $Prefer);
                
                if ($statement2->fetch()) {
                    //Object    
                    $userObject             = new stdClass();
                    $userObject->isitVALID  = true;
                    $userObject->expl       = "lobbyinfo";
                    $userObject->Name       = $Name;
                    $userObject->Capacity   = $Capacity;
                    $userObject->Info       = $Info;
                    $userObject->UserAmount = $UserAmount;
                    $userObject->Prefer     = $Prefer;
                    
                }
                
                $returnobject               = new stdClass();
                $returnobject->isitVALID    = true;
                $returnobject->expl         = "infopack";
                $returnobject->userdetails  = $list;
                $returnobject->lobbydetails = $userObject;
                
                $statement->close();
                $statement2->close();
                $this->db->close();
                return json_encode($returnobject);
                
                
            } else {
                return $this->failure("Something went wrong", true);
                
            }
        } else {
            return $this->failure("Something went wrong", true);
            
        }
        
        
    }
    
    private function failure($failure, $dbshutdown)
    {
        if ($dbshutdown) {
            $this->db->close();
        }
        $userObject = new stdClass();
        
        $userObject->isitVALID = false;
        $userObject->expl      = $failure;
        $userJSON              = json_encode($userObject);
        
        
        return ($userJSON);
    }
    
    
    private function setuserLobby($jsonObject)
    {
        //Asettaa käyttäjän huoneeseen.
        if ($statement = $this->db->prepare("UPDATE USER SET LobbyID = ? WHERE UserID = ?")) {
            $statement->bind_param("ii", $jsonObject->LobbyID, $this->user_UserID);
            
            $statement->execute();
            
            $userObject = new stdClass();
            
            $userObject->isitVALID = true;
            $userObject->expl      = "roomjoin_SUCCESS";
            $userJSON              = json_encode($userObject);
            $statement->close();
            $this->db->close();
            return ($userJSON);
            
            
        }
        return $this->failure("Session expired", true);
    }
    //Tunnistautuminen
    public function action($jsonObject)
    {
        
        /*Authentikoi käyttäjän ja tallentaa tämän tiedot olion private-muuttujiin esim:
        $user_UserID
        $user_Username
        $user_Sex
        $user_Prefer
        $user_Lobby
        
        Näihin pääsee käsiksi metodeja luodessa:
        $this->user_Username
        */
        
        //Palauttaa true jos käyttäjän id:t ovat olemassa. False palauttaa virheilmoituksen
        if ($this->checkauth($jsonObject->SessionID, $jsonObject->UserSessionID) == false) {
            
            return $this->failure("Please Login Again!", false);
        }
        
        //Toimenpide haetaan oliosta muuttujasta Action.
        
        switch ($jsonObject->Action) {
            case "logout":
                $stirng = $this->logOut($jsonObject);
                return $stirng;
                break;
            
            case "readlobbies":
                
                return $this->readlobbies($jsonObject);
                break;
            
            case "readuser":
                return $this->readUser($jsonObject);
                break;
            
            case "setuserlobby":
                return $this->setuserLobby($jsonObject);
                break;
            
            case "readconvo":
                return $this->readConvo($jsonObject);
                break;
        }
        
        
        
    }
    
}


?>