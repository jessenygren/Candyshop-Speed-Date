//Tässä funktio, joka lukee objektin php:ltä. id: id, joka halutaan lukea (int), elementID: elementti, johon olio halutaan tulostaa, phpURL: php tiedostopolku
// Palauttaa olion
function readObject(id, phpURL) {
    //Luodaan uusi XMLHttpRequest olio, jolla lähetetään 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        // Tsekataan, että vastaanottajapää on vastaanottavainen 
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //Tässä otetaan vastaan php:n lähettämä vastaus
            var response = xmlhttp.responseText;
            //Tässä luodaan muuttuja, johon vastaus tallennetaan ja parsetaan
            var myObj = JSON.parse(response);
            console.log(myObj);
            return myObj;
        }
    };
    // Tässä tapahtuu itse objektin lähetys, tärkeää huomata, että "php/testaus.php" tilalle laitetaan haluttu php-tiedosto
    xmlhttp.open("POST", phpURL + "?x=" + id, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}
