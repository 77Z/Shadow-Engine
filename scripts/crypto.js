const CryptoJS = require("crypto-js");

module.exports = {
    encrypt: function(text) {
        var e = CryptoJS.AES.encrypt(text, "19684197765187965198759").toString();
        return e;
    },
    decrypt: function(text) {
        var e = CryptoJS.AES.decrypt(text, "19684197765187965198759");
        return e.toString(CryptoJS.enc.Utf8);
    }
};