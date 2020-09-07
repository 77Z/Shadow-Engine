const child_process = require("child_process");

if (process.platform == "linux") {
    console.log("running tests for linux");
    process.exit(0);
} else if (process.platform == "win32") {
    console.log("running tests for win32");
    child_process.exec("ShadowTests.exe", (error, stdout, stderr) => {
        if (error) console.error(error);
        console.log(stdout);
        console.log(stderr);
    });
} else {
    console.log("platform not supported :(");
}