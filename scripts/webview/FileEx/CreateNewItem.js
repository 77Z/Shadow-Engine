//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const getProject = require("../../../scripts/get-project");
const fs = require("fs");

//File Templates
const jsRayLibFileTemplates = require("../../../FileTemplates/raylib/javascript");
const cppWinApiFileTemplates = require("../../../FileTemplates/win32/C++");

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
        <li onclick=\"layer2.createWindow.winapi()\">Windows API (C++, Rust)</li> \
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
        },
        winapi: function() {
            document.getElementById("layer-2").remove();
            var ul = document.createElement("ul");
            ul.id = "layer-3";
            ul.innerHTML = " \
            <span>Windows API (win32)</span> \
            <li>Rust</li> \
            <li onclick='inputLayer.createWindow.winapi(\"C++\")'>C++</li> \
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
        },
        winapi: function(lang) {
            if (typeof lang !== "string") throw new TypeError("lang must be a string");
            document.getElementById("layer-3").remove();
            var ul = document.createElement("ul");
            ul.innerHTML = " \
            <span>" + lang + " Windows API</span> \
            <br><br> \
            <input type='text' id='text-input' placeholder='Name...' /> \
            <br><br> \
            <button onclick='createWinapiModule(\"" + lang + "\", document.getElementById(\"text-input\").value)'>Create WinAPI Module</button> \
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

function createWinapiModule(lang, moduleName) {
    if (typeof lang !== "string") throw new TypeError("lang must be a string");
    var root = shadowEngineDataDir + "\\projects\\" + getProject() + "\\Source";
    if (lang == "C++") {
        fs.mkdir(`${root}\\${moduleName}-winapi`, (err) => {
            if (err) throw err;
            fs.writeFile(`${root}\\${moduleName}-winapi\\main.cpp`, cppWinApiFileTemplates.main_cpp, (err) => {
                if (err) throw err;
                fs.writeFile(`${root}\\${moduleName}-winapi\\main.h`, cppWinApiFileTemplates.main_h, (err) => {
                    if (err) throw err;
                    fs.writeFile(`${root}\\${moduleName}-winapi\\types.h`, cppWinApiFileTemplates.types_h, (err) => {
                        if (err) throw err;
                        fs.writeFile(`${root}\\${moduleName}-winapi\\config.h`, cppWinApiFileTemplates.config_h, (err) => {
                            if (err) throw err;
                            fs.writeFile(`${root}\\${moduleName}-winapi\\resource.h`, cppWinApiFileTemplates.resource_h, (err) => {
                                if (err) throw err;
                                fs.writeFile(`${root}\\${moduleName}-winapi\\resources.rc`, cppWinApiFileTemplates.resources_rc, (err) => {
                                    if (err) throw err;
                                    fs.writeFile(`${root}\\${moduleName}-winapi\\test.bat`, cppWinApiFileTemplates.test_bat, (err) => {
                                        if (err) throw err;
                                        window.close();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}