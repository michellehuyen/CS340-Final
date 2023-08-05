// Get the objects we need to modify
let addReviewsForm = document.getElementById('add-review');

// Modify the objects we need
addReviewsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUserID = document.getElementById("userID");
    let inputBookID = document.getElementById("bookID");
    let inputRating = document.getElementById("rating");
    let inputDescription = document.getElementById("description");

    // Get the values from the form fields
    let userIDValue = inputUserID.value;
    let bookIDValue = inputBookID.value;
    let ratingValue = inputRating.value;
    let descriptionValue = inputDescription.value;

    // Put our data we want to send in a javascript object
    let data = {
        userID: userIDValue,
        bookID: bookIDValue,
        rating: ratingValue,
        description: descriptionValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_reviews", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUserID.value = '';
            inputBookID.value = '';
            inputRating.value = '';
            inputDescription.value = '';
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
    let currentTable = document.getElementById("reviews_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let userIDCell = document.createElement("TD");
    let bookIDCell = document.createElement("TD");
    let ratingCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.reviewID;
    userIDCell.innerText = newRow.userID;
    bookIDCell.innerText = newRow.bookID;
    ratingCell.innerText = newRow.rating;
    descriptionCell.innerText = newRow.description;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(userIDCell);
    row.appendChild(bookIDCell);
    row.appendChild(ratingCell);
    row.appendChild(descriptionCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}