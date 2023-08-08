/*
    SETUP for a simple web app
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
PORT        = 8006;                 // Set a port number at the top so it's easy to change in the future

const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

// Database
var db = require('./db-connector')

//handlebars setup

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Static Files
app.use(express.static('public'));

/*
    ROUTES
*/
// https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files
app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/style.css'));
    
})

app.get('/', function(req, res) {
    res.render('index'); 
});

/*
    BOOKS
*/
app.get('/books.hbs', function(req, res) {
    //res.sendFile(path.join(__dirname + '/books.html'));
    let getBooks = "SELECT * FROM Books;";
    db.pool.query(getBooks, function(error, rows, fields){
        res.render('books', {data: rows})
    })
})

app.post('/add_books', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let price = parseFloat(data.price);

    // Create the query and run it on the database
    query1 = `INSERT INTO Books (title, author, genre, price) VALUES ('${data.title}', '${data.author}', '${data.genre}', ${price})`;
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
    let getUsers = "SELECT * FROM Users;";
    db.pool.query(getUsers, function(error, rows, fields){
        res.render('users', {data: rows})
    })
})

app.post('/add_users', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO Users (fName, lName, email) VALUES ('${data.fName}', '${data.lName}', '${data.email}')`;
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

app.put('/update-user', function (req, res, next) {
    let data = req.body;

    let userID = parseInt(data.userID);
    let fName = data.fName;
    let lName = data.lName;
    let email = data.email;

    let queryUpdateUser = `UPDATE Users SET fName = ?, lName = ?, email = ? WHERE Users.userID = ?`;
    let selectUser = `SELECT * FROM Users WHERE userID = ?`

    // Run the 1st query
    db.pool.query(queryUpdateUser, [fName, lName, email, userID], function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        // If there was no error, return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectUser, [fName, lName, email, userID], function(error, rows, fields) {
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
});

/*
    ORDERS
*/
app.get('/orders.hbs', function(req, res) {
    let getOrders = "SELECT * FROM Orders;";
    db.pool.query(getOrders, function(error, rows, fields){
        res.render('orders', {data: rows})
    })
})

app.post('/add_orders', function(req, res){
    let data = req.body;
    let userID = parseInt(data.userID);

    query1 = `INSERT INTO Orders (userID, customerName, addressLine1, addressLine2, city, state, postalCode, orderDate, orderStatus, quantity, totalDue, paymentMethod)
    VALUES ('${userID}', '${data.customerName}', '${data.addressLine1}', '${data.addressLine2}', '${data.city}', '${data.state}', '${data.postalCode}', '${data.orderDate}', '${data.orderStatus}',, '${data.quantity}', '${data.totalDue}', '${data.paymentMethod}')`;
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
    let getReviews = "SELECT * FROM Reviews;";
    db.pool.query(getReviews, function(error, rows, fields){
        let getBookIDs = "SELECT bookID FROM Books;";
        db.pool.query(getBookIDs, function(error, bookRows, fields){
            res.render('reviews', { data: rows, bookIDs: bookRows });
        });
        // res.render('reviews', { data: rows });
    })
})

app.post('/add_reviews', function(req, res){
    let data = req.body;
    
    let userID = parseInt(data.userID);
    let bookID = parseInt(data.bookID);
    let rating = parseInt(data.rating);

    query1 = `INSERT INTO Reviews (userID, bookID, rating, description) VALUES (${userID}, ${bookID}, ${rating}, '${data.description}')`;
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

app.put('/update-review', function (req, res, next) {
    let data = req.body;

    let reviewID = parseInt(data.reviewID);
    let rating = parseInt(data.rating);
    let description = data.description;

    let queryUpdateReview = `UPDATE Reviews SET rating = ?, description = ? WHERE Reviews.reviewID = ?`;
    let selectReview = `SELECT * FROM Reviews WHERE reviewID = ?`

    db.pool.query(queryUpdateReview, [rating, description, reviewID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(selectReview, [rating, description, reviewID], function(error, rows, fields) {
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
});

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
    
    let orderID = parseInt(data.orderID);
    let bookID = parseInt(data.bookID);

    query1 = `INSERT INTO Orders_has_Books (orderID, bookID) VALUES (${orderID}, ${bookID})`;
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