//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const getProject = require("../../../scripts/get-project");
const fs = require("fs");
const jsRayLibFileTemplates = require("../../../FileTemplates/raylib/javascript");

var layer1 = {
    createScript: function() {
        document.getElementById("layer-1").remove();
        var ul = document.createElement("ul");
        ul.id = "layer-2";
        ul.innerHTML = " \
        <li>C++</li> \
        <li>C#</li> \
        <li>Javascript</li> \
        <li>Rust</li> \
        <li>Java</li> \
        <li>Shader</li> \
        ";
        document.getElementById("container").appendChild(ul);
    },
    createWindow: function() {
        document.getElementById("layer-1").remove();
        var ul = document.createElement("ul");
        ul.id = "layer-2";
        ul.innerHTML = " \
        <span>Standalone Window</span> \
        <li>Windows API (C++, Rust)</li> \
        <li>WinForms (C#, C++)</li> \
        <li>OpenGL (C++)</li> \
        <li onclick=\"layer2.createWindow.raylib()\">RayLib (C++, Javascript)</li> \
        <span>Shadow Windows</span> \
        <li>Shadow Window</li> \
        <li>Shadow SubWindow</li> \
        ";
        document.getElementById("container").appendChild(ul);
    },
    createModel: function() {
        document.getElementById("layer-1").remove();
        var ul = document.createElement("ul");
        ul.id = "layer-2";
        ul.innerHTML = "<li>Blender Model</li>"
        document.getElementById("container").appendChild(ul);
    },
    createAudio: function() {
        document.getElementById("layer-1").remove();
        var ul = document.createElement("ul");
        ul.id = "layer-2";
        ul.innerHTML = "\
        <li>Audacity Track</li>\
        <li>Microphone Sample</li>\
        ";
        document.getElementById("container").appendChild(ul);
    }
}

var layer2 = {
    createWindow: {
        raylib: function() {
            document.getElementById("layer-2").remove();
            var ul = document.createElement("ul");
            ul.id = "layer-3";
            ul.innerHTML = " \
            <span>RayLib Window</span> \
            <li>C++</li> \
            <li onclick='inputLayer.createWindow.raylib(\"Javascript\")'>Javascript</li> \
            ";
            document.getElementById("container").appendChild(ul);
        }
    }
}

var inputLayer = {
    createWindow: {
        raylib: function(lang) {
            if (typeof lang !== "string") throw new TypeError("lang must be a string");
            document.getElementById("layer-3").remove();
            var ul = document.createElement("ul");
            ul.innerHTML = " \
            <span>" + lang + " RayLib</span> \
            <br><br> \
            <input type='text' id='text-input' placeholder='Name...' /> \
            <br><br> \
            <button onclick='createRayLibModule(\"" + lang + "\", document.getElementById(\"text-input\").value)'>Create RayLib Module</button> \
            ";
            document.getElementById("container").appendChild(ul);
        }
    }
};

function createRayLibModule(lang, moduleName) {
    if (typeof lang !== "string") throw new TypeError("lang must be a string");
    var root = shadowEngineDataDir + "\\projects\\" + getProject() + "\\Source";
    if (lang == "Javascript") {
        fs.mkdir(`${root}\\${moduleName}-raylib`, (err) => {
            if (err) throw err;
            fs.writeFile(`${root}\\${moduleName}-raylib\\${moduleName}-index.js`, jsRayLibFileTemplates.index, (err) => {
                if (err) throw err;
                fs.writeFile(`${root}\\${moduleName}-raylib\\raylib_definitions.js`, jsRayLibFileTemplates.raylib_definitions, (err) => {
                    if (err) throw err;
                    window.close();
                });
            });
        });
    }
}