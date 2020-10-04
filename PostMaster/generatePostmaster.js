const fs = require("fs");

module.exports = {
    createPostmasterExecutable: function(settings, projectName, destination) {
        if (typeof settings !== "object") throw new TypeError("settings must be an object");
        if (typeof projectName !== "string") throw new TypeError("projectName must be a string");
        if (typeof destination !== "string") throw new TypeError("destination must be a string");

        var pages = settings.pages;
    }
};