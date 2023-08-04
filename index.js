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
// https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files
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

app.post('/add_orders_has_books', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Orders_has_Books (orderID, bookID) VALUES ('${data.orderID}', '${data.bookID}')`;
    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Orders_has_Books and
        // presents it on the screen
        else {
            // If there was no error, perform a SELECT * on Orders_has_Books
            query2 = `SELECT * FROM Orders_has_Books;`;
            db.pool.query(query2, function(error, rows, fields) {
                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
})

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
})