// Citation for the following file:
// Adapted from Step 5 - Adding New Data
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addBooksForm = document.getElementById('add-book');

// Modify the objects we need
addBooksForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("add-title");
    let inputAuthor = document.getElementById("add-author");
    let inputGenre = document.getElementById("add-genre");
    let inputPrice = document.getElementById("add-price");

    // Get the values from the form fields
    let titleValue = inputTitle.value;
    let authorValue = inputAuthor.value;
    let genreValue = inputGenre.value;
    let priceValue = inputPrice.value;

    // use the site below to learn how to replace the single quotes with double quotes
    // https://stackoverflow.com/questions/16450250/how-do-i-replace-single-quotes-with-double-quotes-in-javascript
    titleValue = titleValue.replace(/'/g, "''");
    authorValue = authorValue.replace(/'/g, "''");
    genreValue = genreValue.replace(/'/g, "''");

    // Put our data we want to send in a javascript object
    let data = {
        title: titleValue,
        author: authorValue,
        genre: genreValue,
        price: priceValue
    }
    
    // console.log("!!!", data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_books", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTitle.value = '';
            inputAuthor.value = '';
            inputGenre.value = '';
            inputPrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("books_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let authorCell = document.createElement("TD");
    let genreCell = document.createElement("TD");
    let priceCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.bookID;
    titleCell.innerText = newRow.title;
    authorCell.innerText = newRow.author;
    genreCell.innerText = newRow.genre;
    priceCell.innerText = newRow.price;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(genreCell);
    row.appendChild(priceCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}