const EngineVersion = 1.00;

//Global
var shadowEngineDataDir;
if (process.platform == "linux") {
    shadowEngineDataDir = require("os").homedir + "/Shadow Engine";
} else if (process.platform == "win32") {
    shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";
}

var newProject = document.getElementById("new-project");
var createProjectMenu = document.getElementById("proj-menu");
var date = new Date();
const randoProjectName = require("../scripts/random-project-name");
const validFileNameChecker = require("../scripts/valid-file-name-checker");
const fs = require('fs');
const {BrowserWindow} = require("electron").remote;
const ipcRenderer = require("electron").ipcRenderer;
const trash = require("trash");
const et = require("electron-tools");
const { ipc } = require("../DiscordRPC/transports");

document.body.onmousedown = function (e) {
    if (e.button == 1) return false;
};

newProject.addEventListener("click", function() {
    createProjectMenu.style.clipPath = "circle(141.5% at 100% 100%)";
});

document.getElementById("randoprojecto").addEventListener("click", function() {
    document.getElementById("name").value = randoProjectName();
});

document.getElementById("resetcopyrighttext").addEventListener("click", function() {
    document.getElementById("copyright").value = "Copyright © Steve Smith " + date.getFullYear();
});

document.getElementById("back-new-proj").addEventListener("click", function() {
    createProjectMenu.style.clipPath = "circle(0% at 100% 100%)";
});

document.getElementById("copyright").value = "Copyright © Steve Smith " + date.getFullYear();

//createProjectMenu.style.clipPath = "circle(141.5% at 100% 100%)";

document.getElementById("select-dropdown").addEventListener("click", activateDropDown);

function activateDropDown() {
    var langoptions = document.getElementById("langoptions");
    if (langoptions.style.display == "block") {
        langoptions.style.display = "none";
    } else {
        langoptions.style.display = "block";
    }
    
}

function setDropdownValue(value) {
    if (typeof value !== "string") throw new TypeError("value must be a string!!");
    document.getElementById("selected-option-text").innerText = value;
}

function replaceSpaceWithDash() {
    var name = document.getElementById("name");
    var nameValue = name.value;
    if (nameValue.charAt(nameValue.length - 1) == " ") {
        var deletedSpace = nameValue.substring(0, nameValue.length - 1);
        deletedSpace += "-";
        name.value = deletedSpace;
        console.log("YEE");
    }
}

var createprojectbtn = document.getElementById("createprojectbtn");

setInterval(function() {
    var wat = validFileNameChecker(document.getElementById("name").value);
    if (wat !== true) {
        document.getElementById("errs").innerText = wat;
        createprojectbtn.style.background = "gray";
    } else {
        document.getElementById("errs").innerText = "";
        createprojectbtn.style.background = "#00c97c";
    }
}, 100);

function checkForValidNameOnce() {
    var wat = validFileNameChecker(document.getElementById("name").value);
    if (wat !== true) {
        return false;
    } else {
        return true;
    }
}

createprojectbtn.addEventListener("click", function() {
    if (!checkForValidNameOnce()) {
        //Not allowed to continue
        createProjectMenu.classList.add("shake");
        setTimeout(function() {
            createProjectMenu.classList.remove("shake");
        }, 500);
    } else {
        //Allowed to continue
        startEngine();
    }
});

var d2 = document.getElementById("d2");
var d3 = document.getElementById("d3");

