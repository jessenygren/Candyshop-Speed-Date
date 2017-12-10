<?php

class createUser
{
    private $UserSessionID;
    private $SessionID;
    private $useridreturn;
    private $servername, $username, $password, $database, $port;
    
    
    function __construct()
    {
        
        $this->servername = getenv('IP');
        $this->username   = getenv('C9_USER');
        $this->password   = "";
        $this->database   = "MashleyDB";
        $this->port       = 3306;
        
    }
    
    
    
    public function addUser($jsonObject)
    {
        $this->db = new mysqli($this->servername, $this->username, $this->password, $this->database, $this->port);
        
        //Testing if connection was succesfull. If not -> Exit return error message.
        if ($this->db->connect_error) {
            
            $userObject = new stdClass();
            
            $userObject->isitVALID = false;
            $userObject->expl      = "DATABASE PROBLEM";
            $userJSON              = json_encode($userObject);
            $statement->close();
            $this->db->close();
            return ($userJSON);
        }
        
        if ($statement = $this->db->prepare("SELECT * FROM USER WHERE Username = ?")) {
            $statement->bind_param("s", $jsonObject->Username);
            
            //Executing query
            $statement->execute();
            
            $statement->store_result();
            
            $count =  $statement->num_rows;
            $realcount = (int) $count;
            $statement->close();
            
            
            if ($realcount > 0) {
                $userObject = new stdClass();
                
                $userObject->isitVALID = false;
                $userObject->expl      = "USERNAME ALREADY TAKEN!";
                $userJSON              = json_encode($userObject);
                
                $this->db->close();
                return $userJSON;
        
        
            }
            
        }else{
             $userObject = new stdClass();
            
            $userObject->isitVALID = false;
            $userObject->expl      = "DATABASE PROBLEM";
            $userJSON              = json_encode($userObject);
            $statement->close();
            $this->db->close();
            return ($userJSON);
             
        }
        
        
        
        if ($statement = $this->db->prepare("INSERT INTO USER (Username, Password, Sex, Prefer, URL) VALUES (?,?,?,?,?)")) {
            $statement->bind_param("sssis", $jsonObject->Username, $jsonObject->Password, $jsonObject->Sex, $jsonObject->Prefer, $jsonObject->URL);
            
            $statement->execute();
            
            $userObject = new stdClass();
            
            $userObject->isitVALID = true;
            $userObject->expl      = "User CREATED";
            $userObject->KAUTTIS      = $jsonObject->Sex;
            
            $userJSON              = json_encode($userObject);
            $statement->close();
            $this->db->close();
            return ($userJSON);
            
            
        }
        
        return $userObject = new stdClass();
        
        $userObject->isitVALID = false;
        $userObject->expl      = "Session expired (Logout)";
        $userJSON              = json_encode($userObject);
        
        $this->db->close();
        return ($userJSON);
        
        
    }
    
    
}


?>