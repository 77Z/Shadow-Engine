var term = new Terminal();
term.open(document.getElementById("terminal"));
term.write("Hello");
term.onData(e => {
    term.write(e);
});
