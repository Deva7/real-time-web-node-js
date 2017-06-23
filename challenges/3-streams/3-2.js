var fs = require('fs'); //imports the File System module
var file = fs.createReadStream('fruits.txt'); //creates a readableStream with the file fruits.txt
file.on('readable', function(){//listens to the reading of the file
    var chunk = null;
    while(null !== (chunk = file.read())){//read the file in chunks
        console.log(chunk.toString());//prints the chunks of information to the console
    }
});