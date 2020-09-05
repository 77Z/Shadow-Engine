#!/usr/bin/env node
const {argv} = require('yargs');
const fs = require("fs");

var input = argv.inputFile;
var output = argv.outputFile;
var lineEnding = argv.leType;

fs.readFile(input, 'utf-8', (err, data) => {
    if (err) throw err;
    var lineSplit;
    if (lineEnding == "CRLF") {
        lineSplit = data.split("\r\n");
    } else if (lineEnding == "LF") {
        lineSplit = data.split("\n");
    } else { throw new Error("leType unknown...!!??"); }

    var out;
    for (var i = 0; i < lineSplit.length; i++) {
        out += lineSplit[i] + "\\n";
    }
    fs.writeFile(output, out, 'utf-8', (err) => {
        if (err) throw err;
        console.log("done");
    });
});

