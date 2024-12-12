-- Bảng Account - Bảng cha chứa thông tin người dùng cơ bản
CREATE TABLE Account (
    Account_ID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Fullname NVARCHAR(100) NOT NULL,
    Sex CHAR(1) CHECK (Sex IN ('M', 'F', 'O')),
    Address NVARCHAR(255),
    PhoneNumber VARCHAR(15),
    CONSTRAINT CHK_PhoneNumber CHECK (PhoneNumber NOT LIKE '%[^0-9]%')
);

-- Bảng Customer - Kế thừa từ Account
CREATE TABLE Customer (
    Account_ID INT PRIMARY KEY,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Bdate DATE,
    CurrentPoint INT DEFAULT 0,
    TotalPoint INT DEFAULT 0,
    Level INT DEFAULT 1,
    CONSTRAINT FK_Customer_Account FOREIGN KEY (Account_ID)
        REFERENCES Account(Account_ID) ON DELETE CASCADE,
    CONSTRAINT CHK_Points CHECK (CurrentPoint >= 0 AND TotalPoint >= 0),
    CONSTRAINT CHK_Level CHECK (Level >= 1 AND Level <= 5),
    CONSTRAINT CHK_Email CHECK (Email LIKE '%@%.%')
);

-- Bảng Admin
CREATE TABLE Admin (
    Account_ID INT PRIMARY KEY,
    Admin_code VARCHAR(50) NOT NULL UNIQUE,
    CONSTRAINT FK_Admin_Account FOREIGN KEY (Account_ID)
        REFERENCES Account(Account_ID) ON DELETE CASCADE
);

-- Bảng Brand
CREATE TABLE Brand (
    Brand_ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    Logo_url VARCHAR(255)
);

-- Bảng Product
CREATE TABLE Product (
    Product_ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(1000),
    Star DECIMAL(3,2) DEFAULT 0,
    Status VARCHAR(20) DEFAULT 'Active',
    Gift_ID INT,
    Brand_ID INT,
    CONSTRAINT FK_Product_Brand FOREIGN KEY (Brand_ID)
        REFERENCES Brand(Brand_ID),
    CONSTRAINT CHK_Star CHECK (Star >= 0 AND Star <= 5),
    CONSTRAINT CHK_Status CHECK (Status IN ('Active', 'Inactive', 'Discontinued'))
);

-- Bảng Product_Img
CREATE TABLE Product_Img (
    Product_ID INT,
    Img_url VARCHAR(255) NOT NULL,
    CONSTRAINT PK_Product_Img PRIMARY KEY (Product_ID, Img_url),
    CONSTRAINT FK_ProductImg_Product FOREIGN KEY (Product_ID)
        REFERENCES Product(Product_ID) ON DELETE CASCADE
);

-- Bảng Version
CREATE TABLE Version (
    Product_ID INT,
    Color VARCHAR(50),
    Size VARCHAR(20),
    Price DECIMAL(15,2),
    Amount INT DEFAULT 0,
    CONSTRAINT PK_Version PRIMARY KEY (Product_ID, Color, Size),
    CONSTRAINT FK_Version_Product FOREIGN KEY (Product_ID)
        REFERENCES Product(Product_ID) ON DELETE CASCADE,
    CONSTRAINT CHK_Price CHECK (Price >= 0),
    CONSTRAINT CHK_Amount CHECK (Amount >= 0)
);

-- Bảng Promotion
CREATE TABLE Promotion (
    Promotion_ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    Discount_Percent DECIMAL(5,2),
    Cost_point INT DEFAULT 0,
    Time_start DATETIME NOT NULL,
    Time_expire DATETIME NOT NULL,
    CONSTRAINT CHK_Promotion_Time CHECK (Time_expire > Time_start),
    CONSTRAINT CHK_Promotion_Percent CHECK (Discount_Percent >= 0 AND Discount_Percent <= 100)
);

-- Bảng PromotionOrder
CREATE TABLE PromotionOrder (
    Promotion_ID INT PRIMARY KEY,
    Min_price DECIMAL(15,2),
    Max_price DECIMAL(15,2),
    CONSTRAINT FK_PromotionOrder_Promotion FOREIGN KEY (Promotion_ID)
        REFERENCES Promotion(Promotion_ID) ON DELETE CASCADE,
    CONSTRAINT CHK_Price_Range CHECK (Max_price > Min_price)
);


