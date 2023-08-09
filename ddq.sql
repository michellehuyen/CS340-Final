-- Michelle Nguyen & Prestion Sellers
-- Group 44
-- Cloud Books

-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- TABLE CREATIONS --

-- Create Books table
CREATE OR REPLACE TABLE Books (
    bookID int NOT NULL AUTO_INCREMENT,
    title varchar(255),
    author varchar(255),
    genre varchar(255),
    price decimal(10,2),
    PRIMARY KEY (bookID)
);

-- Create intersection table for M:M relationship between Books and Orders
create or replace table Orders_has_Books(
    ordersHasBooksID int(11) not null AUTO_INCREMENT,
    orderID int(11) not null, 
    bookID int(11) not null,
    constraint orderID foreign key(orderID) references Orders(orderID) on delete cascade,
    constraint bookID foreign key(bookID) references Books(bookID) on delete cascade,
    primary key(ordersHasBooksID) 
);

-- Create Orders table
CREATE OR REPLACE TABLE Orders (
    orderID int not NULL AUTO_INCREMENT,
    userID int not NULL,
    customerName varchar(255) not NULL,
    addressLine1 varchar(255) not NULL,
    addressLine2 varchar(255) NULL,
    city varchar(255) not NULL,
    state varchar(255) not NULL,
    postalCode varchar(255) not NULL,
    orderDate date not NULL,
    orderStatus varchar(255) not NULL,
    quantity int not NULL,
    totalDue decimal(19,2) not NULL,
    paymentMethod varchar(255) not NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

-- Create Users table
CREATE OR REPLACE TABLE Users (
    userID int not NULL AUTO_INCREMENT,
    fName varchar(255) not NULL,
    lName varchar(255) not NULL,
    email varchar(255) not NULL,
    PRIMARY KEY (userID)
);

-- Create Reviews table
CREATE OR REPLACE TABLE Reviews (
    reviewID int not NULL AUTO_INCREMENT,
    userID int,
    bookID int not NULL,
    rating int not NULL,
    description mediumtext not NULL,
    PRIMARY KEY (reviewID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE
);


-- DATA INSERTIONS -- 

-- Insert values into the Books table
INSERT INTO Books (
    title,
    author,
    genre,
    price
)
VALUES 
(
    "The Bitcoin Standard",
    "Saifedean Ammous",
    "Economics",
    14.54
),
(
    "The Price of Tomorrow",
    "Jeff Booth",
    "Technology",
    29.49
),
(
    "Permanent Record",
    "Edward Snowden",
    "Security",
    10.81
);

-- need to add inserts for intersection table but i need to figure out what will go in the 
-- intersection table and what will go in the orders table

insert into Orders_has_Books
(
    orderID,
    bookID
)
values
(
    1,1
),
(
    2,2
),
(
    3,3
);


-- Insert values into the Orders table
INSERT INTO Orders (
    userID,
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
VALUES
(
    1,
    "Sam Doe",
    "1234 Main st.",
    NULL,
    "Atlanta",
    "Georgia",
    22923,
    "2012-09-12",
    "Pending",
    2,
    34.55,
    "visa 0978"
),
(
    2,
    "Joy Soh",
    "5678 Canyon Road",
    NULL,
    "Sherwood",
    "Oregon",
    99897,
    "1969-04-20",
    "Completed",
    1,
    13.32,
    "mastercard 8765"
),
(
    3,
    "Bill Goldberg",
    "210 Bowman St.",
    "APT. #G300",
    "Hamburg",
    'New York',
    14075,
    "1997-06-03",
    "Completed",
    1,
    12.21,
    "bitcoin"
);

-- Insert values into the Users table
INSERT INTO Users (
    fName,
    lName,
    email
)
VALUES
(
    "Sam",
    "Doe",
    "sam1@gmail.com"
),
(
    "Joy",
    "Soh",
    "jpy1@yahoo.com"
),
(
    "Bill",
    "Goldberg",
    "bill1@hotmail.com"
);

-- Insert values into the Reviews table
INSERT INTO Reviews (
    userID,
    bookID,
    rating,
    description
)
VALUES
(
    1,
    34,
    4,
    "I enjoyed learning about Bitcoin"
),
(
    2,
    43,
    3,
    "This book wasn't that great."
),
(
    3,
    23,
    5,
    "Best book I've read by far!"
);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
