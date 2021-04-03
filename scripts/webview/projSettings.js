//Global
var shadowEngineDataDir;
if (process.platform == "linux") {
    shadowEngineDataDir = require("os").homedir + "/Shadow Engine";
} else if (process.platform == "win32") {
    shadowEngineDataDir = require("os").homedir + "\\AppData\\Roaming\\Shadow Engine";
}

const request = require("request");
const fetch = require("node-fetch");
const { ipcRenderer } = require("electron");
const dns = require("dns");
const { existsSync, mkdirSync, rename } = require("fs");
const extract = require("extract-zip");


var latestGradleVersion = null;

window.onload = function() {
    getLatestGradleVersion();
};


function getLatestGradleVersion() {
    fetch("https://api.github.com/repos/gradle/gradle/releases/latest")
    .then(res => res.json())
    .then(out => {
        // We're relying that Gradle consistantly names their
        // releases the exact version name
        latestGradleVersion = out.name;

        document.getElementById("download-gradle-button").innerText = "Download Gradle Version " + latestGradleVersion;
        document.getElementById("download-gradle-button").addEventListener("click", installGradle);
    })
    .catch(err => { throw err; });
}

function installGradle() {

    //Show the Gradle installation log
    document.getElementById("gradle-install-log").style.display = "block";

    //Create Gradle folder in plugins
    if (!existsSync(`${shadowEngineDataDir}/plugins/gradle`)) {
        mkdirSync(`${shadowEngineDataDir}/plugins/gradle`);
    }

    //Check for internet connection
    dns.resolve("https://google.com", function(err) {
        //Screw this function, it doesn't work so i'm just gonna take the risk that you have internet
        /* if (err && err.code == "ENOTFOUND") {
            logToConsole("FATAL: Can't connect to the internet, breaking...");
            console.log(err);
            return;
        } else {
            logToConsole("Internet connection established");
        } */
    });
    ipcRenderer.send("internet.downloadFile", `https://services.gradle.org/distributions/gradle-${latestGradleVersion}-bin.zip`, `${shadowEngineDataDir}/plugins/gradle`, () => {
        logToConsole("Download successful");
        logToConsole("Extracting Gradle zipball");
        extractZipball(() => {
            logToConsole("Done extracting zipball");
            logToConsole("Renaming extracted Gradle build");
            //rename(`${shadowEngineDataDir}/plugins/gradle/gradle-${latestGradleVersion}-bin`, `${shadowEngineDataDir}/plugins/gradle/gradle-${latestGradleVersion}-bin`)
        });
    });

    function logToConsole(data) {
        var consoleElement = document.createElement("p");
        consoleElement.appendChild(document.createTextNode(data));
        document.getElementById("gradle-install-log").appendChild(consoleElement);
    }

    async function extractZipball(callback) {
        try {
            await extract(`${shadowEngineDataDir}/plugins/gradle/gradle-${latestGradleVersion}-bin.zip`, { dir: `${shadowEngineDataDir}/plugins/gradle` });
            callback();
        } catch(err) {
            throw err;
        }
    }
}