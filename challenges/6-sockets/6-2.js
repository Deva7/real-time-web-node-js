var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

io.on('connection', function(client){
    console.log('New client connected.');
});

http.listen(8080, function(data){
    console.log('Listening on port 8080');
});