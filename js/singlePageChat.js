var title = document.getElementById("title");
var sendBtn = document.getElementById("sendBtn");
var msgInput = document.getElementById("msgInput");
const msgArea = document.getElementById("chatText");

// Esitellään vaihdettavat sivut
var waiting = document.getElementById("waiting");
var chat = document.getElementById("chat");

// AJAX HOMMAT
var cUserSessionID_Name = "UserSessionID";
var cSessionID_Name = "SessionID";


var lobbyInterval = setInterval(function() { lobbyAuthenticate(lobbyObjectConstructor(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name))) }, 500);
var messageInterval = setInterval(function() {
    getMessages(msgUserConstructor(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name)))
}, 250);


window.onload = function() { lobbyInterval };


//KONSTRUKTOREJA
function lobbyObjectConstructor(cNameID, cID) {

    var lobbySession = {
        SessionID: cID,
        UserSessionID: cNameID,
        Action: "readconvo"
    }
    return lobbySession;
};

// Viestien vastaanottamiseen
function msgUserConstructor(cNameID, cID) {

    var msgUserObj = {
        SessionID: cID,
        UserSessionID: cNameID,
        Action: "readmessage"
    }
    return msgUserObj;
};

function sendMsgObjConstructor(cNameID, cID, msg) {

    var msgObj = {
        SessionID: cID,
        UserSessionID: cNameID,
        Action: "sendmessage",
        Message: msg
    }

    return msgObj;
};


// SPA ALOITUSSIVUN AVAUS
if (window.location.hash == title) {
    waiting.style.display = "block";

}
else {
    chat.style.display = "none";
}

var cap;

if (cap > 1 || cap < 5) {

    // Päivitellään messagekenttää
    messageInterval;

};



// Send button viestin lähetykseen, sisään tarvitaan vielä ajax funktio
sendBtn.onclick = function() {

    // Esitellään uuden viestin divi
    var newMsg = document.createElement('div');
    newMsg.className = "newMsg";

    // Tallennetaan viesti
    var message = msgInput.value;
    newMsg.innerHTML = "Me: " + msgInput.value;

    //Luodaan viestiolio, jossa keksit, viesti ja action
    var msgObject = sendMsgObjConstructor(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name), message);

    // Lähetetään PHP:lle viesti
    sendMessage(msgObject);

    // näytetään käyttäjälle viestiä ja rullataan txtboxia
    msgArea.appendChild(newMsg);
    msgArea.scrollTop = msgArea.clientHeight;
    msgInput.value = "";
};

// Tälle tasolle
var lastMessage;
var newFriend = "123pogostick12344321";

// KESKEN
function getMessages(userObject) {

    var xmlhttp = new XMLHttpRequest();
    var stringify = JSON.stringify(userObject);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var chatBox = document.getElementById("chatText");

            var myObj = JSON.parse(xmlhttp.responseText);
            // Divi johon tulostetaan viesti

            var friendH2 = document.getElementById("chatter");
            friendH2.innerHTML = "You are chatting with: " + myObj.Username;

            if (newFriend != "123pogostick12344321" && newFriend != myObj.Username) {
                chatBox.innerHTML = "";
            }


            if (myObj.Message != null) {

                if (lastMessage != myObj.Message) {

                    
                    // Otetaan vastaan käyttäjän nimi ja viesti yms

                    var chatter = myObj.Username;
                    var chatMessage = myObj.Message;

                    var chatMsg = document.createElement("div");
                    chatMsg.className = "newMsg";
                    chatMsg.innerHTML = "";
                    chatMsg.innerHTML = chatter + ": " + chatMessage;
                    chatBox.appendChild(chatMsg);
                    chatBox.scrollTop = chatBox.scrollHeight;
                }
                else {
                    
                }
            }
            lastMessage = myObj.Message;
            newFriend = myObj.Username;
        }


    };
    xmlhttp.open("POST", "php2/action.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);
};




// Palikka viestien lähetykselle
function sendMessage(msgObj) {
    var xmlhttp = new XMLHttpRequest();
    var stringify = JSON.stringify(msgObj);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myObj = JSON.parse(xmlhttp.responseText);
            // Divi johon tulostetaan viesti

          
        }
        else {
           
        }
    };
    xmlhttp.open("POST", "php2/action.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);

};



// TÄTÄ PITÄÄ MUOKATA
function lobbyAuthenticate(object) {
    var xmlhttp = new XMLHttpRequest();
    var stringify = JSON.stringify(object);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
            var timer = document.getElementById("timer");
            var waiting = document.getElementById("waiting");
            var chat = document.getElementById("chat");
            var chatter = document.getElementById("chatter");
            var textArea = document.getElementById("chatText");
            var myObj = JSON.parse(xmlhttp.responseText);

            cap = myObj.lobbydetails.Capacity;
           
            populateLobby(myObj);

            if (myObj.lobbydetails.Capacity == 1) {
                waiting.style.display = "none";
                chat.style.display = "block";
                chatter.innerHTML = "Get ready! ;)";
            }
            else if (myObj.lobbydetails.Capacity == 5) {
                chatter.innerHTML = "The chat is over! ;)";
                textArea.innerHTML = "";
            }
            else if (myObj.lobbydetails.Capacity == 6) {
                window.location.replace("Mainpage.html");
            }

        }
    };

    xmlhttp.open("POST", "php2/action.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);
};




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
};

function populateLobby(infopack) {

    var users = [];
    var userPics = [];
    var lobby = document.getElementById("waiting");
    var chat = document.getElementById("chat");

    var header = document.createElement("h1");
    header.innerHTML = infopack.lobbydetails.Name + "   -   " + infopack.lobbydetails.UserAmount + "/4";

    var info = document.createElement("p");
    info.className = "info";
    info.innerHTML = infopack.lobbydetails.Info;

    var timer = document.getElementById("timer");
    timer.innerHTML = "";
    timer.innerHTML = "Time: " + infopack.lobbydetails.Timer;
    chat.appendChild(timer);

    var orderedList = document.createElement("ol");


    lobby.innerHTML = "";

    lobby.appendChild(header);
    lobby.appendChild(info);

    lobby.appendChild(orderedList);

    for (var i = 0; i < infopack.userdetails.length; i++) {


        users[i] = document.createElement("li");
        users[i].className = "userlist";
        userPics[i] = document.createElement("img");
        userPics[i].className = "lobbyimg";
        userPics[i].src = infopack.userdetails[i].URL;

        users[i].innerHTML = infopack.userdetails[i].Username;


        orderedList.appendChild(users[i]);
        orderedList.appendChild(userPics[i]);
    }

};