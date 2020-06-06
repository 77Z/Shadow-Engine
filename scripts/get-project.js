    //--------------------------------------//
   // Get the project that's curently open //
  // it's probably a bad idea to use this //
 // in the project browser...            //
//--------------------------------------//

const configFileReader = require("./terrain-config-file-reader");
module.exports = function() {
    var p = configFileReader.readConfigFile(require("os").homedir() + "\\AppData\\Roaming\\Shadow Engine\\engine-data\\proj.sec", 1);
    return p;
};