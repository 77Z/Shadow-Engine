module.exports = function(filename) {
    if (typeof filename !== "string") throw new TypeError("filename must be a string!");
    if (filename == "") {
        return "Project name can't be blank";
    } else {
        if (filename == "CON") {
            return "CON is a name reserved by Windows";
        } else if (filename == "PRN") {
            return "PRN is a name reserved by Windows";
        } else if (filename == "AUX") {
            return "AUX is a name reserved by Windows";
        } else if (filename == "NUL") {
            return "NUL is a name reserved by Windows";
        } else if (filename == "COM1") {
            return "COM1 is a name reserved by Windows";
        } else if (filename == "COM2") {
            return "COM2 is a name reserved by Windows";
        } else if (filename == "COM3") {
            return "COM3 is a name reserved by Windows";
        } else if (filename == "COM4") {
            return "COM4 is a name reserved by Windows";
        } else if (filename == "COM5") {
            return "COM5 is a name reserved by Windows";
        } else if (filename == "COM6") {
            return "COM6 is a name reserved by Windows";
        } else if (filename == "COM7") {
            return "COM7 is a name reserved by Windows";
        } else if (filename == "COM8") {
            return "COM8 is a name reserved by Windows";
        } else if (filename == "COM9") {
            return "COM9 is a name reserved by Windows";
        } else if (filename == "LPT1") {
            return "LPT1 is a name reserved by Windows";
        } else if (filename == "LPT2") {
            return "LPT2 is a name reserved by Windows";
        } else if (filename == "LPT3") {
            return "LPT3 is a name reserved by Windows";
        } else if (filename == "LPT4") {
            return "LPT4 is a name reserved by Windows";
        } else if (filename == "LPT5") {
            return "LPT5 is a name reserved by Windows";
        } else if (filename == "LPT6") {
            return "LPT6 is a name reserved by Windows";
        } else if (filename == "LPT7") {
            return "LPT7 is a name reserved by Windows";
        } else if (filename == "LPT8") {
            return "LPT8 is a name reserved by Windows";
        } else if (filename == "LPT9") {
            return "LPT9 is a name reserved by Windows";
        } else if (filename == ".") {
            return "Just a dot is not allowed by Windows";
        } else if (filename == " ") {
            return "Just a space is not allowed by Windows";
        } else {
            //Further Checks
            //Check for a space or period at the start and end of the string.

            if (filename.charAt(0) == " ") {
                return "Windows does not allow a space at the beginning";
            } else if (filename.charAt(0) == ".") {
                return "Shadow Engine does not allow a dot at the beginning";
            } else if (filename.charAt(filename.length - 1) == " ") {
                return "Windows does not allow a space at the end"
            } else if (filename.charAt(filename.length - 1) == ".") {
                return "Windows does not allow a dot at the end";
            } else {
                //MORE CHECKS
                //This time, with regualar expressions
                var charactorsNotAllowed = /[/\\<>:"|?* ]/;
                if (filename.match(charactorsNotAllowed)) {
                    return "It is not allowed to have the following characters: / \\ < > : \" | ? * space"
                } else {
                    return true;
                }
            }
        }
    }
}