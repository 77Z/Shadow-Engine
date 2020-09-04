const ipc = require("electron").ipcRenderer;

const TermLetterCellSize = {
    height: 17,
    width: 9
};

var term = new Terminal({
    theme: {
        background: "#160024"
    }/* ,
    fontFamily: "Terminal" */
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



function calculateTerminalHeight(heightInPixels) {
    //height = 250 should be 13 rows??
    var numberrr = heightInPixels;
    if (typeof heightInPixels == "string") {
        number = parseInt(heightInPixels);
    }
    return Math.floor( ( heightInPixels / TermLetterCellSize.height ) - 1 );
}

//console.log(calculateTerminalHeight(250));
//
//ipc.send("terminal.resizeTerminal.height");


ipc.send("terminal.createTerminal");