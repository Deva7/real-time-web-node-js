var fs = require('fs');

var file = fs.createReadStream('origin.txt');
var destFile = fs.createWriteStream('destination.txt');

file.pipe(destFile, {end: false});

/*
If the option {end: false} wasn't passed above, the listener below would throw and error because pipe closes the
writable stream as the readable stream closes.
 */
file.on('end', function () {
    destFile.end('Finished!');
});