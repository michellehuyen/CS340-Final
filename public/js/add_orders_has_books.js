// Citation for the following file:
// Adapted from Step 5 - Adding New Data
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addOrdersHasBooksForm = document.getElementById('add_orders_has_books_form');

// Modify the objects we need
addOrdersHasBooksForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("orderID");
    let inputBookID = document.getElementById("bookID");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let bookIDValue = inputBookID.value;

    // Put our data we want to send in a javascript object
    let data = {
        orderID: orderIDValue,
        bookID: bookIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_orders_has_books", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderID.value = '';
            inputBookID.value = '';
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
    let currentTable = document.getElementById("OhB-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let orderIDCell = document.createElement("TD");
    let bookIDCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.ordersHasBooksID;
    orderIDCell.innerText = newRow.orderID;
    bookIDCell.innerText = newRow.bookID;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(orderIDCell);
    row.appendChild(bookIDCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}