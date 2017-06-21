var fs = require('fs');

fs.readFile('index.html', function(error, contents){
    console.log(contents);
});