//Global
const shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";

const child_process = require("child_process");
const _ = require("../../scripts/vq-node");
const fs = require("fs");
const getFileType = require("../../scripts/FileManip/getFileType");
const getLineEnding = require("../../scripts/FileManip/getLineEndingType");
const getProject = require("../../scripts/get-project");
const {clipboard, ipcRenderer} = require("electron");

var editor = ace.edit("editor");
editor.setTheme("ace/theme/solarized_dark");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});
//editor.session.setUseSoftTabs(true);
editor.commands.addCommand({
    name: "save",
    bindKey: {win: "Ctrl-S", mac: "Command-S"},
    exec: function(editor) {
        //
    },
    readOnly: true
});

editor.commands.addCommand({
    name: "runCommand",
    bindKey: {win: "F1", mac: "F1"},
    exec: function(editor) {
        document.getElementById("command-popup").style.transform = "scale(1)";
        document.getElementById("command-popup-back").style.display = "block";
        document.getElementById("command-input").focus();
        document.getElementById("command-input").value = "";
    },
    readOnly: true
});

editor.commands.addCommand({
    name: "replaceKeybind",
    bindKey: {win: "Ctrl-Shift-R", mac: "Command-Shift-R"},
    exec: function(editor) {
        editor.execCommand("replace");
    },
    readOnly: true
})

var contextMenuOpen = false;
var editorContextMenu = document.getElementById("editor-context-menu");

//Right-Click Context Menu
editor.container.addEventListener("contextmenu", function(e) {
    e.preventDefault();

    editorContextMenu.style.display = "block";
    setTimeout(function() {
        if (!contextMenuOpen) {
            //If the context menu is not open, then do the fade animation.
            editorContextMenu.style.opacity = "1";
        }

        contextMenuOpen = true;

        editorContextMenu.style.bottom = "unset";
        editorContextMenu.style.right = "unset";
        editorContextMenu.style.top = e.clientY + "px";
        editorContextMenu.style.left = e.clientX + "px";

        if (editorContextMenu.clientHeight + e.clientY > window.innerHeight) {
            editorContextMenu.style.top = "unset";
            editorContextMenu.style.bottom = "0";
        }

        if (editorContextMenu.clientWidth + e.clientX > window.innerWidth) {
            editorContextMenu.style.left = "unset";
            editorContextMenu.style.right = "0";
        }
    }, 10);
    

    return false;
});

// WINDOW EVENTS
window.onclick = function() {
    editorContextMenu.style.opacity = "0";
    setTimeout(function() {
        editorContextMenu.style.display = "none";
        contextMenuOpen = false;
    }, 150);
    
};

//this is for exiting out of the command-popup element with your mouse
document.getElementById("command-popup-back").addEventListener("click", closeCommandWindow);

var languageModeText = document.getElementById("file-info-language-mode");

