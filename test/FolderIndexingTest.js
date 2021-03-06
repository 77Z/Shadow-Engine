const folderIndexer = require("../scripts/folder-indexer");

console.log(
    //folderIndexer("C:/Users/Owner/AppData/Roaming/Shadow Engine")
    JSON.stringify(
        folderIndexer("C:/Users/Owner/AppData/Roaming/Shadow Engine/"),
        null,
        2
    )
);