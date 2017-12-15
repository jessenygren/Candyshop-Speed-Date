// Esitellään chat-html sivun elementtejä
var title = document.getElementById("title");
var sendBtn = document.getElementById("sendBtn");
var msgInput = document.getElementById("msgInput");
const msgArea = document.getElementById("chatText");

// Esitellään vaihdettavat sivut
var waiting = document.getElementById("waiting");
var chat = document.getElementById("chat");

// Esitellään evästeiden nimet
var cUserSessionID_Name = "UserSessionID";
var cSessionID_Name = "SessionID";
// Muuttuja, joka mukana "tilan" tarkkailussa. 
var cap;

window.onload = function() { lobbyInterval };


//KONSTRUKTOREJA
// Konstruktori, joka saa sisäänsä käyttäjän cookiesien nimet. Lisänä myös action PHP:lle
function lobbyObjectConstructor(cNameID, cID) {

    var lobbySession = {
        SessionID: cID,
        UserSessionID: cNameID,
        Action: "readconvo"
    }
    return lobbySession;
};

// Konstruktori, käytetään viestien lukemisfunktiossa. Parametreisi cookies. Lisänä PHP action readmessages
function msgUserConstructor(cNameID, cID) {

    var msgUserObj = {
        SessionID: cID,
        UserSessionID: cNameID,
        Action: "readmessage"
    }
    return msgUserObj;
};

// Konstruktori, objektin parametreiksi käyttäjän cookiet ja chat-viesti
function sendMsgObjConstructor(cNameID, cID, msg) {

    var msgObj = {
        SessionID: cID,
        UserSessionID: cNameID,
        Action: "sendmessage",
        Message: msg
    }

    return msgObj;
};

// Getteri cookiesien datan saamiseksi. 
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


// Single Page App-aloitussivun avaaminen
if (window.location.hash == title) {
    waiting.style.display = "block";

}
else {
    chat.style.display = "none";
}



// Callback funktio viestin lähetyspainikkeelle
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

// Muuttujat viimeiseksi tulleen viestin tarkastamiseksi. 
var lastMessage;
var newFriend = "123pogostick12344321";

// Ajax funktio viestien vastaanottamiseen
function getMessages(userObject) {

    var xmlhttp = new XMLHttpRequest();
    var stringify = JSON.stringify(userObject);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            // Esitellään tekstialue
            var chatBox = document.getElementById("chatText");

            var myObj = JSON.parse(xmlhttp.responseText);
            // Divi johon tulostetaan viesti

            // Infokentän esittely. Kentässä vastapuolen nimi
            var friendH2 = document.getElementById("chatter");
            friendH2.innerHTML = "You are chatting with: " + myObj.Username;
            // Nollataan chatbox (Tekstialue) käyttäjien vaihdon yhteydessä. 
            if (newFriend != "123pogostick12344321" && newFriend != myObj.Username) {
                chatBox.innerHTML = "";
            }

            // Tarkastetaan, ettei saapuva viesti ole null
            if (myObj.Message != null) {
                // Tarkastetaan, että luetaan uusi viesti, eikä vanhaa
                if (lastMessage != myObj.Message) {


                    // Otetaan vastaan käyttäjän nimi ja viesti yms
                    var chatter = myObj.Username;
                    var chatMessage = myObj.Message;
                    // Esitellään tekstialue, tulostetaan siihen uudet viestit ja rullataan alas. 
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
            // Asetetaan muuttujille arvot. Käytetään varmentamisvaiheissa. 
            lastMessage = myObj.Message;
            newFriend = myObj.Username;
        }


    };
    xmlhttp.open("POST", "php2/action.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);
};




// Ajax funktio viestin lähetykseen. Saa sisälleen viestin sisältän olion. 
// Funktiolla lähetään olio PHP:lle
function sendMessage(msgObj) {
    var xmlhttp = new XMLHttpRequest();
    var stringify = JSON.stringify(msgObj);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myObj = JSON.parse(xmlhttp.responseText);

        }
        xmlhttp.open("POST", "php2/action.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(stringify);

    }
};



