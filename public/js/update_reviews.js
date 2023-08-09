// Get the objects we need to modify
let updateReviewForm = document.getElementById('update-review');

// Modify the objects we need
updateReviewForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputReviewID = document.getElementById("update-reviewID");
    let inputRating = document.getElementById("update-rating");
    let inputDescription = document.getElementById("update-description");

    // Get the values from the form fields
    let reviewIDValue = inputReviewID.value;
    let ratingValue = inputRating.value;
    let descriptionValue = inputDescription.value;

    // Put our data we want to send in a javascript object
    let data = {
        reviewID: reviewIDValue,
        rating: ratingValue,
        description: descriptionValue
    }

    console.log(data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update_review", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(data, reviewIDValue);

            inputReviewID.value = 'Select a reviewID';
            inputRating.value = '1';
            inputDescription.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, reviewID){
    // let parsedData = JSON.parse(data);
    
    let table = document.getElementById("reviews_table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == reviewID) {

            // Get the location of the row where we found the matching user ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of rating value
            let tdRating = updateRowIndex.getElementsByTagName("td")[3];
            // Reassign rating to our value we updated to
            tdRating.innerHTML = data.rating;

            // Get td of description value
            let tdDescription = updateRowIndex.getElementsByTagName("td")[4];
            // Reassign description to our value we updated to
            tdDescription.innerHTML = data.description;
       }
    }
}