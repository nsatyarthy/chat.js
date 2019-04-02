const crypto = require("crypto-js");
const secret_key = 'kjl238dfjkJDDJkjdkd3981723y67FKLDJL';

module.exports = {
    encrypt: function(text) {
        s = crypto.AES.encrypt(text, secret_key).toString();
        return s;
    },
    decrypt: function(text) {
        var bytes = crypto.AES.decrypt(text, secret_key);
        var s = bytes.toString(crypto.enc.Utf8);
        return s;
    }
};
