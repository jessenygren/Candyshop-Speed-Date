var logoutBtn = document.getElementById("logout");

// Keksien nimet
var cUserSessionID_Name = "UserSessionID";
var cSessionID_Name = "SessionID";
var actionName = "logout";

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

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 20 Apr 1999 00:00:01 GMT;';
};


// TÄTÄ PITÄÄ MUOKATA
function logout(object) {
    var xmlhttp = new XMLHttpRequest();

    var stringify = JSON.stringify(object);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log("JS: XML HTTP REQU Tehty");

            var myObj = JSON.parse(xmlhttp.responseText);

            if (myObj.isitVALID == false || myObj.isitVALID == true) {
                window.location.replace("Login.html");
                
                deleteCookie(cUserSessionID_Name);
                deleteCookie(cSessionID_Name);
                
                console.log(getCookie(cUserSessionID_Name));
                console.log(getCookie(cSessionID_Name));
                

            }
            
            else {
                window.location.replace("Login.html");
                deleteCookie(cUserSessionID_Name);
                deleteCookie(cSessionID_Name);
                
                console.log("Jotain todella hämärää tapahtui.");
                console.log(getCookie(cUserSessionID_Name));
                console.log(getCookie(cSessionID_Name));
                
                
            }

        }
    };
    
    xmlhttp.open("POST", "php2/action.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);
};


//Keksit tänne
function jsObjectConstructor(cNameID, cID) {

    var session = {
        
        SessionID : cID,
        UserSessionID: cNameID,
        Action: this.actionName
        
    }

    return session;
}


// Tässä toiminnallisuutta. 

logoutBtn.addEventListener('click', e => {
    console.log(getCookie(cUserSessionID_Name));
    console.log(getCookie(cSessionID_Name));
    
    var jsObj = jsObjectConstructor(getCookie(cUserSessionID_Name),getCookie(cSessionID_Name));
    
    logout(jsObj);
    
    
});