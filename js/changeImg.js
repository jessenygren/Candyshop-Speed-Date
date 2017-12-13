var imgInput = document.getElementById("newImg");
var imgBtn = document.getElementById("changeImg");

var cUserSessionID_Name = "UserSessionID";
var cSessionID_Name = "SessionID";

// AJAX PALIKKA
function changeImg(imgObj) {
    var xmlhttp = new XMLHttpRequest();

    var stringify = JSON.stringify(imgObj);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var myObj = JSON.parse(xmlhttp.responseText);

            if (myObj.isitVALID == true) {
                alert(myObj.expl);
            }
            else {
                alert(myObj.expl);
            }

        }
    };
    xmlhttp.open("POST", "php2/action.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(stringify);
};

function imageObject(cNameID, cID, url) {

    var image = {
        SessionID: cID,
        UserSessionID: cNameID,
        URL: url,
        Action: "addurl"
    }

    return image;
};

imgBtn.onclick = function() {

    var imageUrl = imgInput.value;

    changeImg(imageObject(getCookie(cUserSessionID_Name), getCookie(cSessionID_Name),imageUrl));

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
