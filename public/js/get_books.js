// Get the objects we need to modify
let getBookForm = document.getElementById('search-for-book');

// Modify the objects we need
getBookForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputBook = document.getElementById("searchBook");

    // Get the values from the form fields
    let bookTitle = inputBook.value;

    // Put our data we want to send in a javascript object
    let data = {
        title: bookTitle
    }
    console.log(data)

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/get_books", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        console.log(xhttp.readyState)
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Clear the input fields for another transaction
            inputBook.value = 'Select a Book Title';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})