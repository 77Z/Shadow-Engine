//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const customPop = require("../../scripts/custom-popup");
const tabControl = require("../../scripts/tab-control-from-tab");
const _ = require("../../scripts/vq-node");
const fs = require("fs");
const getProject = require("../../scripts/get-project");
const ipc = require("electron").ipcRenderer;

var FileExplorerItemHover = null;

//Not used

/* function setHoveredItem(item) {
    if (item = null) {
        FileExplorerItemHover = null;
    } else {
        FileExplorerItemHover = item;
    }
} */

/* (function () {
    console.log = function (text) {
        if (typeof text == "object") {
            window.console.log("%c[Shadow Main Tab] %c" + (JSON && JSON.stringify ? JSON.stringify(text) : text), "color: magenta;", "color: reset");
        } else {
            window.console.log("%c[Shadow Main Tab] %c" + text, "color: magenta;", "color: normal");
        }
    }
})(); */

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
    if (event.defaultPrevented) { return; }
    var key = event.key || event.keyCode;
    if (key == "Enter") {
        if (uriInput == document.activeElement) {
            //Change Directory!
            fileExplorer.loadDirectory(uriInput.value);
        }
    } else if (event.ctrlKey && key == "`") {
        mainTab.toggleTerminal();
    }
});

var terminalOpen = false;
var terminalInitialized = false;
var gridContainerHeight = 100;
var gridContainer = document.getElementById("grid-container");
var mainTab = {
    toggleTerminal: function() {
        if (terminalOpen) {
            //close
            mainTab.setGridContainerHeight(100);
            document.getElementById("terminal-container").style.display = "none";
            document.getElementById("terminal-x-content-grabbar").style.display = "none";
            terminalOpen = false;
        } else {
            //open
            mainTab.setGridContainerHeight(70);
            document.getElementById("terminal-container").style.display = "block";
            document.getElementById("terminal-container").style.height = ((100 - gridContainerHeight) - 1) + "%";
            
            document.getElementById("terminal-x-content-grabbar").style.bottom = (99 - gridContainerHeight) + "%";
            document.getElementById("terminal-x-content-grabbar").style.display = "block";
            if (!terminalInitialized) {
                var iframe = document.createElement("iframe");
                iframe.src = "terminal.html";
                iframe.frameBorder = "0";
                iframe.setAttribute("class", "terminal-iframe");
                iframe.setAttribute("id", "viewport-terminal");
                document.getElementById("terminal-container").appendChild(iframe);
            }
            

            terminalOpen = true;
        }
    },
    setGridContainerHeight: function(percent) {
        if (typeof percent !== "number") throw new TypeError("percent Must be an int!");
        gridContainer.style.height = percent + "%";
        gridContainerHeight = percent;
    },
    initializeTerminal: function() {
        var term = new Terminal();
        term.open(document.getElementById("terminal"));
        term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ AYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYfdsfdfsdfsd');
    }
}

//mainTab.initializeTerminal();

document.getElementById("file-ex-item-container").addEventListener("contextmenu", function(e) {
    fileExItemContainerCreate(e);
});

