//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const customPop = require("../../scripts/custom-popup");
const tabControl = require("../../scripts/tab-control-from-tab");
const _ = require("../../scripts/vq-node");
const fs = require("fs");
const getProject = require("../../scripts/get-project");

//customPop.create("Lorem ipsum dolor sit amet. Text");

document.body.onmousedown = function(e) {
    if (e.button == 1) return false;
};

console.log("Middle Mouse Scroll Prevented");

var uriInput = document.getElementById("uriinput");
document.getElementById("uri-bar-container").addEventListener("click", function() {
    uriInput.focus();
});

document.getElementById("loading-file-ex-item").addEventListener("dblclick", function() {
    tabControl.createTab("Dummy Tab", "dummy.html");
});

var fileExUribar = document.getElementById("uriinput");

//fileExUribar.addEventListener("keydown", function() {
//    if (fileExUribar.value.substr(0, 2) !== "//") {
//        fileExUribar.value = "//";
//        customPop.create("Invalid URI");
//    }
//});

document.addEventListener("keydown", (event) => {
    if (event.xdefaultPrevented) { return; }
    var key = event.key || event.keyCode;
    if (key == "Enter") {
        if (uriInput == document.activeElement) {
            //Change Directory!
            fileExplorer.loadDirectory(uriInput.value);
        }
    }
});


var fileExplorer = {
    loadDirectory: function(directory) {
        var fileContainer = document.getElementById("file-ex-item-container");
        var prefix = shadowEngineDataDir + "\\projects\\" + getProject() + "\\Source";
        _("file-ex-item-container").empty(); //Empty all the current items.
        var fullDir = prefix + directory;
        fs.exists(fullDir, (exists) => {
            if (!exists) {
                var notValid = document.createElement("div");
                notValid.setAttribute("class", "invalid-dir");
                notValid.innerText = "Invalid Directory";
                fileContainer.appendChild(notValid);
            } else {
                fs.readdir(fullDir, (err, files) => {
                    if (err) throw err;
                    if (files.length == 0) {
                        var notValid = document.createElement("div");
                        notValid.setAttribute("class", "invalid-dir");
                        notValid.innerText = "Directory is empty";
                        fileContainer.appendChild(notValid);
                    } else {
                        //Read files in directory
                        for (var i = 0; i < files.length; i++) {
                            if (fs.lstatSync(fullDir + "\\" + files[i]).isDirectory()) {
                                //Item is a folder, handle accordingly
                                createItem(files[i], true);
                            } else {
                                createItem(files[i]);
                            }
                        }
                    }
                });
            }
        });

        function createItem(name = null, isDirectory = false) {
            var item = document.createElement("div");
            item.setAttribute("class", "file-ex-item");
            item.setAttribute("tabindex", "0");
            item.setAttribute("ondblclick", isDirectory ? "fileExplorer.openFolder(" + name + ")" : "fileExplorer.openFile(" + name + ")");
            
            var img = document.createElement("img");
            img.src = "../../media/img/ui/placeholder.png"
            img.alt = "Thumbnail";
            img.setAttribute("class", "thumbnail");
            var ndo = document.createElement("div");
            ndo.setAttribute("class", "no-drag-overlay");

            var itemTitle = document.createElement("span");
            itemTitle.setAttribute("class", "item-title");
            itemTitle.innerText = name;

            item.appendChild(img);
            item.appendChild(ndo);
            item.appendChild(itemTitle);
            fileContainer.appendChild(item);
        }
    },
    openFolder: function(folderName) {
        var uri = null;
        if (uriInput.value.slice(-1) == "/" | uriInput.value.slice(-1) == "\\") {
            uri = uriInput.value.slice(0, -1);
        } else {
            uri = uriInput.value;
        }
        var uri = uri + "/" + folderName;
        uriInput.value = uri;
        this.loadDirectory(uri);
    },
    openFile: function() {}
};


////Import 3D tools
////import * as THREE from "../../three";
//const three = require("../../three");
//
////Get the bounding box of the Viewport Container
//var vpContainer = document.getElementById("vp-container");
//var vpcWidth  = vpContainer.clientWidth;
//var vpcHeight = vpContainer.clientHeight;
//
////Create Scene and Camera
//var scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera(75, vpcWidth / vpcHeight, 0.1, 1000);
//
////Create the renderer and append it to the Viewport Container
//var renderer = new THREE.WebGLRenderer();
//renderer.setSize(vpcWidth, vpcHeight);
//vpContainer.appendChild(renderer.domElement);
//