/*
    SETUP for a simple web app
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 8009;                 // Set a port number at the top so it's easy to change in the future
const path = require('path');

// Database
var db = require('./db-connector')

//handlebars setup

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files
app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/style.css'));
    
})

app.get('/', function(req, res) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    res.render('index'); 
});

app.get('/books.html', function(req, res) {
    //res.sendFile(path.join(__dirname + '/books.html'));
    let insertBooks = "select * from Books;";
    db.pool.query(insertBooks, function(error, rows, fields){
        res.render('books', {data: rows})
    })
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
    let insertOhB = "select * from Orders_has_Books;";
    db.pool.query(insertOhB, function(error, rows, fields){
        res.render('orders_has_books', {data: rows})
    })
})

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});