function fileExItemContainerCreate(e) {
    if (FileExplorerItemHover == null) {
        e.preventDefault();
        ContextMenu().create({items:[
            {
                type: "label",
                name: "Create Folder",
                click() {
                    ipc.send("main-tab.createFolder", uriInput.value);
                }
            },
            {
                type: "label",
                name: "Create File",
                click() {
                    ipc.send("main-tab.createFile", uriInput.value);
                }
            }
        ]}, null, e.clientX, e.clientY);
    }
}


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
                notValid.innerText = "Invalid Directory (Try reloading)";
                fileContainer.appendChild(notValid);
            } else {
                fs.readdir(fullDir, (err, files) => {
                    if (err) throw err;
                    if (files.length == 0) {
                        var notValid = document.createElement("div");
                        notValid.setAttribute("class", "invalid-dir");
                        notValid.innerText = "Directory is empty ¯\\_(ツ)_/¯";
                        notValid.addEventListener("contextmenu", (e) => {
                            e.preventDefault();
                            ContextMenu().create({items:[
                                {
                                    type: "label",
                                    name: "Create Folder",
                                    click() {
                                        ipc.send("main-tab.createFolder", uriInput.value);
                                    }
                                },
                                {
                                    type: "label",
                                    name: "Create File",
                                    click() {
                                        ipc.send("main-tab.createFile", uriInput.value);
                                    }
                                }
                            ]}, null, e.clientX, e.clientY);
                        });
                        fileContainer.appendChild(notValid);
                    } else {
                        //Read files in directory
                        for (var i = 0; i < files.length; i++) {
                            if (fs.lstatSync(fullDir + "\\" + files[i]).isDirectory()) {
                                //Item is a folder, handle accordingly
                                createItem(files[i], fullDir + "\\" + files[i], true);
                            } else {
                                createItem(files[i], fullDir + "\\" + files[i]);
                            }
                        }
                    }
                });
            }
        });

        function createItem(name = null, fileLocation, isDirectory = false) {
            var item = document.createElement("div");
            item.setAttribute("class", "file-ex-item");
            item.setAttribute("tabindex", "0");
            item.setAttribute("ondblclick", isDirectory ? "fileExplorer.openFolder('" + name + "')" : "fileExplorer.openFile('" + name + "')");

            item.addEventListener("mouseenter", function() {
                FileExplorerItemHover = name;
                //console.log(FileExplorerItemHover);
            });

            item.addEventListener("mouseleave", function() {
                FileExplorerItemHover = null;
                //console.log(FileExplorerItemHover);
            });

            item.addEventListener("contextmenu", function(e) {
                e.preventDefault();
                ContextMenu().create({
                    items: [
                        {
                            type: "label",
                            name: "Open",
                            click() {}
                        },
                        {
                            type: "label",
                            name: "Delete",
                            click() {}
                        },
                        { type: "sep" },
                        {
                            type: "label",
                            name: "Properties",
                            click() {}
                        }
                    ]
                }, FileExplorerItemHover, e.clientX, e.clientY);
                /* console.log("x: " + e.clientX + "  y:" + e.clientY); */
            });
            
            var img = document.createElement("img");

            //Calculate what icon to put on the file

            if (isDirectory) {
                img.src = "../../media/img/ui/editor/FileExplorer/folder.png";
            } else {
                var fileExt = name.split(".")[name.split(".").length - 1];

                switch(fileExt) {
                    case "js":
                        img.src = "../../media/img/ui/editor/FileExplorer/Javascript.png";
                        break;
                    case "cs":
                        img.src = "../../media/img/ui/editor/FileExplorer/C-Sharp.png";
                        break;
                    case "java":
                        img.src = "../../media/img/ui/editor/FileExplorer/Java.png";
                        break;
                    case "rs":
                        img.src = "../../media/img/ui/editor/FileExplorer/Rust.png";
                        break;
                    case "cpp":
                        img.src = "../../media/img/ui/editor/FileExplorer/Cpp.png";
                        break;
                    case "h":
                        img.src = "../../media/img/ui/editor/FileExplorer/h.png";
                        break;
                    case "class":
                        img.src = "../../media/img/ui/editor/FileExplorer/class.png";
                        break;
                    case "jar":
                        img.src = "../../media/img/ui/editor/FileExplorer/jar.png";
                        break;
                    case "ts":
                        img.src = "../../media/img/ui/editor/FileExplorer/typescript.png";
                        break;
                    case "txt":
                        img.src = "../../media/img/ui/editor/FileExplorer/txt.png";
                        break;
                    case "log":
                        img.src = "../../media/img/ui/editor/FileExplorer/log.png";
                        break;
                    case "bat":
                        img.src = "../../media/img/ui/editor/FileExplorer/batch.png";
                        break;
                    case "json":
                        img.src = "../../media/img/ui/editor/FileExplorer/json.png";
                        break;
                    case "sproject":
                        img.src = "../../media/img/ui/editor/FileExplorer/sproject.png";
                        break;
                    case "sec":
                        img.src = "../../media/img/ui/editor/FileExplorer/sec.png";
                        break;
                    case "sln":
                        img.src = "../../media/img/ui/editor/FileExplorer/sln.png";
                        break;
                    case "csproject":
                        img.src = "../../media/img/ui/editor/FileExplorer/csproj.png";
                        break;
                    case "code-workspace":
                        img.src = "../../media/img/ui/placeholder.png"
                        break;
                    case "png":
                        img.src = "../../media/img/ui/placeholder.png"
                        break;
                    case "jpg":
                        img.src = "../../media/img/ui/placeholder.png"
                        break;
                    case "bmp":
                        img.src = "../../media/img/ui/placeholder.png"
                        break;
                    case "jpeg":
                        img.src = "../../media/img/ui/placeholder.png"
                        break;
                    case "mp3":
                        img.src = "../../media/img/ui/placeholder.png"
                        break;
                    case "wav":
                        img.src = "../../media/img/ui/placeholder.png";
                        break;
                    case "flac":
                        img.src = "../../media/img/ui/placeholder.png"
                        break;
                    case "aac":
                        img.src = "../../media/img/ui/placeholder.png"
                        break;
                    case "ogg":
                        img.src = "../../media/img/ui/placeholder.png"
                        break;
                    case "blend":
                        img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                        break;
                    case "blend1":
                        img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                        break;
                    case "blend2":
                        img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                        break;
                    case "blend3":
                        img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                        break;
                    case "obj":
                        img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                        break;
                    case "fbx":
                        img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                        break;
                    case "gltf":
                        img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                        break;
                    case "glb":
                        img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                        break;
                    default:
                        img.src = "../../media/img/ui/placeholder.png";
                        break;
                }

                //This is bad spahaghetti code  |
                //                              \/

                /* if (fileExt == "js") { //Javascript File
                    img.src = "../../media/img/ui/editor/FileExplorer/Javascript.png"
                } else if (fileExt == "cs") { //C-Sharp File
                    img.src = "../../media/img/ui/editor/FileExplorer/C-Sharp.png"
                } else if (fileExt == "java") { //Java File
                    img.src = "../../media/img/ui/editor/FileExplorer/Java.png"
                } else if (fileExt == "rs") { //Rust File or C++ Resource File
                    img.src = "../../media/img/ui/editor/FileExplorer/Rust.png"
                } else if (fileExt == "cpp") { //C++ File
                    img.src = "../../media/img/ui/editor/FileExplorer/Cpp.png"
                } else if (fileExt == "h") { //C++ Header File
                    img.src = "../../media/img/ui/editor/FileExplorer/h.png"
                } else if (fileExt == "class") { //Compiled java File, class
                    img.src = "../../media/img/ui/editor/FileExplorer/class.png"
                } else if (fileExt == "jar") { //Compiled java Program, jar
                    img.src = "../../media/img/ui/editor/FileExplorer/jar.png"
                } else if (fileExt == "ts") { //TypeScript File
                    img.src = "../../media/img/ui/editor/FileExplorer/typescript.png"
                } else if (fileExt == "txt") { //Text File
                    img.src = "../../media/img/ui/editor/FileExplorer/txt.png"
                } else if (fileExt == "log") { //Log File
                    img.src = "../../media/img/ui/editor/FileExplorer/log.png"
                } else if (fileExt == "bat") { //Windows Batch File
                    img.src = "../../media/img/ui/editor/FileExplorer/batch.png"
                } else if (fileExt == "json") { //Json File
                    img.src = "../../media/img/ui/editor/FileExplorer/json.png"
                } else if (fileExt == "sproject") { //Shadow Engine Project File                        //
                    img.src = "../../media/img/ui/editor/FileExplorer/sproject.png"
                } else if (fileExt == "sec") { //Shadow Engine Configuation File
                    img.src = "../../media/img/ui/editor/FileExplorer/sec.png"
                } else if (fileExt == "sln") { //Microsoft Visual Studio Solution File
                    img.src = "../../media/img/ui/editor/FileExplorer/sln.png"
                } else if (fileExt == "csproject") { //Microsoft Visual Studio C-Sharp Project File
                    img.src = "../../media/img/ui/editor/FileExplorer/csproj.png"
                } else if (fileExt == "code-workspace") { //Visual Studio Code Workspace File                        //
                    img.src = "../../media/img/ui/placeholder.png"
                } else if (fileExt == "png") { //PNG Image File
                    img.src = "../../media/img/ui/placeholder.png"
                } else if (fileExt == "jpg") { //JPG Image File
                    img.src = "../../media/img/ui/placeholder.png"
                } else if (fileExt == "bmp") { //Bitmap Image File
                    img.src = "../../media/img/ui/placeholder.png"
                } else if (fileExt == "jpeg") { //JPEG Image File
                    img.src = "../../media/img/ui/placeholder.png"
                } else if (fileExt == "mp3") { //MP3 Audio File
                    img.src = "../../media/img/ui/placeholder.png"
                } else if (fileExt == "wav") { //WAV Audio File
                    img.src = "../../media/img/ui/placeholder.png"
                } else if (fileExt == "flac") { //FLAC Audio File
                    img.src = "../../media/img/ui/placeholder.png"
                } else if (fileExt == "aac") { //AAC Audio File
                    img.src = "../../media/img/ui/placeholder.png"
                } else if (fileExt == "ogg") { //OGG Audio File
                    img.src = "../../media/img/ui/placeholder.png"
                } else if (fileExt == "blend") { //Blender Project File
                    img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                } else if (fileExt == "blend1") { //Blender Backup File 1
                    img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                } else if (fileExt == "blend2") { //Blender Backup File 2
                    img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                } else if (fileExt == "blend3") { //Blender Backup File 3
                    img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                } else if (fileExt == "obj") { //OBJ 3D File / Alias Wavefront
                    img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                } else if (fileExt == "fbx") { //FBX 3D File / Autodesk Filmbox
                    img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                } else if (fileExt == "gltf") { //GLTF 3D File / GL Transmission Format
                    img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                } else if (fileExt == "glb") { //GLB 3D File / GL Transmission Format
                    img.src = "../../media/img/ui/editor/FileExplorer/3d.png"
                } else {
                    //Unsupported
                    img.src = "../../media/img/ui/placeholder.png"
                } */
            }


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
    openFile: function(fileName, fileLocation) {
        var fileExt = fileName.split(".")[fileName.split(".").length - 1];
        
        if (fileExt == "js") { //Javascript File
            tabControl.createTab(fileLocation);
        } else if (fileExt == "cs") { //C-Sharp File
            //
        } else if (fileExt == "java") { //Java File
            //
        } else if (fileExt == "rs") { //Rust File or C++ Resource File
            //
        } else if (fileExt == "cpp") { //C++ File
            tabControl.createCodeEditor(fileLocation);
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

document.getElementById("dirreloadbtn").addEventListener("click", function() {
    fileExplorer.loadDirectory(uriInput.value);
});

function ContextMenu() {
    const cm = {};
    cm.create = function (object = null, header = null, x = 0, y = 0) {
        if (typeof object !== "object") throw new TypeError("object must be an object");
        //if (typeof header !== "string") throw new TypeError("header must be a string");
        if (typeof x !== "number" || typeof y !== "number") throw new TypeError("x and y must be numbers");

        //Warning, creating a context menu will destroy the last one.

        var contextMenuObj = document.getElementById("cm");

        _("cm").empty();

        if (header !== null) {
            var head = document.createElement("div");
            head.setAttribute("class", "context-menu-header");
            head.innerText = header;
            contextMenuObj.appendChild(head);
        }

        var items = object.items;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.type == "label") {
                var option = document.createElement("div");
                option.setAttribute("class", "option");
                option.addEventListener("click", item.click);
                option.innerText = item.name;
                contextMenuObj.appendChild(option);
            } else if (item.type == "sep") {
                var seperator = document.createElement("div");
                seperator.setAttribute("class", "seperator");
                contextMenuObj.appendChild(seperator);
            } else {
                throw new TypeError("item.type type of " + item.type + " is invalid");
            }
        }

        //Calculate the postion for the context menu

        /* contextMenuObj.style.left = x + "px";
        contextMenuObj.style.top = y + "px"; */

        contextMenuObj.style.bottom = "unset";
        contextMenuObj.style.right = "unset";

        if (y + contextMenuObj.clientHeight > window.innerHeight) {
            contextMenuObj.style.top = "unset";
            contextMenuObj.style.bottom = "0";
        } else {
            contextMenuObj.style.top = y + "px"
        }

        if (x + contextMenuObj.clientWidth > window.innerWidth) {
            contextMenuObj.style.left = "unset";
            contextMenuObj.style.right = "0";
        } else {
            contextMenuObj.style.left = x + "px";
        }

        //END

        contextMenuObj.style.display = "block";
    }
    return cm;
}

/* ContextMenu().create({
    items: [
        {
            type: "label",
            name: "Open",
            click() {
                console.log("Do this l8er");
            }
        },
        {
            type: "sep"
        },
        {
            type: "label",
            name: "Properties",
            click() {
                console.log("Do this l8er");
            }
        }
    ]
}, "Filename here", 20, 50); */

window.onclick = function() {
    document.getElementById("cm").style.display = "none";
    _("cm").empty();
};


//GET EVENTS FROM EDITOR

window.addEventListener("message", messageFromEditor);

function messageFromEditor(event) {

    if (event.data.split(":")[0] == "FTT") {
        //Forward Data to the terminal

        //remove the first four charactors instead of getting [1] of the array
        //you do this because if there is an : in the rest of the data,
        //only everything before that : will be send to the viewport terminal
        var dataToForward = event.data.substr(4);

        document.getElementById("viewport-terminal").contentWindow.postMessage(dataToForward, "*");

    }

    return;
}

//GET EVENTS FROM EDITOR END






/* document.addEventListener("DOMContentLoaded", function() {
    console.log("Fully Loaded");
    OverlayScrollbars(document.querySelectorAll("body"), { });

    OverlayScrollbars(document.querySelectorAll(".file-ex-item-container"), {});
}) */


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





///DELETE ME |
///         \/

//document.getElementById("delete-me-button-tab-create").addEventListener("click", fui)