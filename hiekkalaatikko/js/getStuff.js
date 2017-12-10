function readObject(id, phpURL, task) {
    //Luodaan uusi XMLHttpRequest olio, jolla lähetetään 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        // Tsekataan, että vastaanottajapää on vastaanottavainen 
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //Tässä otetaan vastaan php:n lähettämä vastaus
            var response = xmlhttp.responseText;
            //Tässä luodaan muuttuja, johon vastaus tallennetaan ja parsetaan

            var ObjArray = JSON.parse(response);

            switch (task) {
                case "test":
                    test(ObjArray);
                case "myJobs":
                    myJobs(ObjArray);
            }

            //console.log(myObj);
            //return myObj;
            //return testArray;

            // return response;
        }
    };
    // Tässä tapahtuu itse objektin lähetys, tärkeää huomata, että "php/testaus.php" tilalle laitetaan haluttu php-tiedosto
    xmlhttp.open("POST", phpURL + "?x=" + id, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

var fill = document.getElementById('spanFill');
/*
document.getElementById('test').addEventListener('click', e => {
    readObject(3, 'php/readWork.php', 'test');
  */

//console.log(objArray[0].header);
/*
console.log(objArray);
        
for(var i = 0; i < objArray; i++) {
    console.log(objArray[i].Header);
}
*/
//})    
;


const btnGetStuff = document.getElementById('btnGetStuff');

/*
btnGetStuff.addEventListener('click', e => {
    readObject(1, 'php/readWork.php', 'myJobs');
});
*/

function test(objArray) {

    for (var i = 0; i < objArray.length; i++) {
        var h1 = document.createElement('h1');
        var hTxt = document.createTextNode(objArray[i].Header);
        var p = document.createElement('p');
        var pTxt = document.createTextNode(objArray[i].Description);

        h1.appendChild(hTxt);
        p.appendChild(pTxt);
        fill.appendChild(h1);
        fill.appendChild(p);
    }
}

function myJobs(ObjArray) {
    for (var i = 0; i < ObjArray.length; i++) {
     
        var hTxt1 = document.createTextNode(ObjArray[i].Header);
        var pTxt1 = document.createTextNode(ObjArray[i].EmployerID);
        var hTxt2 = document.createTextNode(ObjArray[i].StartDate);
        var pTxt2 = document.createTextNode(ObjArray[i].EndDate);
        var hTxt3 = document.createTextNode(ObjArray[i].StartTime);
        var pTxt3 = document.createTextNode(ObjArray[i].Duration);
        var hTxt4 = document.createTextNode(ObjArray[i].Salary);
        var pTxt4 = document.createTextNode(ObjArray[i].Completed);
        var hTxt5 = document.createTextNode(ObjArray[i].Description);
        console.log(hTxt1);
        
        //document.getElementById('txtHint').appendChild(hTxt);
        var table = document.getElementById("YourJobsListed");
        
        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(1);
        
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        // Add some text to the new cells:
        cell1.innerHTML = hTxt1.textContent;
        cell2.innerHTML = pTxt1.textContent;  
        cell3.innerHTML = hTxt2.textContent;
        cell4.innerHTML = pTxt2.textContent;
        cell5.innerHTML = hTxt3.textContent;
        cell6.innerHTML = pTxt3.textContent;  
        cell7.innerHTML = hTxt4.textContent;
        cell8.innerHTML = pTxt4.textContent; 
        cell9.innerHTML = hTxt5.textContent; 
    }
}