//Tab-Global keydown listener
document.addEventListener("keydown", function(e) {
    //This is for the Esc button and enter on the command-popup element
    if (document.getElementById("command-input") == document.activeElement) {
        if (e.defaultPrevented) { return; }
        var key = event.key || event.keyCode;
        if (key == "Escape") {
            closeCommandWindow();
        } else if (key == "Enter") {
            if (selectedItemContent !== null) {
                switch(selectedItemContent) {
                    case "Change Language Mode":
                        commands.ChangeLanguageMode();
                        document.getElementById("command-input").value = "";
                        break;
                    case "Change Color Theme":
                        commands.ChangeColorTheme();
                        document.getElementById("command-input").value = "";
                        break;
                    case "New File":
                        commands.NewFile();
                        closeCommandWindow()
                        break;
                    case "Open File":
                        commands.OpenFile();
                        closeCommandWindow()
                        break;
                    case "Close File":
                        commands.CloseFile();
                        closeCommandWindow()
                        break;
                    case "Save File":
                        commands.SaveFile();
                        closeCommandWindow()
                        break;
                    case "Build C++ File":
                        commands.BuildCppFile();
                        closeCommandWindow()
                        break;
                    case "Build C File":
                        commands.BuildCFile();
                        closeCommandWindow()
                        break;
                    case "Build JavaScript File":
                        commands.BuildJavascriptFile();
                        closeCommandWindow()
                        break;


                    //Theme Switch
                    case "Theme: Ambiance":
                        editor.setTheme("ace/theme/ambiance");
                        closeCommandWindow();
                        break;
                    case "Theme: Chaos":
                        editor.setTheme("ace/theme/chaos");
                        closeCommandWindow();
                        break;
                    case "Theme: Clouds!":
                        editor.setTheme("ace/theme/clouds");
                        closeCommandWindow();
                        break;
                    case "Theme: Clouds Midnight":
                        editor.setTheme("ace/theme/clouds_midnight");
                        closeCommandWindow();
                        break;
                    case "Theme: Cobalt":
                        editor.setTheme("ace/theme/cobalt");
                        closeCommandWindow();
                        break;
                    case "Theme: Crimson Editor":
                        editor.setTheme("ace/theme/crimson_editor");
                        closeCommandWindow();
                        break;
                    case "Theme: Monokai":
                        editor.setTheme("ace/theme/monokai");
                        closeCommandWindow();
                        break;
                    case "Theme: Solarized Dark (Default)":
                        editor.setTheme("ace/theme/solarized_dark");
                        closeCommandWindow();
                        break;

                    
                    //Language Switch
                    case "Lang: JavaScript":
                        languageModeText.innerText = "JavaScript";
                        editor.session.setMode("ace/mode/javascript");
                        closeCommandWindow()
                        break;
                    case "Lang: C++":
                        languageModeText.innerText = "C++";
                        editor.session.setMode("ace/mode/c_cpp");
                        closeCommandWindow()
                        break;
                    case "Lang: C":
                        languageModeText.innerText = "C";
                        editor.session.setMode("ace/mode/c_cpp");
                        closeCommandWindow()
                        break;
                    case "Lang: Rust":
                        languageModeText.innerText = "Rust";
                        editor.session.setMode("ace/mode/rust");
                        closeCommandWindow()
                        break;
                    case "Lang: Java!":
                        languageModeText.innerText = "Java!";
                        editor.session.setMode("ace/mode/java");
                        closeCommandWindow()
                        break;
                    case "Lang: C#":
                        languageModeText.innerText = "C#";
                        editor.session.setMode("ace/mode/csharp");
                        closeCommandWindow()
                        break;
                    case "Lang: GLSL Shader":
                        languageModeText.innerText = "GLSL";
                        editor.session.setMode("ace/mode/glsl");
                        closeCommandWindow();
                        break;
                }
            }
        }
    }
});

