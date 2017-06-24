var warn = function (message) {
    console.log("Warning: " + message);
};

var info = function (message) {
    console.log("Info: " + message);
};

var error = function (message) {
    console.log("Error: " + message);
};

module.exports.info = info;
module.exports.warn = warn;
module.exports.error = error;