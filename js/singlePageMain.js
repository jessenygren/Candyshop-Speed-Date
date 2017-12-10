// MUUTTUJIEN ESITTELYÄ

var roomBtn = document.getElementById("roomsBtn");
var profileBtn = document.getElementById("profileBtn");
var aboutBtn = document.getElementById("aboutBtn");
var title = document.getElementById("Title");

var rooms = document.getElementById("rooms");
var profile = document.getElementById("profile");
var about = document.getElementById("about");
var main = document.getElementById("mainDiv");

// Autentikaatiojuttuja
var cUserSessionID_Name = "UserSessionID";
var cSessionID_Name = "SessionID";
var action = "readlobbies";

var roomsInterval = setInterval(function() {

authenticate(jsObjectConstructorAuthentication(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name), action));

}, 2000);

window.onload = function() { roomsInterval };

// ANKKURI ROOMS SIVULLA
if (window.location.hash == title) {
    main.style.display = 'block';




}

else {
    profile.style.display = 'none';
    about.style.display = 'none';
    rooms.style.display = "none";
}


// SIVUJEN VAIHTO
roomBtn.onclick = function() {
    rooms.style.display = 'block'; // ROOMS
    profile.style.display = 'none';
    about.style.display = 'none';
    main.style.display = 'none';
    authenticate(jsObjectConstructorAuthentication(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name), action));
};


profileBtn.onclick = function() {
    rooms.style.display = 'none';
    profile.style.display = 'block'; // PROFILE
    about.style.display = 'none';
    main.style.display = 'none';
    authenticate(jsObjectConstructorAuthentication(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name), "readuser"));


};

aboutBtn.onclick = function() {
    rooms.style.display = 'none';
    profile.style.display = 'none';
    about.style.display = 'block'; // ABOOUT
    main.style.display = 'none';
  //  authenticate(jsObjectConstructorAuthentication(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name), action));

};

title.onclick = function() {
    rooms.style.display = 'none';
    profile.style.display = 'none';
    about.style.display = 'none';
    main.style.display = 'block'; // MAIN
   // authenticate(jsObjectConstructorAuthentication(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name), action));
};

function authenticate(object) {
    var xmlhttp = new XMLHttpRequest();

    var stringify = JSON.stringify(object);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log("JS: Yhteys luotu");

            var myObj = JSON.parse(xmlhttp.responseText);

            console.log(myObj);

            if (myObj.isitVALID == false) {
                window.location.replace("Mainpage.html");
            }

            if (Array.isArray(myObj)) {
                populateRooms(myObj);
            }
            
            if (myObj.expl == "roomjoin_SUCCESS"){
                window.location.replace("Chat.html");
            }
            
            if (myObj.expl == "USER details fetched"){
                populateProfile(myObj);
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

function jsObjectConstructorAuthentication(cNameID, cID, action) {

    var session = {
        SessionID: cID,
        UserSessionID: cNameID,
        Action: action
    }
    return session;
};

function lobbyJoinConstructor(cNameID, cID, lobbyID) {

    var lobbyObject = {
        SessionID: cID,
        UserSessionID: cNameID,
        LobbyID: lobbyID,
        Action: "setuserlobby"
    }

    return lobbyObject;
};

///

function populateRooms(roomList) {

    var buttonlist = [];
    var rooms = document.getElementById("rooms");
    var header = document.createElement("h1");


    rooms.innerHTML = "";

    header.innerHTML = "Handpicked rooms for you!"
    rooms.appendChild(header);
 
    
    for (var i = 0; i < roomList.length; i++) {
        (function() {
            buttonlist[i] = document.createElement("div");

            buttonlist[i].className = "accordion";
            
            
            buttonlist[i].innerHTML = roomList[i].Name + " - " + roomList[i].Info + " - " + roomList[i].UserAmount + "/4";
            rooms.appendChild(buttonlist[i]);
            console.log(roomList[i].LobbyID);
            var count = i;
            buttonlist[i].addEventListener('click', e => { authenticate(lobbyJoinConstructor(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name), roomList[count].LobbyID)); });


        }());
    };
};

// KESKEN
function populateProfile(obj){
    
    var profile = document.getElementById("profile");
    var name = document.getElementById("nameTd");
    var gender = document.getElementById("genderTd");
    var img = document.getElementById("profileImg");
    
    
    
    name.innerHTML = obj.Username;
    gender.innerHTML = obj.Sex;
    img.src = obj.URL;
    
};

