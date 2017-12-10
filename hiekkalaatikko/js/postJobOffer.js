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
            ocument.getElementById("txtHint").innerHTML = xmlhttp.response;
            */
            console.log("sent");
        }
    };
    
    // Tässä tapahtuu itse objektin lähetys, tärkeää huomata, että "php/testaus.php" tilalle laitetaan haluttu php-tiedosto
    xmlhttp.open("POST", phpURL, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Tässä tärkeää huomata, että x= on sama kuin php tiedoston vastaanottava osa, tässä esimerkissä se on $obj = json_decode($_POST["x"], false);
    xmlhttp.send("x=" + objectJson);
}

const btnPostJobOffer = document.getElementById('btnPostJobOffer');

btnPostJobOffer.addEventListener('click', e => {
    var header = document.getElementById('jobName').value;
    var employerID = document.getElementById('EmployerID').value;
    var startDate = document.getElementById('StartDate').value;
    var endDate = document.getElementById('EndDate').value;
    var startTime = document.getElementById('StartTime').value;
    var duration = document.getElementById('Duration').value;
    var salary = document.getElementById('Salary').value;
    var competencyID = document.getElementById('CompetencyID').value;
    var booked = document.getElementById('Booked').value;
    var completed = document.getElementById('Completed').value;
    var description = document.getElementById('Description').value;
    var workerID = 1;
    
    var obj = {
        Header : header,
        EmployerID : employerID,
        StartDate : startDate,
        EndDate : endDate,
        StartTime : startTime,
        Duration : duration,
        Salary : salary,
        CompetencyID : competencyID,
        Booked : booked,
        Completed : completed,
        Description : description,
        WorkerID : workerID
    };
    
    sendObject(obj, 'php/addWork.php' );

    
});