// AJAX-funktio, jolla varmistetaan yhteyden eheys, käyttäjän validointi, päivittää odotushuoneen tilaa mm. käyttäjät. 
function lobbyAuthenticate(object) {
    var xmlhttp = new XMLHttpRequest();
    var stringify = JSON.stringify(object);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            // Esitellään elementit
            var timer = document.getElementById("timer");
            var waiting = document.getElementById("waiting");
            var chat = document.getElementById("chat");
            var chatter = document.getElementById("chatter");
            var textArea = document.getElementById("chatText");

            var myObj = JSON.parse(xmlhttp.responseText);
            // päivitetään cap muuttujaa, jolla tarkastellaan myöhemmässä vaiheessa chatin-vaihetta vaiheet 0-6, joista 2-4 keskusteluvaiheita
            cap = myObj.lobbydetails.Capacity;
            // Ajetaan populateLobby(myObj) funktio
            populateLobby(myObj);

            // Jos huoneen tila 1: näytetään Chat-näkymä ja viesti get ready. 
            if (myObj.lobbydetails.Capacity == 1) {
                waiting.style.display = "none";
                chat.style.display = "block";
                chatter.innerHTML = "Get ready! ;)";
            }
            // Jos tila 5: Ilmoitetaan chatin päättyneen. 
            else if (myObj.lobbydetails.Capacity == 5) {
                chatter.innerHTML = "The chat is over! ;)";
                textArea.innerHTML = "";
            }
            // Jos tila 6: pakotetaan osallistujat pääsivulle. 
            else if (myObj.lobbydetails.Capacity == 6) {
                window.location.replace("Mainpage.html");
            }

        }
    };
    xmlhttp.open("POST", "php2/action.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);
};





// Funktio, joka: 
// - tarkastaa lobbyn tilaa ja ketä siihen on liittynyt
// - Päivittää ajastinta
// Funktiota käytetään / voidaan käyttää yhdessä ajax funktioiden kanssa. 
// saa parametrikseen PHP:lta tulevan infopack-objektin
function populateLobby(infopack) {
    // Esitellään taulukot käyttäjistä ja käyttäjien kuvista. Taulukot vielä tyhjiä
    var users = [];
    var userPics = [];
    // esitellään lobby ja chat elementit
    var lobby = document.getElementById("waiting");
    var chat = document.getElementById("chat");
    // Otsikko elementin esittely ja päivitys siksi, ketä lobbyssa on
    var header = document.createElement("h1");
    header.innerHTML = infopack.lobbydetails.Name + "   -   " + infopack.lobbydetails.UserAmount + "/4";
    // Info paragrafin esittely ja päivitys vastaamaan lobbyn infotekstiä. 
    var info = document.createElement("p");
    info.className = "info";
    info.innerHTML = infopack.lobbydetails.Info;
    // Ajastimen esittely ja päivitys. 
    var timer = document.getElementById("timer");
    timer.innerHTML = "";
    timer.innerHTML = "Time: " + infopack.lobbydetails.Timer;
    chat.appendChild(timer);
    // Ordered listin luonti, johon käyttäjiä asetetaan kuvineen. 
    var orderedList = document.createElement("ol");


    lobby.innerHTML = "";

    lobby.appendChild(header);
    lobby.appendChild(info);

    lobby.appendChild(orderedList);
    // Loopissa täytetään käyttäjä ja kuva arrayt luoduilla elementeillä ja haetaan elementteihin käyttäjien nimet ja kuvat. 
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


// Tarkastetaan Chatin-tilaa
if (cap > 1 || cap < 5) {

    // Päivitellään messagekenttää, jos Chat-tila on 2-4
    messageInterval;

};

// Muuttujat, joilla funktiot. Funktiot ovat intervallifunktioita, jotka suorittavat ajastettuja funktioiden ajoja. 
var lobbyInterval = setInterval(function() { lobbyAuthenticate(lobbyObjectConstructor(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name))) }, 500);
var messageInterval = setInterval(function() {
    getMessages(msgUserConstructor(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name)))
}, 250);
