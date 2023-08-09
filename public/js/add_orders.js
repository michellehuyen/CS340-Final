// Get the objects we need to modify
let addOrdersForm = document.getElementById('add-order');

// Modify the objects we need
addOrdersForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUserID = document.getElementById("userID");
    // let inputCustomerName = document.getElementById("customerName");
    let inputAddrLine1 = document.getElementById("addressLine1");
    let inputAddrLine2 = document.getElementById("addressLine2");
    let inputCity = document.getElementById("city");
    let inputState = document.getElementById("state");
    let inputPostalCode = document.getElementById("postalCode");
    let inputOrderDate = document.getElementById("orderDate");
    let inputOrderStatus = document.getElementById("orderStatus");
    let inputQuantity = document.getElementById("quantity");
    let inputTotalDue = document.getElementById("totalDue");
    let inputPaymentMethod = document.getElementById("paymentMethod");

    // Get the values from the form fields
    let userIDValue = inputUserID.value;
    // let customerNameValue = inputCustomerName.value;
    let addrLine1Value = inputAddrLine1.value;
    let addrLine2Value = inputAddrLine2.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let postalCodeValue = inputPostalCode.value;
    let orderDateValue = inputOrderDate.value;
    let orderStatusValue = inputOrderStatus.value;
    let quantityValue = inputQuantity.value;
    let totalDueValue = inputTotalDue.value;
    let paymentMethodValue = inputPaymentMethod.value;


    // customerNameValue = customerNameValue.replace(/'/g, "''");
    addrLine1Value = addrLine1Value.replace(/'/g, "''");
    addrLine2Value = addrLine2Value.replace(/'/g, "''");
    cityValue = cityValue.replace(/'/g, "''");
    stateValue = stateValue.replace(/'/g, "''");
    paymentMethodValue = paymentMethodValue.replace(/'/g, "''");


    // Put our data we want to send in a javascript object
    let data = {
        userID: userIDValue,
        // customerName: customerNameValue,
        addressLine1: addrLine1Value,
        addressLine2: addrLine2Value,
        city: cityValue,
        state: stateValue,
        postalCode: postalCodeValue,
        orderDate: orderDateValue,
        orderStatus: orderStatusValue,
        quantity: quantityValue,
        totalDue: totalDueValue,
        paymentMethod: paymentMethodValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_orders", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUserID.value = '';
            // inputCustomerName.value = '';
            inputAddrLine1.value = '';
            inputAddrLine2.value = '';
            inputCity.value = '';
            inputState.value = '';
            inputPostalCode.value = '';
            inputOrderDate.value = '';
            inputOrderStatus.value = 'Pending';
            inputQuantity.value = '';
            inputTotalDue.value = '';
            inputPaymentMethod.value = '';
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
    let currentTable = document.getElementById("orders_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let userIDCell = document.createElement("TD");
    // let customerNameCell = document.createElement("TD");
    let addrLine1Cell = document.createElement("TD");
    let addrLine2Cell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let postalCodeCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let orderStatusCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let totalDueCell = document.createElement("TD");
    let paymentMethodCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.orderID;
    userIDCell.innerText = newRow.userID;
    // customerNameCell.innerText = newRow.customerName;
    addrLine1Cell.innerText = newRow.addressLine1;
    addrLine2Cell.innerText = newRow.addressLine2;
    cityCell.innerText = newRow.city;
    stateCell.innerText = newRow.state;
    postalCodeCell.innerText = newRow.postalCode;
    orderDateCell.innerText = newRow.orderDate;
    orderStatusCell.innerText = newRow.orderStatus;
    quantityCell.innerText = newRow.quantity;
    totalDueCell.innerText = newRow.totalDue;
    paymentMethodCell.innerText = newRow.paymentMethod;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteOrder(newRow.orderID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(userIDCell);
    // row.appendChild(customerNameCell);
    row.appendChild(addrLine1Cell);
    row.appendChild(addrLine2Cell);
    row.appendChild(cityCell);
    row.appendChild(stateCell);
    row.appendChild(postalCodeCell);
    row.appendChild(orderDateCell);
    row.appendChild(orderStatusCell);
    row.appendChild(quantityCell);
    row.appendChild(totalDueCell);
    row.appendChild(paymentMethodCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.orderID);

    // Add the row to the table
    currentTable.appendChild(row);
}