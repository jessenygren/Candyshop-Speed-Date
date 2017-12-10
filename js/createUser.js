var username = document.getElementById("newUser");
var password = document.getElementById("newPassword");
var radios = document.getElementsByName("genderS");
var checkboxes = document.getElementsByName("prefs");
var createBtn = document.getElementById("newCreate");
var form = document.getElementById("newUserForm");


function create(object) {
    var xmlhttp = new XMLHttpRequest();

    var stringify = JSON.stringify(object);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log("JS: Yhteys luotu");

            var myObj = JSON.parse(xmlhttp.responseText);

            if (myObj.isitVALID == false) {

                console.log("Ei toimi");
                console.log(myObj);
                alert(myObj.expl);

            }
            else {
                console.log("Toimii");
                console.log(myObj);
                alert(myObj.expl);
            }


        }
    };
    xmlhttp.open("POST", "php2/action_createuser.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);
};

function jsObjectConstructor(username, password, sex, pref) {

    var user = {
        Username: username,
        Password: password,
        Sex: sex,
        Prefer: pref,
        URL: "img/user.png"
    }

    return user;
}

// tämä toimii, laita vielä palauttamaan
function genderCheck() {

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            var gender = radios[i].value;

            return gender;
        }
    }
}

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
}



createBtn.onclick = function() {

    var user;
    var pass;
    var gender;
    var prefer;
    var usernameBool;
    var passBool;

    function userData() {
        // Asetetaan arvot salasanalle ja käyttäjänimelle kun loginia painetaan
        if (username.value.length < 4) {
            alert("Username must contain at least 4 characters");
            usernameBool = false;
        }
        else {
            user = username.value;
            usernameBool = true;
        }

        if (password.value.length < 7) {
            alert("Password must contain at least 7 characters");
            passBool = false;
        }
        else {
            pass = password.value;
            passBool = true;
        }

        gender = genderCheck();
        prefer = prefCheck();


        if (usernameBool == false || passBool == false) {
            return false;
        }
        else {
            return true;
        }

    }

    var checked = userData();

    if (checked == true) {
        // Luodaan saaduista arvosita javascript-objekti
        var jsObj = jsObjectConstructor(user, pass, gender, prefer);


        // Lähetetään javascript-objekti php:lle
        create(jsObj);
    }



};
