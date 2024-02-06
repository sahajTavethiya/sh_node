// const crypto = require("crypto");

// const key = '12345678901234567890123456789012';
// const iv = 'abcdefghijklmnop';

// function encrypt(text, callback) {
//   // return callback(text);
//   let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return callback(encrypted.toString("base64"));
// }

// function decrypt(text, callback) {
//   // let iv = Buffer.from(iv_req, "utf-8");
//   let encryptedText = Buffer.from(text, "base64");
//   let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return callback(decrypted.toString());
// }

var crypto = require('crypto');
var keyBase64 = "DWIzFkO22qfVMgx2fIsxOXnwz10pRuZfFJBvf4RS3eY=";
var ivBase64 = 'AcynMwikMkW4c7+mHtwtfw==';

function getAlgorithm(keyBase64) {
    var key = Buffer.from(keyBase64, 'base64');
    // console.log(key.length);
    switch (key.length) {
        case 16:
            return 'aes-128-cbc';
        case 32:
            return 'aes-256-cbc';
    }
    throw new Error('Invalid key length: ' + key.length);
}

function encrypt(plainText, callback) {
    const key = Buffer.from(keyBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');
    const cipher = crypto.createCipheriv(getAlgorithm(keyBase64), key, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'base64')
    encrypted += cipher.final('base64');
    return callback(encrypted.toString());
};

function decrypt(messagebase64, callback) {
    const key = Buffer.from(keyBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');
    const decipher = crypto.createDecipheriv(getAlgorithm(keyBase64), key, iv);
    let decrypted = decipher.update(messagebase64, 'base64');
    decrypted += decipher.final();
    return callback(decrypted.toString());
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;