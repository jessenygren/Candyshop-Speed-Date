 function readObject(object, phpURL, task) {
     //Create XMLHTTPRequest object for query 
     var xmlhttp = new XMLHttpRequest();
     
      var objectJson = JSON.stringify(object);
     
     xmlhttp.onreadystatechange = function() {
         // Check response 
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              // Store response
             var response = xmlhttp.responseText;
             //Create JS object arrat from received JSON object array
             var objArray = JSON.parse(response);

             //Send reply
             replyHandler(objArray);
         }
     };
     // Send the object
     xmlhttp.open("POST", phpURL + "?x=" + id, true);
     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xmlhttp.send();
 }

const divFindJob = document.getElementById('divFindJob');

 function replyHandler(objArray) {

     var button = [];
     var div = [];
     var pText = [];
     
     var divChild = document.createElement('div');
     divChild.className = 'testFJ';


     for (var i = 0; i <= objArray.length; i++) {

         button[i] = document.createElement('Button');
         button[i].setAttribute('class', 'accordion');

         div[i] = document.createElement('Div');

         pText[i] = document.createElement('P');

         button[i].innerHTML = "<b>" + objArray[i].Header + "</b>" +
             "<br />" + "Date: " + objArray[i].StartDate +
             "<br />" + "Time: " + objArray[i].StartTime +
             "<br />" + "Salary: " + "<b>" + objArray[i].Salary + "€" + "<b/>";

         if (i % 2 == 0) {
             button[i].style.backgroundColor = "#e6ffcc";
         }
         else {
             button[i].style.backgroundColor = "#ffffcc";
         }
         
         button[i].style.fontSize = 145 + "%";
         button[i].style.color = "black";
         button[i].style.padding = 18 + "px";
         button[i].style.width = 100 + "%";
         button[i].style.textAlign = "centered";
         //button[i].style.border = "none";
         button[i].style.outline = "none";
         button[i].style.transition = 0.4 + "s";

                           
         
         div[i].appendChild(pText[i]);         
         button[i].appendChild(div[i]);
         divChild.appendChild(button[i]);
         divFindJob.appendChild(divChild);


     };
     

 };
const aFindJob = document.getElementById('aFindJob');

aFindJob.addEventListener('click', e => {
 readObject(3, 'php/readWork.php', 'test');
});

const btnCloseFindJob = document.getElementById('bt');
document.getElementById('btnCloseFindJob');

btnCloseFindJob.addEventListener('click', e => {
 console.log("Close button clicked.");
 $('#divFindJob').empty();
});
     
 