const ipc = require("electron").ipcRenderer;

var term = new Terminal({
    theme: {
        background: "#160024"
    }
});
term.open(document.getElementById("terminal"));
term.write("Shadow Terminal\r\n\r\n");


document.body.onmousedown = function(e) {
    if (e.button == 1) return false;
};

console.log("Middle Mouse Scroll Prevented");

window.addEventListener("message", messageFromMainTab);

function messageFromMainTab(event) {
    term.write(event.data);
}

term.onData(e => {
    ipc.send("terminal.keystroke", e);
})

ipc.send("terminal.createTerminal");