-- Bảng PromotionProduct
CREATE TABLE PromotionProduct (
    Promotion_ID INT PRIMARY KEY,
    Min_quantity INT,
    Max_quantity INT,
    CONSTRAINT FK_PromotionProduct_Promotion FOREIGN KEY (Promotion_ID)
        REFERENCES Promotion(Promotion_ID) ON DELETE CASCADE,
    CONSTRAINT CHK_Quantity_Range CHECK (Max_quantity > Min_quantity AND Min_quantity > 0)
);

-- Bảng Can_use
CREATE TABLE Can_use (
    Promotion_ID INT,
    Product_ID INT,
    CONSTRAINT PK_Can_use PRIMARY KEY (Promotion_ID, Product_ID),
    CONSTRAINT FK_CanUse_Promotion FOREIGN KEY (Promotion_ID)
        REFERENCES Promotion(Promotion_ID),
    CONSTRAINT FK_CanUse_Product FOREIGN KEY (Product_ID)
        REFERENCES Product(Product_ID)
);

-- Bảng Voucher
CREATE TABLE Voucher (
    Voucher_ID VARCHAR(50) PRIMARY KEY,
    Status VARCHAR(20) DEFAULT 'Active',
    Customer_ID INT,
    Promotion_ID INT,
    CONSTRAINT FK_Voucher_Customer FOREIGN KEY (Customer_ID)
        REFERENCES Customer(Account_ID),
    CONSTRAINT FK_Voucher_Promotion FOREIGN KEY (Promotion_ID)
        REFERENCES Promotion(Promotion_ID),
    CONSTRAINT CHK_Voucher_Status CHECK (Status IN ('Active', 'Used', 'Expired'))
);

-- Bảng Shipper
CREATE TABLE Shipper (
    Shipper_ID INT IDENTITY(1,1) PRIMARY KEY,
    Fullname NVARCHAR(100) NOT NULL,
    PhoneNumber VARCHAR(15),
    CONSTRAINT CHK_Shipper_Phone CHECK (PhoneNumber NOT LIKE '%[^0-9]%')
);

-- Bảng Order
CREATE TABLE [Order] (
    Order_ID INT IDENTITY(1,1) PRIMARY KEY,
    Address NVARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(15),
    Create_time DATETIME DEFAULT GETDATE(),
    Price DECIMAL(15,2) DEFAULT 0,
    Status VARCHAR(30) DEFAULT 'Pending',
    Shipfee DECIMAL(15,2) DEFAULT 0,
    Customer_ID INT NOT NULL,
    Voucher_ID VARCHAR(50),
    Shipper_ID INT,
    Close_time DATETIME,
    CONSTRAINT FK_Order_Customer FOREIGN KEY (Customer_ID)
        REFERENCES Customer(Account_ID),
    CONSTRAINT FK_Order_Voucher FOREIGN KEY (Voucher_ID)
        REFERENCES Voucher(Voucher_ID),
    CONSTRAINT FK_Order_Shipper FOREIGN KEY (Shipper_ID)
        REFERENCES Shipper(Shipper_ID),
    CONSTRAINT CHK_Order_Status CHECK (Status IN ('Pending', 'Confirmed', 'Shipping', 'Completed', 'Cancelled')),
    CONSTRAINT CHK_Order_Time CHECK (Close_time > Create_time),
    CONSTRAINT CHK_Order_Price CHECK (Price >= 0),
    CONSTRAINT CHK_Order_Shipfee CHECK (Shipfee >= 0)
);

