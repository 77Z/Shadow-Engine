const et = require("../index");

//Check for window test
console.log("Creating Notepad window...");
et.openNotepad();
console.log("Created\n\nChecking if notepad exists...");
if (et.checkForWindow("Notepad")) {
    console.log("Success");
} else {
    console.log("Fail at checkForWindow test");
    process.exit(0);
}