function startEngine() {
    document.getElementById("loading").style.clipPath = "circle(200% at 50% 50%)";


    var projectName = document.getElementById("name").value;
    var projectFolder = shadowEngineDataDir + "\\projects\\" + projectName;

    var dimension;
    if (d2.classList.contains("selected")) {
        dimension = 2;
    } else {
        dimension = 3;
    }

    fs.mkdir(shadowEngineDataDir + "\\projects\\" + projectName, (err) => {
        if (err) throw err;
        fs.mkdir(projectFolder + "\\Bin", (err) => {
            if (err) throw err;
            fs.mkdir(projectFolder + "\\Source", (err) => {
                if (err) throw err;
                fs.mkdir(projectFolder + "\\Assets", (err) => {
                    if (err) throw err;
                    fs.mkdir(projectFolder + "\\Bin\\Win64", (err) => {
                        if (err) throw err;
                        fs.writeFile(projectFolder + "\\game.sproject", projectName + "\n" + document.getElementById("copyright").value + "\n" + document.getElementById("selected-option-text").innerText + "\n" + EngineVersion.toString() + "\n" + dimension + "\ncrypto:0\nobfuscation:0\nconfigversion:010\nUsePostmaster:0", "utf8", (err) => {
                            if (err) throw err;
                            fs.writeFile(projectFolder + "\\pack.png", "", "base64", (err) => {
                                if (err) throw err;
                                openEditor(projectName);
                            });
                        });
                    });
                });
            });
        });
    });
}

function openEditor(projectName) {
    ipcRenderer.send("project-browser.createEditor", projectName);
}


function randomNumber(min, max) {
    var ptone = Math.random() * (max - min) + min;
    var pttwo = ptone.toString().split(".")[0]
    return pttwo;
}

function setLoader() {
    var loadingFiles = ["craneloading.gif", "krisloading.gif", "wisloading.gif"];
    var loading = document.getElementById("loading");
    var img = document.createElement("img");
    var loadingFile = loadingFiles[randomNumber(0, loadingFiles.length)];
    img.src = "../media/img/ui/loading/" + loadingFile;
    img.height = "200";
    img.width = "200";
    loading.appendChild(img);

    var noDragOverlay = document.createElement("div");
    noDragOverlay.setAttribute("class", "nodragoverlay");
    loading.appendChild(noDragOverlay);
}
setLoader();

var hoveredProject = null;
function setHoveredProject(projName) {
    hoveredProject = projName;
}

var noProjectsLabel = "No projects";

function getProjects() {
    fs.readdir(shadowEngineDataDir + "\\projects", "utf-8", (err, files) => {
        if (err) throw err;
        if (files.length == 0) {
            document.getElementById("projects").innerText = noProjectsLabel;
        } else {
            for (var i = 0; i < files.length; i++) {
                var projName = files[i];

                var project = document.createElement("div");
                var imgContainer = document.createElement("div");
                var img = document.createElement("img");
                var ndo = document.createElement("div");
                var name = document.createElement("span");

                name.appendChild(document.createTextNode(projName));
                project.setAttribute("id", "project-panel-" + projName);
                imgContainer.setAttribute("class", "imgcontainer");
                ndo.setAttribute("class", "ndo");
                img.src = "../media/img/ui/placeholder.png";
                project.tabIndex = "0";
                project.setAttribute("onmouseover", "setHoveredProject('" + projName + "')");
                
                project.appendChild(imgContainer);
                imgContainer.appendChild(img);
                imgContainer.appendChild(ndo);
                project.appendChild(name);
                document.getElementById("projects").appendChild(project);

                project.addEventListener("dblclick", function() {
                    document.getElementById("loading").style.clipPath = "circle(200% at 50% 50%)";
                    openEditor(name.innerText);
                });

                //project.addEventListener("mousedown", dragMouseDown);

                function dragMouseDown(e) {
                    var pos1 = 0, pos2 = 0, pos3, pos4 = 0;
                    e = e || window.event;
                    e.preventDefault();
                    pos3 = e.clientX;
                    pos4 = e.clientY;

                    document.onmouseup = closeDrag;
                    document.onmousemove = drag;

                    var drag = (e) => {
                        e = e || window.event;
                        e.preventDefault();
                        pos1 = pos3 - e.clientX;
                        pos2 = pos4 - e.clientY;
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        project.style.position = "absolute";
                        project.style.left = (project.offsetLeft - pos1) + "px";
                        project.style.top = (project.offsetTop - pos2) + "px";
                    };
                    var closeDrag = (e) => {
                        document.onmouseup = null;
                        document.onmousemove = null;
                        project.style.position = "unset";
                    };
                }

                project.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    showContextMenu(true, e.clientX, e.clientY, hoveredProject);
                });
            }
        }
    });
}