-- Bảng OrderProduct
CREATE TABLE OrderProduct (
    Order_ID INT,
    Order_number INT,
    Quantity INT,
    Price DECIMAL(15,2),
    Product_ID INT,
    Color VARCHAR(50),
    Size VARCHAR(20),
    Voucher_ID VARCHAR(50),
    CONSTRAINT PK_OrderProduct PRIMARY KEY (Order_ID, Order_number),
    CONSTRAINT FK_OrderProduct_Order FOREIGN KEY (Order_ID)
        REFERENCES [Order](Order_ID),
    CONSTRAINT FK_OrderProduct_Version FOREIGN KEY (Product_ID, Color, Size)
        REFERENCES Version(Product_ID, Color, Size),
    CONSTRAINT FK_OrderProduct_Voucher FOREIGN KEY (Voucher_ID)
        REFERENCES Voucher(Voucher_ID),
    CONSTRAINT CHK_OrderProduct_Quantity CHECK (Quantity > 0),
    CONSTRAINT CHK_OrderProduct_Price CHECK (Price >= 0)
);

-- Bảng Payment
CREATE TABLE Payment (
    Payment_ID INT IDENTITY(1,1) PRIMARY KEY,
    Method VARCHAR(50) NOT NULL,
    Amount DECIMAL(15,2) NOT NULL,
    Time DATETIME DEFAULT GETDATE(),
    Detail NVARCHAR(500),
    Order_ID INT,
    CONSTRAINT FK_Payment_Order FOREIGN KEY (Order_ID)
        REFERENCES [Order](Order_ID),
    CONSTRAINT CHK_Payment_Amount CHECK (Amount > 0),
    CONSTRAINT CHK_Payment_Method CHECK (Method IN ('Cash', 'Credit Card', 'Bank Transfer', 'E-Wallet'))
);

-- Bảng Notification
CREATE TABLE Notification (
    Order_ID INT,
    Status VARCHAR(50),
    Description NVARCHAR(500),
    Is_read BIT DEFAULT 0,
    Create_time DATETIME DEFAULT GETDATE(),
    CONSTRAINT PK_Notification PRIMARY KEY (Order_ID, Create_time),
    CONSTRAINT FK_Notification_Order FOREIGN KEY (Order_ID)
        REFERENCES [Order](Order_ID)
);
-- Bảng Receipt
CREATE TABLE Receipt (
    Receipt_ID INT IDENTITY(1,1) PRIMARY KEY,
    Time DATETIME DEFAULT GETDATE(),
    Amount DECIMAL(15,2) NOT NULL,
    Admin_ID INT,
    Product_ID INT,
    Color VARCHAR(50),
    Size VARCHAR(20),

    CONSTRAINT FK_Receipt_Admin FOREIGN KEY (Admin_ID)
        REFERENCES Admin(Account_ID),
    CONSTRAINT FK_Receipt_Version FOREIGN KEY (Product_ID, Color, Size)
        REFERENCES Version(Product_ID, Color, Size),
    CONSTRAINT CHK_Receipt_Amount CHECK (Amount >= 0)
);

-- Bảng Rate
CREATE TABLE Rate (
    Customer_ID INT,
    Product_ID INT,
    Star DECIMAL(3,2),
    Comment NVARCHAR(1000),
    Last_update DATETIME DEFAULT GETDATE(),
    CONSTRAINT PK_Rate PRIMARY KEY (Customer_ID, Product_ID),
    CONSTRAINT FK_Rate_Customer FOREIGN KEY (Customer_ID)
        REFERENCES Customer(Account_ID),
    CONSTRAINT FK_Rate_Product FOREIGN KEY (Product_ID)
        REFERENCES Product(Product_ID),
    CONSTRAINT CHK_Rate_Star CHECK (Star >= 0 AND Star <= 5)
);

-- Bảng Add_to_cart
CREATE TABLE Add_to_cart (
    Customer_ID INT,
    Product_ID INT,
    Color VARCHAR(50),
    Size VARCHAR(20),
    Time DATETIME DEFAULT GETDATE(),
    Amount INT DEFAULT 1,
    CONSTRAINT PK_AddToCart PRIMARY KEY (Customer_ID, Product_ID, Color, Size),
    CONSTRAINT FK_AddToCart_Customer FOREIGN KEY (Customer_ID)
        REFERENCES Customer(Account_ID),
    CONSTRAINT FK_AddToCart_Version FOREIGN KEY (Product_ID, Color, Size)
        REFERENCES Version(Product_ID, Color, Size),
    CONSTRAINT CHK_Cart_Amount CHECK (Amount > 0)
);


