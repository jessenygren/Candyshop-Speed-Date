// Tässä on toimiva Javascripti JSON-objektin lähettämiseksi php:lle AJAX-tekniikkaa käyttäen


// Tässä on esimerkki JSON-objekti
/*
var Esimerkki = {

    "Firstname":"Minni",
    "Lastname":"Hiiri"
    
};
*/

// Tehdään esimerkki JSON-objektista uusi muuttuja, joka muutetaan stringiksi JSON.stringify() metodilla


//Tässä funktio, joka lähettää objektin php:lle. Parametri object: JSON-objekti, joka halutaan lähettä. Parametri phpURL: haluttu php osoite
function sendObject(object, phpURL) {

    var objectJson = JSON.stringify(object);

    //Luodaan uusi XMLHttpRequest olio, jolla lähetetään 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        // Tsekataan, että vastaanottajapää on vastaanottavainen 
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
            /*
            //Tässä otetaan vastaan php:n lähettämä vastaus
            document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
            //Tässä luodaan muuttuja, johon vastaus tallennetaan ja parsetaan
            var myObj = JSON.parse(this.responseText);
            document.getElementById("txtHint").innerHTML = xmlhttp.response;
*/
        }
    };
    
    // Tässä tapahtuu itse objektin lähetys, tärkeää huomata, että "php/testaus.php" tilalle laitetaan haluttu php-tiedosto
    xmlhttp.open("POST", phpURL, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Tässä tärkeää huomata, että x= on sama kuin php tiedoston vastaanottava osa, tässä esimerkissä se on $obj = json_decode($_POST["x"], false);
    xmlhttp.send("x=" + objectJson);
}
