-- Michelle Nguyen & Prestion Sellers
-- Team 10

-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Create Books table
CREATE OR REPLACE TABLE Books (
    bookID int NOT NULL AUTO_INCREMENT,
    title varchar(50),
    author varchar(50),
    genre varchar(50),
    price decimal(6,2),
    status varchar(50),
    PRIMARY KEY (bookID)
);

-- Insert values into the Books table
INSERT INTO Books (
    title,
    author,
    genre,
    price,
    status
)
VALUES
(
    "The Handmaid's Tale",
    "Margaret Atwood",
    "Science fiction",
    "17.49",
    "Available"
);

-- Create Users table
CREATE OR REPLACE TABLE Users (
    userID int not NULL AUTO_INCREMENT,
    fName varchar(50) not NULL,
    lName varchar(50) not NULL,
    email varchar(89) not NULL,
    PRIMARY KEY (userID)
);

-- Insert values into the Users table
INSERT INTO Users (
    userID,
    fName,
    lName,
    email
)
VALUES
(
    1
    "John",
    "Doe",
    "johndoe@gmail.com"
);

-- Create Orders table
CREATE OR REPLACE TABLE Orders (
    orderID int not NULL AUTO_INCREMENT,
    userID int not NULL,
    bookID int not NULL,
    customerName varchar(50) not NULL,
    addressLine1 varchar(50) not NULL,
    addressLine2 varchar(50),
    city varchar(50) not NULL,
    state varchar(50) not NULL,
    postalCode varchar(50) not NULL,
    orderDate date not NULL,
    orderStatus varchar(50) not NULL,
    quantity int not NULL,
    totalDue decimal(19,2) not NULL,
    paymentMethod varchar(50) not NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

-- Insert values into the Orders table
INSERT INTO Orders (
    userID,
    bookID,
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
    1,
    "John Doe",
    "60025 Bollinger Canyon Road",
    NULL,
    "San Ramon",
    "California",
    "94583",
    "2023-07-13",
    "Pending",
    "2",
    "32.94",
    "bitcoin"
);

-- Create Reviews table
CREATE OR REPLACE TABLE Reviews (
    reviewID int not NULL AUTO_INCREMENT,
    userID int not NULL,
    bookID int not NULL,
    rating int not NULL,
    Description text not NULL,
    PRIMARY KEY (reviewID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE
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
    1,
    "5",
    "Great book!"
);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;