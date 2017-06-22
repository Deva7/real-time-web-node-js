/*
Just as DOM emits listen to events emited, so does node, deriving from EventEmitter class.
*/
var EventEmitter = require('events').EventEmitter;

var logger = new EventEmitter(); // events error, warn, info

/*
When you emit an event, you have to be able to listen to them with a listener
*/

logger.on('error', function(message){
   console.log('ERR: ' + message);
});

logger.on('shunda', function(message){
    console.log('info: ' + message);
});
logger.emit('error', 'Spilled milk.');
logger.emit('error', 'Cracked eggs.');
logger.emit('info', 'shunda eggs.');

/*How does this work with the examples on module 1?

 http.createServer(function(request, response)

 http.createServer([requestListener])#
 Added in: v0.1.13
 requestListener <Function>

 Returns: <http.Server>

 Returns a new instance of http.Server.

 The requestListener is a function which is automatically added to the 'request' event.
 */

//A different way to write the code above.

//instead of sending the callback into createServer
//create an empty server
var server = http.createServer();
//on the request event, call this function
server.on('request', function(request, response){});
server.on('close', function(){});