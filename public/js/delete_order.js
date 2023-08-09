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