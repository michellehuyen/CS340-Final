// Citation for the following file
// Adapted from Step 8 - Dynamically Updating Data
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-user');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomer = document.getElementById("update-customer");
    let inputFName = document.getElementById("update-fName");
    let inputLName = document.getElementById("update-lName");
    let inputEmail = document.getElementById("update-email");

    // Get the values from the form fields
    let customerValue = inputCustomer.value;
    let fNameValue = inputFName.value;
    let lNameValue = inputLName.value;
    let emailValue = inputEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        userID: customerValue,
        fName: fNameValue,
        lName: lNameValue,
        email: emailValue
    }

    // console.log(data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update_user", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(data, customerValue);

            inputCustomer.value = 'Select a Customer';
            inputFName.value = '';
            inputLName.value = '';
            inputEmail.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customer){
    // let parsedData = JSON.parse(data);
    
    let table = document.getElementById("users_table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customer) {

            // Get the location of the row where we found the matching user ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of first name value
            let tdFName = updateRowIndex.getElementsByTagName("td")[1];
            // Reassign first name to our value we updated to
            tdFName.innerHTML = data.fName;

            // Get td of last name value
            let tdLName = updateRowIndex.getElementsByTagName("td")[2];
            // Reassign last name to our value we updated to
            tdLName.innerHTML = data.lName;

            // Get td of email value
            let tdEmail = updateRowIndex.getElementsByTagName("td")[3];
            // Reassign email to our value we updated to
            tdEmail.innerHTML = data.email;
       }
    }
}