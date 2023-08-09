// Citation for the following file:
// Adapted from Step 5 - Adding New Data
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addUsersForm = document.getElementById('add-user');

// Modify the objects we need
addUsersForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("fName");
    let inputLastName = document.getElementById("lName");
    let inputEmail = document.getElementById("email");

    // Get the values from the form fields
    let fNameValue = inputFirstName.value;
    let lNameValue = inputLastName.value;
    let emailValue = inputEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        fName: fNameValue,
        lName: lNameValue,
        email: emailValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_users", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
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
    let currentTable = document.getElementById("users_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let fNameCell = document.createElement("TD");
    let lNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.userID;
    fNameCell.innerText = newRow.fName;
    lNameCell.innerText = newRow.lName;
    emailCell.innerText = newRow.email;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(fNameCell);
    row.appendChild(lNameCell);
    row.appendChild(emailCell);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("update-userID");
    let option = document.createElement("option");
    // option.text = newRow.fname + ' ' +  newRow.lname;
    // option.value = newRow.id;
    option.text = newRow.userID;
    option.value = newRow.userID;
    selectMenu.add(option);
}