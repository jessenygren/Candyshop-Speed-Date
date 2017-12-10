
<?php

function authentiCATE($UserSessionnID, $SessionnID)
{
    if ($UserSessionnID == null or $SessionnID== null ){
        return 0;
    }
    //Sql database configuration variables.
    
    $servername = getenv('IP');
    $username   = getenv('C9_USER');
    $password   = "";
    $database   = "MashleyDB";
    $port       = 3306;
    
    //Connecting to database.
    $db = new mysqli($servername, $username, $password, $database, $port);
    
    //Testing if connection was succesfull. If not -> Exit return error message.
    if ($db->connect_error) {
        return 0;
    }
    
    
    if ($statement = $db->prepare("SELECT UserID FROM USER WHERE UserSessionID= ? AND SessionID = ? ")) {
        $statement->bind_param("ss", $UserSessionnID, $SessionnID);
        
        //Executing query
        $statement->execute();
        
        //Binding result variables
        
        $statement->bind_result($userid);
        
        
        
        
        if ($statement->fetch()) {
            $statement->close();
            $db->close();
            return (int)$userid;
        };
        
        
        //Closing $statement
        $statement->close();
    } else {
        
        return 0;
    }
    
 
    
    
    
    $db->close();
    
    
    
    return 0;
};


?> 

