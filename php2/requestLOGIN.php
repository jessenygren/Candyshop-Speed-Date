 <?php

session_start();
$post = file_get_contents('php://input');

$json = json_decode($post);


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
    die("NO CONNECTION . $db->connect_error");
}

//Kokeilee hakea käyttäjän ID annetulla käyttäjänimellä ja salasanalla. Jos löytyy, generoi kaksi stringiä UserSessionID ja SessionID jotka palauttaa. Tallentuvat kekseihin.l
if ($statement = $db->prepare("SELECT * FROM USER WHERE Username= ? AND binary Password = ? ")) {
    $statement->bind_param("ss", $json->Username, $json->Password);
    
    //Executing query
    $statement->execute();
    
    //Binding result variables
    $statement->bind_result($UserID, $Username, $Password,$Sex,$prefer, $SessionID, $UsersessionID, $lobbyID, $picurl, $Message);
    
    if ($statement->fetch()) {
        
        $statement->close();
        $UserSessionID = substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', mt_rand(1,20))),1,30);
        $SessionID = substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', mt_rand(1,20))),1,30);
        if ($statement = $db->prepare("UPDATE USER SET SessionID = ?, UserSessionID = ? WHERE UserID = ?")) {
            $statement->bind_param("ssi", $SessionID, $UserSessionID, $UserID);
            
            //Päivittää SessionID
            $statement->execute();
            
            //Objekti joka persetaan JSONIKSI!!!    
            $userObject = new stdClass();
            
            $userObject->isitVALID = true;
            $userObject->Username  = $Username;
            $userObject->SessionID = $SessionID;
            $userObject->UserSessionID = $UserSessionID;
            
            
            
            $userJSON = json_encode($userObject);
            echo $userJSON;
            
        }
        
        
        
    } else {
        $statement->close();
        $db->close();
        $userObject = new stdClass();
        
        $userObject->isitVALID = false;
        $userJSON              = json_encode($userObject);
        
        
        die($userJSON);
    }
    
    
    
}
$db->close();
?>