//Yes, I know, this is a terrible way to remove comments.
//Because of the fact that if you double-stack comments
//This code won't work, why not just run it twice then?
//That's what I did, it's still a bad idea...

module.exports = function(data) {
    var cycle1 = remove(data);
    var cycle2 = remove(cycle1);
    return cycle2
}

function remove(data) {
    var commentFinder = /\/\/(?=([^"]*"[^"]*")*[^"]*$)/g;
    var dataByLine = data.split("\n");
    for (var i = 0; i < dataByLine.length; i++) {
        var line = dataByLine[i];
        console.log("Line: " + line);
        var linematch = commentFinder.exec(line);
        if (linematch) {
            console.log("Line " + i + " has //");
            var matchpos = linematch.index;
            var processedLine = line.substr(0, matchpos);
            console.log("Processed line number " + i + ": " + processedLine);
            dataByLine.splice(i, 1, processedLine);
        } else console.log("Line " + i + " has no //");
    }
    return dataByLine.join("\n");
}