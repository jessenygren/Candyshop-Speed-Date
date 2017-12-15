// Esitellään login.html painikkeet. 
var loginBtn = document.getElementById("loginBtn");
var usernameField = document.getElementById("username");
var passwordField = document.getElementById("password");
var para = document.getElementById("txtBox");
// Esitellään evästemuuttujat
var cUserSessionID_Name = "UserSessionID";
var cSessionID_Name = "SessionID";

// Funktio, jolla luodaan evästeet loginin yhteydessä. 
function setCookie(cname, cvalue, exhour) {
    var d = new Date();
    d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

// Getteri, jolla saadaan tiedot evästeistä 
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



// AJAX funktio, jolla lähetetään dataa PHP:lle 
function login(object) {
    var xmlhttp = new XMLHttpRequest();

    var stringify = JSON.stringify(object);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          

            var myObj = JSON.parse(xmlhttp.responseText);

            if (myObj.isitVALID == false) {
            
                alert("Wrong username or password!")
            }
            else {
                // Jos toimii ohjataan pääsivulle
                window.location.replace("Mainpage.html");
               
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

// Tällä voidaan luoda javascript objeketeja jotka sisältävät käyttäjänimen ja salasanan // Konstruktori
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



