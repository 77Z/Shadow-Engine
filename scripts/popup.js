const {ipcRenderer} = require("electron");

window.onload = function() {
    document.getElementById("content").style.transition = "0.5s";
    this.setTimeout(function() {
        document.getElementById("content").style.transform = "scale(1)";
    }, 200);
    document.getElementById("ok").addEventListener("click", function() {
        document.getElementById("content").style.transform = "scale(0)";
        setTimeout(function() {
            window.close();
        }, 500);
    });
};

ipcRenderer.on("content", function(event, content) {
    document.getElementById("text").innerText = content;
});