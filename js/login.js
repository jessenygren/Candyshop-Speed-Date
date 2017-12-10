// Esitellään login.html painikkeet
var loginBtn = document.getElementById("loginBtn");
var usernameField = document.getElementById("username");
var passwordField = document.getElementById("password");
var para = document.getElementById("txtBox");

var cUserSessionID_Name = "UserSessionID";
var cSessionID_Name = "SessionID";


function setCookie(cname, cvalue, exhour) {
    var d = new Date();
    d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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



// Tällä murikalla lähetetään tietoa
function login(object) {
    var xmlhttp = new XMLHttpRequest();

    var stringify = JSON.stringify(object);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log("JS: Yhteys luotu");

            var myObj = JSON.parse(xmlhttp.responseText);

            console.log(myObj);
            
            if (myObj.isitVALID == false) {
                alert("Wrong username or password!")
            }
            else {
                window.location.replace("Mainpage.html");
                console.log(myObj);
                // Tehdään keksit
                setCookie(cUserSessionID_Name, myObj.UserSessionID, 1);
                setCookie(cSessionID_Name, myObj.SessionID, 1);
             //   alert(document.cookie);
            }

        }
    };
    xmlhttp.open("POST", "php2/requestLOGIN.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);
};

// Tällä voidaan luoda javascript objeketeja jotka sisältävät käyttäjänimen ja salasanan
function jsObjectConstructor(username, password) {

    var user = {
        Username: username,
        Password: password
    }

    return user;
};

// Login buttonille toiminnallisuutta. Kaapataan tekstikentistä teksi, luodaan niistä javascript objekti, joka lähetetään php:lle
loginBtn.addEventListener('click', function() {

    // Asetetaan arvot salasanalle ja käyttäjänimelle kun loginia painetaan
    var user = usernameField.value;
    var pass = passwordField.value;

    // Luodaan saaduista arvosita javascript-objekti
    var jsObj = jsObjectConstructor(user, pass);

    // Lähetetään javascript-objekti php:lle
    login(jsObj);
});



