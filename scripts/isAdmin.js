var exec = require('child_process').exec;

module.exports = function() {
    if (process.platform == "win32") {
        exec('NET SESSION', function (err, so, se) {
            return se.length === 0 ? true : false;
        });
    } else {
        return false;
    }
}
