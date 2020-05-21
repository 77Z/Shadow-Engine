var namepartsone = ["enthusiastic", "happy", "sad", "glad", "stunning", "running", "jumping", "leaping", "hopping", "sprinting", "shuffling", "dancing", "walking", "skipping", "building", "writing", "joyful", "depressed", "visual", "coding", "programming", "random", "flexing", "angry", "hiking", "gaming"];
var namepartstwo = ["llamas", "people", "humans", "dogs", "cats", "fish", "ostriches", "goggles", "penuts", "kiwis", "birds", "bears", "lions", "elephants", "horses", "rabbits", "bunnies", "hares", "dear", "tigers", "wolfes", "snakes", "cattle", "sheep", "alpacas", "monkeys", "goats", "geese", "insects", "bugs", "hipopotomi", "turtles", "pigs", "kangaroos", "ducks", "bats", "owls", "foxes", "chickens", "squirrels", "whales", "rhinos", "otters", "raccoons", "frogs", "eagles", "hyenas", "dolphins", "crocodiles", "leopards", "procupines", "lizards", "penguins", "zebras", "camels", "ferrets", "gorillas", "spiders", "parrots", "ants"];
var namepartsthree = ["eat-fish", "eat-seafood", "become-immortal", "go-on-a-run", "jump-on-trampolines", "eat-penuts", "write-books", "read-books", "eat-books", "go-to-the-store", "go-to-the-book-store", "eat-sandwiches", "buy-food", "buy-computers", "eat-jelly", "eat-jam", "drink-water", "drink-sprite", "drink-pepsi", "drink-cocacola", "drink-milk", "drink-chocolate-milk", "drink-apple-juice", "drink-orange-juice", "drink-gatorade", "play-minecraft", "play-portal-2", "play-wis", "play-undertale", "watch-twitch", "eat-goldfish", "eat-crackers", "wear-fedoras", "code", "code-on-github", "watch-youtube", "go-swimming", "do-backflips", "do-frontflips", "do-flips", "give-highfives", "give-footfives", "write-an-essay", "turn-the-lights-on", "lift-weights", "win-a-tornament", "solve-a-puzzle"];


function randomNumber(min, max) {
    var ptone = Math.random() * (max - min) + min;
    var pttwo = ptone.toString().split(".")[0]
    return pttwo;
}


module.exports = function() {
    var finalline = namepartsone[randomNumber(0,namepartsone.length)] + "-" + namepartstwo[randomNumber(0,namepartstwo.length)] + "-" + namepartsthree[randomNumber(0,namepartsthree.length)];
    return finalline;
}
