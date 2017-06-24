/*
EXPRESS is a minimal and flexible Node.js web application framework that provides a robust set of features for web and
mobile applications.
 */
var express = require('express');
var request = require('request');

var app = express(); //creates an instance of express

app.get('/', function(req, response){
   response.sendFile(__dirname + "/index.html");
});

//Another endpoint that consumes an API and stream it directly to the response (PIPE)
app.get('/br-ufs', function(req, response){
    var urlBrUfs = 'https://frontend-portalimob-mock.herokuapp.com/common/getUF';
    request(urlBrUfs).pipe(response);
});

/*
You can use TEMPLATES in HTML to use with Express - with template libraries, you can write dynamically to you HTML file.
EJS - Embedded JavaScript - npm install --save ejs
By default, it looks for templates in the myApp/views folder
*/
app.get('/br-ufs-view', function(req, response){
    var urlBrUfs = 'https://frontend-portalimob-mock.herokuapp.com/common/getUF';
    request(urlBrUfs, function(err, res, body){
        var ufs = JSON.parse(body);
        //define which data goes to the template with LOCALS
        response.locals = {ufs: ufs.uF};
        response.render('ufs.ejs');
    });
});



app.listen(8080);