var selectedItemContent = null;
document.getElementById("command-input").addEventListener("keyup", function() {
    var input = document.getElementById("command-input");
    var filter = input.value.toUpperCase();
    var listElement = document.getElementById("command-list");
    var li = document.getElementsByClassName("command-list-item");
    for(var i = 0; i < li.length; i++) {
        var text = li[i].textContent || li[i].innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

    //find selection placement

    //check if there are any spaces to select and clear the selection for all of them
    var resultsAvalible = false;
    for(var i = 0; i < li.length; i++) {
        if (li[i].style.display == "") {
            resultsAvalible = true;
        }

        li[i].classList.remove("selected");
    }

    

    if (resultsAvalible) {
        for(var i = 0; i < li.length; i++) {
            if (li[i].style.display == "") {
                li[i].classList.add("selected");
                selectedItemContent = li[i].innerText;
                break;
            }
        }
    }

})

setInterval(() => {
    document.getElementById("file-info-ln").innerText = editor.getCursorPosition().row + 1;
    document.getElementById("file-info-col").innerText = editor.getCursorPosition().column;



    var input = document.getElementById("command-input");
    var filter = input.value.toUpperCase();
    var listElement = document.getElementById("command-list");
    var li = document.getElementsByClassName("command-list-item");
    for(var i = 0; i < li.length; i++) {
        var text = li[i].textContent || li[i].innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}, 100);

function closeCommandWindow() {
    document.getElementById("command-popup").style.transform = "scale(0)";
    document.getElementById("command-popup-back").style.display = "none";

    _("command-list").empty();

    _("command-list").append(`
    <li class="command-list-item">Change Language Mode</li>
    <li class="command-list-item">Change Color Theme</li>
    <li class="command-list-item">New File</li>
    <li class="command-list-item">Open File</li>
    <li class="command-list-item">Close File</li>
    <li class="command-list-item">Save File</li>
    <li class="command-list-item">Build C++ File</li>
    <li class="command-list-item">Build C File</li>
    <li class="command-list-item">Build JavaScript File</li>
    `);

    editor.focus();
}

var commands = {
    ChangeLanguageMode: function() {
        _("command-list").empty();

        _("command-list").append(`
        <li class="command-list-item">Lang: JavaScript</li>
        <li class="command-list-item">Lang: C++</li>
        <li class="command-list-item">Lang: C</li>
        <li class="command-list-item">Lang: Rust</li>
        <li class="command-list-item">Lang: Java!</li>
        <li class="command-list-item">Lang: C#</li>
        <li class="command-list-item">Lang: GLSL Shader</li>
        `);
    },
    ChangeColorTheme: function() {
        _("command-list").empty();

        _("command-list").append(`
        <li class="command-list-item">Theme: Ambiance</li>
        <li class="command-list-item">Theme: Chaos</li>
        <li class="command-list-item">Theme: Chrome</li>
        <li class="command-list-item">Theme: Clouds!</li>
        <li class="command-list-item">Theme: Clouds Midnight</li>
        <li class="command-list-item">Theme: Cobalt</li>
        <li class="command-list-item">Theme: Crimson Editor</li>
        <li class="command-list-item">Theme: Monokai</li>
        <li class="command-list-item">Theme: Solarized Dark (Default)</li>
        `);
    },
    NewFile: function() {},
    OpenFile: function() {},
    CloseFile: function() {},
    SaveFile: function() {},
    BuildCppFile: function() {
        child_process.execFile(require("os").homedir() + "\\AppData\\Local\\Programs\\shadow-engine\\codecomp.exe");
    },
    BuildCFile: function() {},
    BuildJavascriptFile: function() {}
}

function fileLoader() {
    const fl = {};

    fl.load = function(fileLocation) {
        var filename = fileLocation.split("\\")[fileLocation.split("\\").length - 1];
        console.log(filename);
        console.log("a");

        fs.readFile(fileLocation, "utf-8", (err, data) => {
            if (err) { snackbar(err); throw err; }
            var lineEndingText = document.getElementById("file-info-line-endings");
            if (getLineEnding(data) == "\r\n") {
                lineEndingText.innerText == "CRLF";
            } else if (getLineEnding(data) == "\n") {
                lineEndingText.innerText == "LF";
            } else {
                lineEndingText.innerText == "????";
            }

            console.log("b");

            if (getFileType(filename) == "unknown") {
                languageModeText.innerText = "Plain Text";
                editor.session.setMode("ace/mode/text");
                editor.setValue(data, -1);
                snackbar("Unknown file type :/");
                return;
            }
            console.log("c");

            switch (getFileType(filename)) {
                case "h": {
                    console.log("HEADER FILE!");
                    languageModeText.innerText = "Header";
                    editor.session.setMode("ace/mode/c_cpp");
                    editor.setValue(data, -1);
                    break;
                }
                case "js": {
                    languageModeText.innerText = "JavaScript";
                    editor.session.setMode("ace/mode/javascript");
                    editor.setValue(data, -1);
                    break;
                }
                case "cpp": {
                    languageModeText.innerText = "C++";
                    editor.session.setMode("ace/mode/c_cpp");
                    editor.setValue(data, -1);
                    break;
                }
                case "c": {
                    languageModeText.innerText = "C";
                    editor.session.setMode("ace/mode/c_cpp");
                    editor.setValue(data, -1);
                    break;
                }
                case "rust": {
                    languageModeText.innerText = "Rust";
                    editor.session.setMode("ace/mode/rust");
                    editor.setValue(data, -1);
                    break;
                }
                case "java": {
                    languageModeText.innerText = "Java!";
                    editor.session.setMode("ace/mode/java");
                    editor.setValue(data, -1);
                    break;
                }
                case "csharp": {
                    languageModeText.innerText = "C#";
                    editor.session.setMode("ace/mode/csharp");
                    editor.setValue(data, -1);
                    break;
                }
                default: {
                    console.log("WUT");
                }
            }

            console.log("d");
        });
    }

    return fl;
}

function snackbar(content) {
    _('snackbar').edit(content);

    document.getElementById('snackbar').classList.add("snackbar-show");

    setTimeout(function() {
        document.getElementById('snackbar').classList.remove('snackbar-show');
    }, 2000);
}

window.addEventListener("message", messageFromEditor);

function messageFromEditor(event) {
    switch(event.data.split(":")[0]) {
        case "FLL": /* File Loader */
            fileLoader().load(event.data);
            break;
        case "LOC": /* Locale Data */
            handleLocales(event.data.substr(4));
            break;
    }
}

/* Context Menu Events */

var cmenuEvents = {
    OpenCommandMenu: function() {
        document.getElementById("command-popup").style.transform = "scale(1)";
        document.getElementById("command-popup-back").style.display = "block";
        document.getElementById("command-input").focus();
        document.getElementById("command-input").value = "";
    },
    find: function() {
        editor.execCommand("find");
    },
    replace: function() {
        editor.execCommand("replace");
    },
    cut: function() {
        var buffer = editor.getCopyText();
        editor.execCommand("cut");
        clipboard.writeText(buffer);
        delete buffer;
        editor.focus();
    },
    copy: function() {
        var buffer = editor.getCopyText();
        editor.execCommand("copy");
        clipboard.writeText(buffer);
        delete buffer;
        editor.focus();
    },
    paste: function() {
        editor.execCommand("paste", clipboard.readText());
        editor.focus();
    },
    undo: function() {
        editor.execCommand("undo");
        editor.focus();
    },
    redo: function() {
        editor.execCommand("redo");
        editor.focus();
    },
    closeFile: function() {}
}

window.onload = function() {
    /* Removed below code because it's impossible for a tab to recive ipc events, only the editor. */
    /* ipcRenderer.on("main.localization.returnLocales", (event, locales) => {
        console.log("locales returned!");
    }); */
    ipcRenderer.send("localization.getLocales", "code-editor-tab");
};

function handleLocales(localesin) {
    var locales = JSON.parse(localesin);
    document.getElementById("cmenu-input-text1").innerText = locales.cmenuButton1;
    document.getElementById("cmenu-input-text2").innerText = locales.cmenuButton2;
    document.getElementById("cmenu-input-text3").innerText = locales.cmenuButton3;
    document.getElementById("cmenu-input-text4").innerText = locales.cmenuButton4;
    document.getElementById("cmenu-input-text5").innerText = locales.cmenuButton5;
    document.getElementById("cmenu-input-text6").innerText = locales.cmenuButton6;
    document.getElementById("cmenu-input-text7").innerText = locales.cmenuButton7;
    document.getElementById("cmenu-input-text8").innerText = locales.cmenuButton8;
    document.getElementById("cmenu-input-text9").innerText = locales.cmenuButton9;
}