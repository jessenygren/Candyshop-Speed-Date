var leaveBtn = document.getElementById("leaveChat");
var title = document.getElementById("title");
var sendBtn = document.getElementById("sendBtn");
var msgInput = document.getElementById("msgInput");
var msgArea = document.getElementById("chatText");

// Esitellään vaihdettavat sivut
var waiting = document.getElementById("waiting");
var chat = document.getElementById("chat");

// AJAX HOMMAT
var cUserSessionID_Name = "UserSessionID";
var cSessionID_Name = "SessionID";
var actionName = "readconvo";

var lobbyInterval = setInterval(function(){ lobbyAuthenticate(lobbyObjectConstructor(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name))) }, 700);

window.onload = function() { lobbyInterval };

if (window.location.hash == title) {
    waiting.style.display = "block";
    
}
else {
    chat.style.display = "none";
}


// VÄLIAIKEINEN, HUOM! ! ! ! LEAVE BUTTON EI TOIMI NÄIN 
leaveBtn.onclick = function() {
    waiting.style.display = "none";
    chat.style.display = "block";
    
    clearInterval(lobbyInterval);
};



// EI TOIMI TÄMÄ ON PASKAA
sendBtn.onclick = function() {
    var newMsg = document.createElement('span');
    var spacer = document.createElement('br');
    newMsg.innerHTML = msgInput.value;
    msgArea.appendChild(spacer);
    msgArea.appendChild(newMsg);
    msgInput.value = "";
}


// AJAX JUTUT


// TÄTÄ PITÄÄ MUOKATA
function lobbyAuthenticate(object) {
    var xmlhttp = new XMLHttpRequest();

    var stringify = JSON.stringify(object);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log("JS: XML HTTP REQU Tehty");

            var myObj = JSON.parse(xmlhttp.responseText);

            console.log(myObj);

            
            if (myObj.isitVALID == false) {
                
            }
            
            else {
               populateLobby(myObj);
            }

        }
    };

    xmlhttp.open("POST", "php2/action.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);
};


//Keksit tänne
function lobbyObjectConstructor(cNameID, cID) {

    var session = {

        SessionID: cID,
        UserSessionID: cNameID,
        Action: this.actionName

    }

    return session;
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function populateLobby(infopack){
    
    var users = [];
    
    var lobby = document.getElementById("waiting");
    
    var header = document.createElement("h1");
    header.innerHTML = infopack.lobbydetails.Name + "   -   " + infopack.lobbydetails.UserAmount + "/4";
    
    var info = document.createElement("p");
    info.innerHTML = infopack.lobbydetails.Info;
    
    var orderedList = document.createElement("ol");
    
    lobby.innerHTML = "";
    
    lobby.appendChild(header);
    lobby.appendChild(info);
    
    lobby.appendChild(orderedList);
    
     for (var i = 0; i < infopack.userdetails.length; i++) {
      
      
      
      users[i] = document.createElement("li");
      
      
      users[i].innerHTML = infopack.userdetails[i].Username;
         
        
        orderedList.appendChild(users[i]);
     }
    
}