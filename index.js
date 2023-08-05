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

/*
    BOOKS
*/
app.get('/books.hbs', function(req, res) {
    //res.sendFile(path.join(__dirname + '/books.html'));
    let getBooks = "select * from Books;";
    db.pool.query(getBooks, function(error, rows, fields){
        res.render('books', {data: rows})
    })
})

app.post('/add_books', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `insert into Books (title, author, genre, price) values ('${data.title}', '${data.author}', '${data.genre}', '${data.price}')`;
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
            // If there was no error, perform a SELECT * on Books
            query2 = `SELECT * FROM Books;`;
            db.pool.query(query2, function(error, rows, fields) {
                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    // Redirect back to the books page after successful insert
                    // res.redirect('/books.hbs');
                    res.send(rows);
                }
            })
        }
    })
})

/*
    USERS
*/
app.get('/users.hbs', function(req, res) {
    let getUsers = "select * from Users;";
    db.pool.query(getUsers, function(error, rows, fields){
        res.render('users', {data: rows})
    })
})

app.post('/add_users', function(req, res){
    let data = req.body;

    query1 = `insert into Users (fName, lName, email) values ('${data.fName}', '${data.lName}', '${data.email}')`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Users;`;
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
})

/*
    ORDERS
*/
app.get('/orders.hbs', function(req, res) {
    let getOrders = "select * from Orders;";
    db.pool.query(getOrders, function(error, rows, fields){
        res.render('orders', {data: rows})
    })
})

app.post('/add_orders', function(req, res){
    let data = req.body;

    query1 = `insert into Orders (userID, customerName, addressLine1, addressLine2, city, state, postalCode, orderDate, orderStatus, quantity, totalDue, paymentMethod)
    values ('${data.userID}', '${data.customerName}', '${data.addressLine1}', '${data.addressLine2}', '${data.city}', '${data.state}', '${data.postalCode}', '${data.orderDate}', '${data.orderStatus}',, '${data.quantity}', '${data.totalDue}', '${data.paymentMethod}')`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Orders;`;
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
})

/*
    REVIEWS
*/
app.get('/reviews.hbs', function(req, res) {
    let getReviews = "select * from Reviews;";
    db.pool.query(getReviews, function(error, rows, fields){
        res.render('reviews', {data: rows})
    })
})

app.post('/add_reviews', function(req, res){
    let data = req.body;

    query1 = `insert into Reviews (userID, bookID, rating, description) values ('${data.userID}', '${data.bookID}', '${data.rating}', '${data.description}')`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Reviews;`;
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
})

/*
    ORDERS_HAS_BOOKS
*/
app.get('/orders_has_books.hbs', function(req, res) {
    let getOhB = "SELECT * FROM Orders_has_Books;";
    db.pool.query(getOhB, function(error, rows, fields){
        res.render('orders_has_books', {data: rows});
    })
})

app.post('/add_orders_has_books', function(req, res){
    let data = req.body;

    query1 = `insert into Orders_has_Books (orderID, bookID) values ('${data.orderID}', '${data.bookID}')`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Orders_has_Books;`;
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
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