var cmenu = document.getElementById("cmenu");
function showContextMenu(show = true, x = 0, y = 0, project = null) {
    cmenu.style.display = show ? "block" : "none";
    cmenu.style.left = x + "px";
    cmenu.style.top = y + "px";
    document.getElementById("context-open-proj").setAttribute("onclick", "document.getElementById('loading').style.clipPath = 'circle(200% at 50% 50%)';openEditor('" + project + "')");
    document.getElementById("delete-proj-button").setAttribute("onclick", "ipcRenderer.send('confirm-delete-proj-msg', '" + project + "')")
    document.getElementById("open-proj-in-explorer").setAttribute("onclick", "openProjInExp('" + project + "')");
}

function openProjInExp(projName) {
    et.openExplorer(shadowEngineDataDir + "\\projects\\" + projName + "\\game.sproject");
}

window.onclick = function() {
    showContextMenu(false);
};

ipcRenderer.on("response-confirm-delete-proj-msg", (event, index, project) => {
    
    console.log("responce recieved");
    
    if (index === 0) {
        //yes
        (async () => {
            await trash([shadowEngineDataDir + "\\projects\\" + project]);
        })();
        document.getElementById("project-panel-" + project).remove();
	document.location.href = "project-browser.html";
    } else {
        //no
        showContextMenu(false);
    }
});

ipcRenderer.on("main.project-browser.kill", () => {
    setTimeout(() => {
        window.close();
    }, 200);
});

ipcRenderer.on("project-browser.createProject", function() {
    createProjectMenu.style.clipPath = "circle(141.5% at 100% 100%)";
});

setInterval(() => {
    if (!document.hasFocus()) {
        showContextMenu(false);
    }
}, 50);

document.getElementById("termsettings").addEventListener("click", function() {
    let termsettings = new BrowserWindow({
        height: 450,
        width: 450,
        frame: false,
        alwaysOnTop: true,
        backgroundColor: "#222222",
        webPreferences: {
            nodeIntegration: true
        },
        maximizable: false,
        minimizable: false,
        resizable: false
    });
    termsettings.loadURL(`file://${__dirname}/localization.html`);
    termsettings.show();
    termsettings.setThumbnailClip({
        height: 421,
        y: 29,
        x: 0,
        width: 450
    });
});

d2.addEventListener("click", function() {
    d3.classList.remove("selected");
    d2.classList.remove("selected");
    d2.classList.add("selected");
});

d3.addEventListener("click", function() {
    d3.classList.remove("selected");
    d2.classList.remove("selected");
    d3.classList.add("selected");
});

window.onload = function() {
      // ------------ //
     // localization //
    // ------------ //
    ipcRenderer.send("localization.getLocales", "project-browser");
    ipcRenderer.on("main.localization.returnLocales", (event, locales) => {
        document.title                                                   = locales.title;
        document.getElementById("new-project").innerText                 = locales.newProject;
        document.getElementById("window-title").innerText                = locales.title;
        document.getElementById("create-a-new-project-header").innerText = locales.createAnewProjectHeader;
        document.getElementById("create-a-new-project-desc").innerText   = locales.createAnewProjectDesc;
        document.getElementById("project-name-label").innerText          = locales.projectNameLabel;
        document.getElementById("randoprojecto").innerText               = locales.randoprojecto;
        document.getElementById("resetcopyrighttext").innerText          = locales.resetcopyrighttext;
        document.getElementById("prefered-lang-label").innerText         = locales.preferedLangLabel;
        document.getElementById("pref-dimension-label").innerText        = locales.prefDimensionLabel;
        document.getElementById("createprojectbtn").innerText            = locales.createprojectbtn;

        noProjectsLabel = locales.noprojects;
        getProjects();
    });
};