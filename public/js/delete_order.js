// Citation for the following file:
// Adapted from Step 7 - Dynamically Deleting Data
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
function deleteOrder(orderID) {
    let link = '/delete_order';
    let data = {
        orderID: orderID
    };


    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(orderID);
        }
    });
}

function deleteRow(orderID) {
    let table = document.getElementById("orders_table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == orderID) {
            table.deleteRow(i);
            break;
        }
    }
}