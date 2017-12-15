// MUUTTUJIEN ESITTELYÄ

var roomBtn = document.getElementById("roomsBtn");
var profileBtn = document.getElementById("profileBtn");
var aboutBtn = document.getElementById("aboutBtn");
var title = document.getElementById("Title");

var rooms = document.getElementById("rooms");
var profile = document.getElementById("profile");
var about = document.getElementById("about");
var main = document.getElementById("mainDiv");

// Keksien esittely ja PHP-actionin esittely. 
var cUserSessionID_Name = "UserSessionID";
var cSessionID_Name = "SessionID";
var action = "readlobbies";

// Intervallifunktio, jolla päivitetään ajastetusti huoneiden lukumäärää ja tilaa. 
var roomsInterval = setInterval(function() {

authenticate(jsObjectConstructorAuthentication(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name), action));

}, 2000);
window.onload = function() { roomsInterval };

// Single page app- ensimmäisen sivun esittäminen
if (window.location.hash == title) {
    main.style.display = 'block';
}
else {
    profile.style.display = 'none';
    about.style.display = 'none';
    rooms.style.display = "none";
};


// Callback: rooms napista vaihdetaan rooms näkymä ja autentikoidaan istunto
roomBtn.onclick = function() {
    rooms.style.display = 'block'; // ROOMS
    profile.style.display = 'none';
    about.style.display = 'none';
    main.style.display = 'none';
    authenticate(jsObjectConstructorAuthentication(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name), action));
};

// Callback: profile napista vaihdetaan profile näkymä ja autentikoidaan istunto. Päivitetään profiilisivu samalla (= readuser action (PHP))
profileBtn.onclick = function() {
    rooms.style.display = 'none';
    profile.style.display = 'block'; // PROFILE
    about.style.display = 'none';
    main.style.display = 'none';
    authenticate(jsObjectConstructorAuthentication(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name), "readuser"));


};
// Callback: about napista vaihdetaan about näkymä
aboutBtn.onclick = function() {
    rooms.style.display = 'none';
    profile.style.display = 'none';
    about.style.display = 'block'; // ABOOUT
    main.style.display = 'none';
    
};

// Callback: title teksistä vaihdetaan pääsivun aloitusnäkymä
title.onclick = function() {
    rooms.style.display = 'none';
    profile.style.display = 'none';
    about.style.display = 'none';
    main.style.display = 'block'; // MAIN
  
};

// Ajax funktio jolla autentikoidaan istunto: 
// - ja muuta, funktiossa lisäselityksiä
function authenticate(object) {
    var xmlhttp = new XMLHttpRequest();

    var stringify = JSON.stringify(object);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
         

            var myObj = JSON.parse(xmlhttp.responseText);

            // Jos ei ole valid, takaisin loginsivulle
            if (myObj.isitVALID == false) {
                window.location.replace("Login.html");
            }
            // Tarkastetaan jos saatava tieto on array muodossa = huonetietoja =  päivitetään huoneet
            if (Array.isArray(myObj)) {
                populateRooms(myObj);
            }
            // Jos huoneeseen liittyminen onnistuu, ohjataan chat sivulle. 
            if (myObj.expl == "roomjoin_SUCCESS"){
                window.location.replace("Chat.html");
            }
            // Jos sisältää käyttäjätieto explin = päivitetään käyttäjätiedot 
            if (myObj.expl == "USER details fetched"){
                populateProfile(myObj);
            }

        }
    };
    xmlhttp.open("POST", "php2/action.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);
};

// Getteri evästeille 
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

// Konstruktori autentikaatioobjektin luomiseksi, sisään: keksit ja action
function jsObjectConstructorAuthentication(cNameID, cID, action) {

    var session = {
        SessionID: cID,
        UserSessionID: cNameID,
        Action: action
    }
    return session;
};

// Huoneeseen liittymiseen tarvittavan objektin konstruktori: keksit ja kohdehuoneen id
function lobbyJoinConstructor(cNameID, cID, lobbyID) {

    var lobbyObject = {
        SessionID: cID,
        UserSessionID: cNameID,
        LobbyID: lobbyID,
        Action: "setuserlobby"
    }

    return lobbyObject;
};

/// Funktio, jolla luodaan dymaaniset painikkeet huoneista, joihin voidaan liittyä. 

function populateRooms(roomList) {
    // Esitellään tyhjä nappilista ja huone elementti (div). Luodaan header. 
    var buttonlist = [];
    var rooms = document.getElementById("rooms");
    var header = document.createElement("h1");

    // tyhjennetään näkymä luontien välissä jottei tule ei toivottua toistoa. 
    rooms.innerHTML = "";
    // Tulostetaan otsikko. 
    header.innerHTML = "Handpicked rooms for you!"
    rooms.appendChild(header);
 
    // Loopissa tulostetaan jokaisesta mahdollisesta huoneesta painike ja asetetaan toiminnallisuus
    for (var i = 0; i < roomList.length; i++) {
        (function() {
            buttonlist[i] = document.createElement("div");

            buttonlist[i].className = "accordion";
            
            
            buttonlist[i].innerHTML = roomList[i].Name + " - " + roomList[i].Info + " - " + roomList[i].UserAmount + "/4";
            rooms.appendChild(buttonlist[i]);
            
            var count = i;
            // Asetetaan napeille toiminnallisuus. Nappia painamalla huoneeseen liittyminen ja autentikointi. 
            buttonlist[i].addEventListener('click', e => { authenticate(lobbyJoinConstructor(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name), roomList[count].LobbyID)); });
            
        }());
    };
};

// Profiilisivun populointi käyttäjän tiedoilla. 
function populateProfile(obj){
    
    var profile = document.getElementById("profile");
    var name = document.getElementById("nameTd");
    var gender = document.getElementById("genderTd");
    var img = document.getElementById("profileImg");
    
    
    
    name.innerHTML = obj.Username;
    gender.innerHTML = obj.Sex;
    img.src = obj.URL;
    
};

