var port = 15688;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('redis');
var redisClient = redis.createClient();

//Static route to provide files inside areas you don't want to expose
app.use('/modules', express.static('node_modules/'));

var storeMessage = function (name, data) {
    //need to turn object into string to store in redis
    var message = JSON.stringify({name: name, data: data});
    redisClient.lpush('messages', message, function (err, response) {
        //keeps only the last 10 messages
        redisClient.ltrim("messages", 0, 9);
    });
};

//Now socket.io and express share the same http server
io.on('connection', function (client) {
    client.on('join', function (name) {
        if (name !== null) {
            //this way, the data will be available both to the server and client
            client.nickname = name;

            //notify other clients a chatter has joined
            client.broadcast.emit("add chatter", name);

            //emit all the currently logged in chatters to the newly connected client
            redisClient.smembers('names', function (err, names) {
                names.forEach(function (name) {
                    client.emit('add chatter', name);
                })
            });
            //Add the name to the set
            redisClient.sadd("names", name);

            redisClient.lrange("messages", 0, -1, function (err, messages) {
                //reverse the array ti emit in correct order
                messages = messages.reverse();
                messages.forEach(function (message) {
                    //parse into JSON object
                    message = JSON.parse(message);
                    client.emit("messages", message.name + ': ' + message.data);
                });
            });
        }
    });

    client.on('messages', function (data) {
        var nickname = client.nickname;
        var message = nickname + ": " + data;
        //emit the 'messages' event on THIS client
        client.emit('messages', message);
        //broadcast message to all clients connected
        client.broadcast.emit('messages', message);
        storeMessage(nickname, message);
    });

    client.on('disconnect', function (name) {
        client.broadcast.emit('remove chatter', name);
        redisClient.srem('names', name);
    });

});

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

server.listen(port, function (data) {
    console.log('Server running on ' + port + '...');
});
