const { app, remote } = require("electron");
const { chdir, cwd } = require("process");


// Resize Electron window dynamically
function resizeBody() {
  var dimensions = [document.getElementById("bodyElement").offsetHeight, document.getElementById("bodyElement").offsetWidth];

  
}

function setupOptions() {
  const fs = require("fs")

  var bttns = document.getElementsByClassName("extButtn");
  var key;

  for (let i = 0; i < bttns.length; i++) {
    switch (i) {
      case 0:
        key = "Assets";
        break;
      case 1:
        key = "References";
        break;
      case 2:
        key = "Renders";
        break;
      case 3: 
        key = "Textures";
        break;
    }

    // Get JSON
    var jsonFile = fs.readFileSync('cdOptions.json');
    jsonFile = JSON.parse(jsonFile);

    // Setup
    if (jsonFile[key.toLowerCase()]) {
      bttns[i].classList.add("selected");
    } else {
      bttns[i].classList.remove("selected");
    }
  }

  document.getElementById("pathControl").value = jsonFile["targetPath"];
}

setupOptions();

function changeProperty(activator, code = 0) {
  const fs = require("fs")

  // Get JSON file
  var jsonFile = fs.readFileSync('cdOptions.json');
  jsonFile = JSON.parse(jsonFile);
  console.log(jsonFile)

  if (code === 0) {
    // Get index of activator
    var options = document.getElementsByClassName('extWrap');
    var i;

    for (i = 0; i < options.length; i++) {
      if (options[i] == activator) {break}
    }

    // Change state of button
    var bttns = document.getElementsByClassName("extButtn");
    bttns[i].classList.toggle("selected");

    // Editing JSON 
    var labels = document.getElementsByClassName("extLabel");
    var key = labels[i].innerHTML.toLowerCase();
    jsonFile[key] = !(jsonFile[key])
    fs.writeFileSync('cdOptions.json', JSON.stringify(jsonFile, null, 2));
  } else if (code === 1) {
    console.log("YAY")
    jsonFile["targetPath"] = activator.value;
    fs.writeFileSync('cdOptions.json', JSON.stringify(jsonFile, null, 2));
  }

  updateStatuses();

}

function updateStatuses() {
  const fs = require("fs")

  var cwdField = document.getElementById("currentDirec");
  var ccfField = document.getElementById("currentFolders");
  
  var jsonFile = JSON.parse(fs.readFileSync("cdOptions.json"));

  var cwdFieldString = jsonFile.targetPath;
  var ccfFieldString = "";
  var grps = ["assets", "references", "renders", "textures"];
  
  console.log(Object.keys(jsonFile));

  console.log(cwdFieldString);
  //console.log(ccfFieldString());

  var outputArr = [];
  for (let i = 0; i < grps.length; i++) {
    if (jsonFile[grps[i]]) {
      outputArr.push(grps[i])
      console.log(outputArr);
    }
  }
  
  for (let i = 0; i < outputArr.length; i++) {
    ccfFieldString = `${ccfFieldString} + ${outputArr[i]} `;
  }

  currentDirec.innerHTML = cwdFieldString;
  ccfField.innerHTML = ccfFieldString;
}


function createBlenderProject() {
  const fs = require("fs")
  const pr = require("process")

  var cwd = __dirname;
  
  var Path = document.getElementById("pathControl").value;
  var folderName = document.getElementById("folderName").value;

  var keys = ["assets", "references", "renders", "textures"];

  var jsonFile = JSON.parse(fs.readFileSync('cdOptions.json'));
  
  pr.chdir(Path);
  fs.mkdirSync(folderName)
  pr.chdir(folderName)

  for (i = 0; i < keys.length; i++) {
    if (jsonFile[keys[i]] !== false) {
      fs.mkdirSync(keys[i]);
    }
  }
  
  fs.writeFileSync(`${folderName}.blend`,"");

  pr.chdir(cwd);

  var errorExists = false;
  if (errorExists != true) {
    windowBehaviour(0);
  }
}

function windowBehaviour(action) {
  var remote = require("electron").remote;
  var gcw = remote.getCurrentWindow();
  
  if (action == 0) { // Close
    gcw.close();
  }

  if (action == 1) { // Minimise 
    gcw.minimize();
  }
}

function checkFolder() {
  var fs = require("fs")

  var Path = document.getElementById("pathControl").value;
  var folderName = document.getElementById("folderName").value;
  
  var statusBar = document.getElementById("status");

  if (!(fs.existsSync(`${Path}/${folderName}`)) || folderName == "") {
    statusBar.innerHTML = "";
    statusBar.setAttribute("class", "");
  } else {
    statusBar.innerHTML = "Project Exists";
    statusBar.setAttribute("class", "warn");
  }
}

// Run on startup
updateStatuses();
checkFolder();