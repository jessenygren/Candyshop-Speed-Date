<?php

class connectionObject
{
    
    private $servername, $username, $password, $database, $port;
    
    private $user_UserID, $user_Username, $user_Password, $user_Sex, $user_Prefer, $user_SessionID, $user_UserSessionID, $user_LobbyID, $user_Url;
    private $lastmsg = 0;
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
            
            $statement->bind_result($useridreturn, $Username, $Password, $Sex, $Prefer, $SessionID, $UserSessionID, $LobbyID, $picurl, $message);
            
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
            
            $statement->bind_result($LobbyID, $LobbyName, $Capacity, $Info, $UserAmount, $prefer, $Timer);
            
            
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
            
            $statement->bind_result($UserID, $Username, $Password, $Sex, $Prefer, $SessionID, $UserSessionID, $LobbyID, $picurl, $message);
            
            
            
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
    
    //Lukee keskustelun yleisen tilanteen.
    private function readConvo($jsonObject)
    {
        if ($this->user_LobbyID == 0) {
            return $this->failure("You are not in a chatroom!", true);
        }
        
        if ($statement = $this->db->prepare("SELECT Username,Sex, URL FROM USER WHERE LobbyID = ?")) {
            $statement->bind_param("i", $this->user_LobbyID);
            
            if ($statement2 = $this->db->prepare("SELECT Name,Capacity, Info, UserAmount, Prefer, Timer FROM LOBBY WHERE LobbyID = ?")) {
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
                $statement2->bind_result($Name, $Capacity, $Info, $UserAmount, $Prefer, $Timer);
                
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
                    $userObject->Timer      = $Timer;
                    
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
    
    private function setMessage($jsonObject)
    {
        //Asettaa käyttäjän viestin
        if ($statement = $this->db->prepare("UPDATE USER SET Message = ? WHERE UserID = ?")) {
            $statement->bind_param("si", $jsonObject->Message, $this->user_UserID);
            
            $statement->execute();
            
            $userObject = new stdClass();
            
            $userObject->isitVALID = true;
            $userObject->expl      = "Message delivered!";
            $userJSON              = json_encode($userObject);
            $statement->close();
            $this->db->close();
            return ($userJSON);
            
            
        }
        return $this->failure("Failed to set message!", true);
        
    }
    
    private function readmessage()
    {
        
        if ($statement = $this->db->prepare("SELECT Username, URL, Message FROM USER WHERE LobbyID = ?")) {
            $statement->bind_param("i", $this->user_LobbyID);
            
            //Executing query
            $statement->execute();
            
            //Binding result variables
            
            $statement->bind_result($Username, $URL, $Message);
            
            
            $list = array();
            while ($statement->fetch()) {
                
                //Object    
                $userObject = new stdClass();
                
                $userObject->Username = $Username;
                $userObject->URL      = $URL;
                $userObject->Message  = $Message;
                
                
                
                array_push($list, $userObject);
            }
            
            if ($statement2 = $this->db->prepare("SELECT Capacity FROM LOBBY WHERE LobbyID = ?")) {
                $statement2->bind_param("i", $this->user_LobbyID);
                
                //Executing query
                $statement2->execute();
                
                //Binding result variables
                
                $statement2->bind_result($lobby_capacity);
                
                
                
                if ($statement2->fetch()) {
                    $userownindex = null;
                    
                    
                    for ($x = 0; $x < count($list); $x++) {
                        
                        
                        if ($list[$x]->Username == $this->user_Username) {
                            $userownindex = $x;
                        }
                        
                        
                    }
                    
                    
                    
                    //KAMALA kovakoodattu kikkikökkäre joka yhdistää käyttäjät keskenään keskustelun edetessä.
                    //algoritmi on jo olemassa, mutta sen toteutukseen ei kannata käyttää aikaa.
                    //Nyt toteutettu switch case-puuna selkeyden takia.
                    //Lobby_capacity tarkoittaa huoneen tilaa. 0 on avoin, 1 kiinni, odottaa 10s ennen alkua.
                    //2-4 keskusteluja.
                    //5 keskustelun loppu
                    //6 potkii käyttäjät ulos ja nollaa huoneen 30s cooldownin jälkeen.
                    //Tilojen vaihto ja hallinnointi tapahtuu server_chatbot.php scriptin avulla.
                    
                    
                    switch ($lobby_capacity) {
                        
                        
                        case 2:
                            switch ($userownindex) {
                                case 0:
                                    
                                    return $this->nullmessage($list[2]);
                                    
                                    break;
                                case 1:
                                    return $this->nullmessage($list[3]);
                                    
                                    break;
                                case 2:
                                    return $this->nullmessage($list[0]);
                                    
                                    break;
                                case 3:
                                    return $this->nullmessage($list[1]);
                                    
                                    break;
                            }
                            
                            break;
                        
                        case 3:
                            switch ($userownindex) {
                                case 0:
                                    
                                    return $this->nullmessage($list[1]);
                                    
                                    break;
                                case 1:
                                    return $this->nullmessage($list[0]);
                                    
                                    break;
                                case 2:
                                    
                                    return $this->nullmessage($list[3]);
                                    
                                    break;
                                case 3:
                                    return $this->nullmessage($list[2]);
                                    
                                    break;
                            }
                            break;
                        
                        case 4:
                            switch ($userownindex) {
                                case 0:
                                    
                                    return $this->nullmessage($list[3]);
                                    
                                    break;
                                case 1:
                                    
                                    return $this->nullmessage($list[2]);
                                    
                                    break;
                                case 2:
                                    
                                    return $this->nullmessage($list[1]);
                                    
                                    break;
                                case 3:
                                    
                                    return $this->nullmessage($list[0]);
                                    
                                    break;
                            }
                            break;
                        
                            
                            
                    }
                    
                    
                    $statement->close();
                    $this->db->close();
                    
                    
                    
                    
                    
                    
                }
            }
        }
    }
    
    private function nullmessage($objectt)
    {
       
    return json_encode($objectt);
       }
        
        
        
    private function addURL ($jsonObject) {
        //Asettaa käyttäjän kuvan
        if ($statement = $this->db->prepare("UPDATE USER SET URL = ? WHERE UserID = ?")) {
            $statement->bind_param("si", $jsonObject->URL, $this->user_UserID);
            
            $statement->execute();
            
            $userObject = new stdClass();
            
            $userObject->isitVALID = true;
            $userObject->expl      = "PIC UPDATED!";
            $userJSON              = json_encode($userObject);
            $statement->close();
            $this->db->close();
            return ($userJSON);
            
            
        }
        return $this->failure("PIC UPLOAD FAILED", true);
        
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
            case "sendmessage":
                return $this->setMessage($jsonObject);
                break;
            case "readmessage":
                return $this->readmessage($jsonObject);
                break;
            case "addurl":
                return $this->addURL($jsonObject);
                break;
        }
        
        
        
    }
    
}


?>