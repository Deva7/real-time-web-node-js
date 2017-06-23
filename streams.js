/*
STREAMS are like channels, where data can flow through.
Streams can be readable, writable or both.

Request - is a readable stream
    Events:
        readable
        end
Response - is a writable stream

We read data from request and write to the response.
A response stream is kept open until response.end() is executed.

An example of file upload using PIPE (which allows you to read from a readable stream and write to a writable one)
readable.pipe(writable) - reads directly from readable and writes directly to writable
 */

var http = require('http');
var fs = require('fs');
http.createServer(function(request, response){
    var newFile = fs.createWriteStream("readme_copy.md");
    var fileBytes = request.headers['content-length'];
    var uploadedBytes = 0;
    request.on('readable', function(){
        var chunk = null;
        while(null !== (chunk = request.read())){
            uploadedBytes += chunk.length;
            var progress = (uploadedBytes / fileBytes) * 100;
            response.write('progress: ' + parseInt(progress, 10) + '%\n');
        }
    });
    request.pipe(newFile);
    response.end('Uploaded!');
}).listen(8080);
console.log('Listening on port 8080...');