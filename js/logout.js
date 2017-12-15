// Esitellään logout nappi
var logoutBtn = document.getElementById("logout");

// Keksien nimet
var cUserSessionID_Name = "UserSessionID";
var cSessionID_Name = "SessionID";


//Konstruktori, jolla luodaan objekti joka sisältää logout actionin ja cookiet
function jsObjectConstructor(cNameID, cID) {

    var session = {
        
        SessionID : cID,
        UserSessionID: cNameID,
        Action: "logout"
        
    }

    return session;
};


// Getteri jolla saadaan evästeistä dataa
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

// Funktio, jolla voidaan mitätöidä evästeet
function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 20 Apr 1999 00:00:01 GMT;';
};


// AJAX funktio uloskirjautumiseen. Lähettää dataa PHP:lle. Poistaa cookiet painalluksen yhteydessä. 
// Eli mitätöi istunnon.
function logout(object) {
    var xmlhttp = new XMLHttpRequest();

    var stringify = JSON.stringify(object);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           
            var myObj = JSON.parse(xmlhttp.responseText);

            if (myObj.isitVALID == false || myObj.isitVALID == true) {
                window.location.replace("Login.html");
                
                deleteCookie(cUserSessionID_Name);
                deleteCookie(cSessionID_Name);
            }
            else {
               // window.location.replace("Login.html");
                deleteCookie(cUserSessionID_Name);
                deleteCookie(cSessionID_Name);
            }

        }
    };
    
    xmlhttp.open("POST", "php2/action.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);
};




// Callback logout napille, joka toteuttaa yllä olevia funktioita. 

logoutBtn.addEventListener('click', e => {

    var jsObj = jsObjectConstructor(getCookie(cUserSessionID_Name),getCookie(cSessionID_Name));
    
    logout(jsObj);
    
    
});