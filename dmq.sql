-- Michelle Nguyen & Prestion Sellers
-- Group 44
-- Cloud Books

-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- 5 select queries --
select * from Books;
select * from Orders_has_Books;
select * from Orders;
select * from Users;
select * from Reviews;

-- 5 insert queries --
-- Query for add a new character functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

insert into Books(
    title,
    author,
    genre,
    price
)
values(
    :titleInput,
    :authorInput,
    :genreInput,
    :priceInput
);

insert into Orders_has_Books(
    orderID,
    bookID
)
values(
    :orderIDInput,
    :bookIDInput
);

insert into Orders(
    customerName,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    orderDate,
    orderStatus,
    quantity,
    totalDue,
    paymentMethod
)
values(
    :customerNameInput,
    :addressLine1Input,
    :addressLine2Input,
    :cityInput,
    :stateInput,
    :postalCodeInput,
    :orderDateInput,
    :orderStatusInput,
    :quantityInput,
    :totalDueInput,
    :paymentMethodInput
);

insert into Users(
    fName,
    lName,
    email
)
values(
    :fNameInput,
    :lNameInput,
    :emailInput
);

insert into Reviews(
    userID,
    bookID,
    rating,
    description
)
values(
    :userIDInput,
    :bookIDInput,
    :ratingInput,
    :descriptionInput
);

-- 1 update query --
update Orders
set orderStatus = "Fufilled"
where orderID = 1;

-- 1 delete query --
delete from Books where bookID = 1;

-- 1 dynamic drop down menu --





-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
