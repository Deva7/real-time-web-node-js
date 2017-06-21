var http = require('http');

/*http.createServer(function(request, response){
    response.writeHead(200); //status code in header
    response.write("Hello, this is dog.");//response body
    response.end();//close connection
}).listen(8080); //listen for connections on this port
console.log('Listening on port 8080...');*/

http.createServer(function(request, response){ //Event
    response.writeHead(200);
    response.write("Dog is running.");
    setTimeout(function(){ //Event
        response.write("Dog is done");
        response.end();
    }, 5000);
}).listen(8080);
console.log('Listening on port 8080...');