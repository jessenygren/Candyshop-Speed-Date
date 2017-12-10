var room = ["Huone 1", "Huone 2", "Huone 1", "Huone 2"]
var rooms = document.getElementById("rooms");



for (var i = 0; i < room.length; i++) {

    var accBtn = document.createElement("div");
    accBtn.id = "accBtn " + i;
    accBtn.className = "accordion";
    accBtn.innerHTML = room[i];


    rooms.appendChild(accBtn);

};


