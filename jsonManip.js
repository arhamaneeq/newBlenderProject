const fs = require("fs");

function changeProperty(activator) {
    // Get index of activator
    var options = document.getElementsByClassName('extWrap');
    var i;

    for (i = 0; i < options.length; i++) {
        if (options[i] == activator) {break}
    }

    // Change state of button
    var bttns = document.getElementsByClassName("extButtn");
    bttns[i].classList.toggle("selected");

    // Get JSON file
    var jsonFile = JSON.parse(fs.readFileSync('cdOptions.json'));
}