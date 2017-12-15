// Esitellään käyttäjän luonnin formin osat
var username = document.getElementById("newUser");
var password = document.getElementById("newPassword");
var radios = document.getElementsByName("genderS");
var checkboxes = document.getElementsByName("prefs");
var createBtn = document.getElementById("newCreate");
var form = document.getElementById("newUserForm");

// Konstruktorilla luodaan objekti, joka sisältää oleellisia käyttäjätietoja
function jsObjectConstructor(username, password, sex, pref) {

    var user = {
        Username: username,
        Password: password,
        Sex: sex,
        Prefer: pref,
        URL: "img/user.png"
    }

    return user;
};

// AJAX funktio, jolla lähetetään uuden käyttäjän tiedot PHP:lle josta ne menevät
//edelleen tietokantaan. 
function create(object) {
    var xmlhttp = new XMLHttpRequest();

    var stringify = JSON.stringify(object);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          

            var myObj = JSON.parse(xmlhttp.responseText);

            if (myObj.isitVALID == false) {

            
                alert(myObj.expl);

            }
            else {
             
                alert("User Created!");
            }


        }
    };
    // Käyttäjän luonnille oma PHP osoite
    xmlhttp.open("POST", "php2/action_createuser.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);
};



// Funktio, joka tarkastaa radiobuttonien arvon. Radiobuttonit sisältävät sukupuolitiedon. 
function genderCheck() {

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            var gender = radios[i].value;

            return gender;
        }
    }
};

// Funktio, jolla tarkastetaan Checkboxien arvot. Checkboxit sisältävät käyttäjän
// mieltymykseen liittyvää dataa. 
function prefCheck() {

    var sum = 0;

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            sum = sum + parseInt(checkboxes[i].value);
        }
    }

    if (sum == 0) {
        return 3;
    }

    return sum;
};


// Callback funktio, jossa create nappia painamalla luodaan uusi käyttäjä. 
createBtn.onclick = function() {

// Esitellään muuttujat
    var user;
    var pass;
    var gender;
    var prefer;
    var usernameBool;
    var passBool;

    // Sisäfunktio jolla tarkastetaan datan oikeellisuus
    function userData() {
        // Asetetaan arvot salasanalle ja käyttäjänimelle kun loginia painetaan
        // Tarkastetaan käyttäjänimen pituus
        if (username.value.length < 4) {
            alert("Username must contain at least 4 characters");
            usernameBool = false;
        }
        else {
            user = username.value;
            usernameBool = true;
        }
        // Tarkastetaan salasanan pituus, jos ok = otetaan talteen. 
        if (password.value.length < 7) {
            alert("Password must contain at least 7 characters");
            passBool = false;
        }
        else {
            pass = password.value;
            passBool = true;
        }

        // Haetaan aikaisemmista funktioista tiedot sukupuoleen ja mieltymyksiin. 
        gender = genderCheck();
        prefer = prefCheck();

        // Tarkastetaan tietojen toimivuus. Jos ei täytä ehtoja = false
        if (usernameBool == false || passBool == false) {
            return false;
        }
        else {
            return true;
        }

    };

    // Ajetaan sisäfunktio
    var checked = userData();
    
    // Tarkastus sisäfunktiosta
    if (checked == true) {
        // Luodaan saaduista arvosita javascript-objekti
        var jsObj = jsObjectConstructor(user, pass, gender, prefer);


        // Lähetetään javascript-objekti php:lle
        create(jsObj);
    }
};
