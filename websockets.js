/*
WEBSOCKETS - the traditional way of communication between server and browser is through request/response.
The browser requests something from the server, it awaits the server process the request and answer to the browser.

A websocket is a two way communication through an open connection between server and browser.

Not all browsers support websockets, so that it is best to use a library for that.
SOCKET.IO comes in handy.
*/

var port = 15688;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Static route to provide files inside areas you don't want to expose
app.use('/modules', express.static(__dirname + '/node_modules/'));

//Now socket.io and express share the same http server
io.on('connection', function (client) {
    console.log('Client connected...');

    client.on('join', function(name){
        //this way, the data will be available both to the server and client
        client.nickname = name;
    });

    client.on('messages', function(data){
        var nickname = client.nickname;
        var message = nickname + ": " + data;
        //emit the 'messages' event on THIS client
        client.emit('messages', message);
        //broadcast message to all clients connected
        client.broadcast.emit('messages', message);
    });
});

app.get('/', function(request, response){
    response.sendFile(__dirname + '/socket.html');
});

server.listen(port);
console.log('Server running on ' + port + '...');