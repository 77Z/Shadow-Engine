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
            item.setAttribute("ondblclick", isDirectory ? "fileExplorer.openFolder('" + name + "')" : "fileExplorer.openFile('" + name + "')");
            
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
        //Fix Uri to make sure no / or \ at the end
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
    openFile: function(fileName) {
        var fileExt = fileName.split(".")[fileName.split(".").length - 1];
        
        if (fileExt == "js") { //Javascript File
            //
        } else if (fileExt == "cs") { //C-Sharp File
            //
        } else if (fileExt == "java") { //Java File
            //
        } else if (fileExt == "rs") { //Rust File or C++ Resource File
            //
        } else if (fileExt == "cpp") { //C++ File
            //
        } else if (fileExt == "h") { //C++ Header File
            //
        } else if (fileExt == "class") { //Compiled java File, class
            //
        } else if (fileExt == "jar") { //Compiled java Program, jar
            //
        } else if (fileExt == "ts") { //TypeScript File
            //
        } else if (fileExt == "txt") { //Text File
            //
        } else if (fileExt == "log") { //Log File
            //
        } else if (fileExt == "bat") { //Windows Batch File
            //
        } else if (fileExt == "json") { //Json File
            //
        } else if (fileExt == "sproject") { //Shadow Engine Project File
            //
        } else if (fileExt == "sec") { //Shadow Engine Configuation File
            //
        } else if (fileExt == "sln") { //Microsoft Visual Studio Solution File
            //
        } else if (fileExt == "csproject") { //Microsoft Visual Studio C-Sharp Project File
            //
        } else if (fileExt == "code-workspace") { //Visual Studio Code Workspace File
            //
        } else if (fileExt == "png") { //PNG Image File
            //
        } else if (fileExt == "jpg") { //JPG Image File
            //
        } else if (fileExt == "bmp") { //Bitmap Image File
            //
        } else if (fileExt == "jpeg") { //JPEG Image File
            //
        } else if (fileExt == "mp3") { //MP3 Audio File
            //
        } else if (fileExt == "wav") { //WAV Audio File
            //
        } else if (fileExt == "flac") { //FLAC Audio File
            //
        } else if (fileExt == "aac") { //AAC Audio File
            //
        } else if (fileExt == "ogg") { //OGG Audio File
            //
        } else if (fileExt == "blend") { //Blender Project File
            //
        } else if (fileExt == "blend1") { //Blender Backup File 1
            //
        } else if (fileExt == "blend2") { //Blender Backup File 2
            //
        } else if (fileExt == "blend3") { //Blender Backup File 3
            //
        } else if (fileExt == "obj") { //OBJ 3D File / Alias Wavefront
            //
        } else if (fileExt == "fbx") { //FBX 3D File / Autodesk Filmbox
            //
        } else if (fileExt == "gltf") { //GLTF 3D File / GL Transmission Format
            //
        } else if (fileExt == "glb") { //GLB 3D File / GL Transmission Format
            //
        } else {
            //Unsupported
        }
    }
};

fileExplorer.loadDirectory("/");

document.getElementById("dirupbtn").addEventListener("click", function() {
    //Fix Uri to make sure no / or \ at the end
    var uri = null;
    if (uriInput.value.slice(-1) == "/" | uriInput.value.slice(-1) == "\\") {
        uri = uriInput.value.slice(0, -1);
    } else {
        uri = uriInput.value;
    }
    var lastWord = uri.split("/")[uri.split("/").length - 1];
    var IdkWhatToCallThisVariable = uri.substr(0, uri.length - lastWord.length);

    uri = IdkWhatToCallThisVariable;
    uriInput.value = uri;
    fileExplorer.loadDirectory(uri);
});


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