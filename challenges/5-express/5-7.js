var url = require('url');
var request = require('request');
var server = require('express');
var options = {
    protocol: "http:",
    host: "search.twitter.com",
    pathname: '/search.json',
    query: {
        q: "codeschool"
    }
};

var searchURL = url.format(options);

var app = server(); // Create server here

app.get('/', function (req, resp) {
    request(searchURL).pipe(resp);
});

app.listen(8080);