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
    userID,
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
    :userIDInput,
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

-- 1 update query that sets FK value to NULL --
-- Reviews can have a NULL value for the userID --
update Reviews
set userID = NULL
where userID = :userIDInput;

-- 1 other update --
update Users
set fname = :fNameInput, lname = :lNameInput, email = :emailInput
where userID = :userIDInput;

-- 1 delete query --
-- deleting an order should not delete any customers --
delete from Orders where orderID = :orderIDInput;

-- 1 dynamic drop down menu OR  1 search feature. lets let the user search for a book --
select title from Books; -- get all book titles by drop down list then have user select --

-- get all books by search feature where user input of the book title matches the rows title -- 
select title from Books where :titleInput = title; 



-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;