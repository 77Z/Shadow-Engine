const getProjectName = require("./get-project"); // <- Function

module.exports = function(materialLocation) {
    var macroDir = ""; //The part of the location string that expands
    var macrolength  = 0; // The length of the macro so it can be cut off later

    switch(materialLocation.charAt(0)) {
        case "#": // # means macro, and it can expand to a certain dir on the system
            switch(materialLocation.substring(1, 5)) { //Nested switch statements woohoo!
                case "home": //refers to the home dir on the system, ex: C:\Users\Owner or on linux: ~ or /home/Owner
                    macroDir = require("os").homedir();
                    macrolength = 5;
                    break;
                case "sddr": //refers to the Shadow Engine Data Directory (C:/Users/Owner/AppData/Roaming/Shadow Engine OR /home/Owner/Shadow Engine)
                    macroDir = shadowEngineDataDir;
                    macrolength = 5;
                    break;
            };
            break;
        case "$": // Set it to nothing because the full directory is shown
            macroDir = "";
            macrolength = 1;
            break;
        case "/":
            macroDir = shadowEngineDataDir + "/projects/" + getProjectName();
            macrolength = 0;
            break;
    };

    var dirAfterMacroRemoval = materialLocation.slice(macrolength); //this is the other half of the directory

    return macroDir + dirAfterMacroRemoval;
}