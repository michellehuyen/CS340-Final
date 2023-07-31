/*
    SETUP for a simple web app
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 8002;                 // Set a port number at the top so it's easy to change in the future
const path = require('path');

// Database
// var db = require('./db-connector')

https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files
app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/style.css'));
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/books.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/books.html'));
})

app.get('/users.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/users.html'));
})

app.get('/orders.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/orders.html'));
})


app.get('/reviews.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/reviews.html'));
})

app.get('/orders_has_books.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/orders_has_books.html'));
})

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});