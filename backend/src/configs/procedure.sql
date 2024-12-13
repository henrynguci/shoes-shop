CREATE FUNCTION CalculateTotalRevenue (@startDate DATE, @endDate DATE)
RETURNS DECIMAL(15,2)
AS
BEGIN
	IF @startDate > @endDate
    BEGIN
        RETURN NULL;
    END;

    DECLARE @totalRevenue DECIMAL(15,2) = 0;

    -- Tính tổng doanh thu trong khoảng từ ngày bắt đầu đến ngày kết thúc
    SELECT @totalRevenue = SUM(Amount)
    FROM Payment
    WHERE CAST(Time AS DATE) BETWEEN @startDate AND @endDate;

    -- Trả về tổng doanh thu
    RETURN @totalRevenue;
END;


-- lấy voucher khả dụng cho order
CREATE FUNCTION getVoucherForOrder (@Customer_ID INT)
RETURNS @Voucher TABLE (
	Voucher_ID INT,
	Discount_Percent DECIMAL(5,2)
)
AS
BEGIN
	DECLARE @Price DECIMAL, @Amount INT, @Total_Price DECIMAL(15,2) = 0

	DECLARE cartCursor CURSOR FOR 
		SELECT v.Price, c.Amount FROM Add_to_cart c
			JOIN Version v ON v.Product_ID = c.Product_ID AND v.Color = c.Color AND v.Size = c.Size
			WHERE c.Customer_ID = @Customer_ID;

	OPEN cartCursor;

	FETCH NEXT FROM cartCursor INTO @Price, @Amount;

	WHILE @@FETCH_STATUS = 0
	BEGIN 
		SET @Total_Price = @Total_Price + @Price * @Amount;
	END;

	CLOSE cartCursor;
	DEALLOCATE cartCursor;

	INSERT INTO @Voucher
		SELECT v.Voucher_ID, prom.Discount_Percent FROM Voucher v
		JOIN Promotion prom ON prom.Promotion_ID = v.Promotion_ID
		JOIN PromotionOrder pO ON prom.Promotion_ID = pO.Promotion_ID
		WHERE v.Customer_ID = @Customer_ID 
			AND @Total_Price BETWEEN pO.Min_price AND pO.Max_price
			AND v.Status = 'Active'
			AND GETDATE() BETWEEN prom.Time_start AND prom.Time_expire

	RETURN;	
END;

-- lấy voucher khả dụng cho product
CREATE FUNCTION getVoucherForProduct (@Customer_ID INT)
RETURNS @Voucher TABLE (
	Voucher_ID INT,
	Product_ID INT,
	Color VARCHAR(50),
	Size VARCHAR(20),
	Discount_Percent DECIMAL(5,2)
)
AS
BEGIN
	INSERT INTO @Voucher
		SELECT v.Voucher_ID, c.Product_ID, c.Color, c.Size, prom.Discount_Percent FROM Voucher v
		JOIN Promotion prom ON prom.Promotion_ID = v.Promotion_ID
		JOIN PromotionProduct pP ON prom.Promotion_ID = pP.Promotion_ID
		JOIN Can_use u ON u.Promotion_ID = v.Promotion_ID
		JOIN Add_to_cart c ON c.Product_ID = u.Product_ID
		WHERE v.Customer_ID = @Customer_ID 
			AND c.Amount BETWEEN pP.Min_quantity AND pP.Max_quantity
			AND v.Status = 'Active'
			AND GETDATE() BETWEEN prom.Time_start AND prom.Time_expire
	RETURN;	
END;



CREATE PROCEDURE getAccountByUsername
	@Username VARCHAR(50)
AS
BEGIN
	SELECT acc.*,
		CASE 
            WHEN c.Account_ID IS NOT NULL THEN 'CUSTOMER'
            WHEN ad.Account_ID IS NOT NULL THEN 'ADMIN'
        END AS Role
	FROM Account acc 
	LEFT JOIN Admin ad ON ad.Account_ID = acc.Account_ID
	LEFT JOIN Customer c ON c.Account_ID = acc.Account_ID
	WHERE Username = @Username;
END;


CREATE PROCEDURE getAllProducts
AS
BEGIN
	SELECT p.*, b.Name AS Brand, g.Name AS Gift, MIN(v.Price) AS Price, MIN(pi.Img_url) AS Img_url
		FROM Product p 
		LEFT JOIN Product g ON g.Product_ID = p.Gift_ID
		JOIN Brand b ON b.Brand_ID = p.Brand_ID
		JOIN Version v ON p.Product_ID = v.Product_ID
		JOIN Product_Img pi ON p.Product_ID = pi.Product_ID
		GROUP BY p.Product_ID, p.Name, p.Description, p.Brand_ID, p.Gift_ID, p.Star, p.Status, b.Name, g.Product_ID, g.Name;
END;


CREATE PROCEDURE getProductDetail
	@Product_ID INT
AS
BEGIN
	SELECT p.*, b.Name AS Brand, g.Name AS Gift FROM Product p
		LEFT JOIN Product g ON g.Product_ID = p.Gift_ID
		JOIN Brand b ON b.Brand_ID = p.Brand_ID
		WHERE p.Product_ID = @Product_ID;
	SELECT * FROM Version WHERE Product_ID = @Product_ID;
	SELECT * FROM Product_Img WHERE Product_ID = @Product_ID;
END;


  
CREATE PROCEDURE addVersionToCart
	@Customer_ID INT,
	@Product_ID INT,
	@Color VARCHAR(50),
	@Size VARCHAR(20),
	@Amount INT
AS
BEGIN
	IF EXISTS (SELECT * FROM Add_to_cart WHERE Customer_ID = @Customer_ID AND Product_ID = @Product_ID AND Color = @Color AND Size = @Size)
		UPDATE Add_to_cart SET Amount = Amount + @Amount 
			WHERE Customer_ID = @Customer_ID 
				AND Product_ID = @Product_ID 
				AND Color = @Color 
				AND Size = @Size;
	ELSE
		INSERT INTO Add_to_cart (Customer_ID, Product_ID, Color, Size, Amount) VALUES (@Customer_ID, @Product_ID, @Color, @Size, @Amount)
END;


CREATE PROCEDURE removeVersionInCart 
	@Customer_ID INT,
	@Product_ID INT,
	@Color VARCHAR(50),
	@Size VARCHAR(20)
AS
BEGIN
    DELETE FROM Add_to_cart WHERE Customer_ID = @Customer_ID AND Product_ID = @Product_ID AND Color = @Color AND Size = @Size;
END;


CREATE PROCEDURE getVoucherAvailable
	@Customer_ID INT
AS
BEGIN
	SELECT * FROM getVoucherForOrder(@Customer_ID);
	SELECT * FROM getVoucherForProduct(@Customer_ID);
END;


CREATE TYPE OrderProductTable AS TABLE (
	Order_Number INT,
	Product_ID INT,
	Color VARCHAR(50),
	Size VARCHAR(20),
	Price DECIMAL(15,2),
	Quantity INT,
	Voucher_ID VARCHAR(50) DEFAULT NULL
);

CREATE PROCEDURE checkout
	@Customer_ID INT,
	@Shipfee DECIMAL(15,2),
	@Voucher_ID VARCHAR(50) = NULL,
	@OrderProduct OrderProductTable READONLY
AS
BEGIN
	DECLARE @Address NVARCHAR(255);
	DECLARE @PhoneNumber VARCHAR(15);

	SELECT @Address = Address, @PhoneNumber = PhoneNumber FROM Account WHERE Account_ID = @Customer_ID;

	INSERT INTO [Order] (Address, PhoneNumber, Shipfee, Customer_ID, Voucher_ID) VALUES (@Address, @PhoneNumber, @Shipfee, @Customer_ID, @Voucher_ID)

	DECLARE @Order_ID INT = SCOPE_IDENTITY()

	INSERT INTO OrderProduct (Order_ID, Order_number, Quantity, Price, Product_ID, Color, Size, Voucher_ID)
		SELECT @Order_ID, Order_Number, Quantity, Price, Product_ID, Color, Size, Voucher_ID FROM @OrderProduct

	UPDATE Voucher SET Status = 'Used' WHERE Voucher_ID = @Voucher_ID;
	
	UPDATE v SET v.Status = 'Used' FROM Voucher v JOIN @OrderProduct op ON v.Voucher_ID = op.Voucher_ID

	DELETE FROM Add_to_cart WHERE Customer_ID = @Customer_ID
END;

CREATE PROCEDURE getBrands
AS
BEGIN
	SELECT * FROM Brand;
END;















-- procedure tạo product (kèm theo ít nhất 1 image và 1 version)
CREATE PROCEDURE insertProduct 
	@Name NVARCHAR(200),
	@Description NVARCHAR(1000),
	@Brand_ID INT,
	@Gift_ID INT = NULL,
	@Img_url VARCHAR(255),
	@Color VARCHAR(50),
	@Size VARCHAR(20),
	@Price DECIMAL(15,2)
AS
BEGIN
	IF NOT EXISTS(SELECT * FROM Brand WHERE Brand_ID = @Brand_ID)
		THROW 50000, 'Thương hiệu không tồn tại trong cửa hàng', 1;
	ELSE IF @Gift_ID IS NOT NULL AND NOT EXISTS(SELECT * FROM Product WHERE Product_ID = @Gift_ID)
		THROW 50000, 'Sản phẩm dùng làm quà tặng không tồn tại trong hệ thống', 1;
	ELSE
	BEGIN
		INSERT INTO Product (Name, Description, Gift_ID, Brand_ID)
		VALUES (@Name, @Description, @Gift_ID, @Brand_ID);

		DECLARE @Product_ID INT = SCOPE_IDENTITY()

		INSERT INTO Product_Img (Product_ID, Img_url) VALUES (@Product_ID, @Img_url)

		INSERT INTO Version (Product_ID, Color, Size, Price) VALUES (@Product_ID, @Color, @Size, @Price)
	END
END;




-- procedure cập nhật product
CREATE PROCEDURE updateProduct 
	@Product_ID INT,
	@Name NVARCHAR(200),
	@Description NVARCHAR(1000),
	@Brand_ID INT,
	@Gift_ID INT = NULL
AS
BEGIN
	IF NOT EXISTS(SELECT * FROM Product WHERE Product_ID = @Product_ID)
		THROW 50000, 'Không tìm thấy sản phẩm trong hệ thống', 1;
	ELSE IF NOT EXISTS(SELECT * FROM Brand WHERE Brand_ID = @Brand_ID)
		THROW 50000, 'Thương hiệu không tồn tại trong cửa hàng', 1;
	ELSE IF @Gift_ID IS NOT NULL AND NOT EXISTS(SELECT * FROM Product WHERE Product_ID = @Gift_ID)
		THROW 50000, 'Sản phẩm dùng làm quà tặng không tồn tại trong hệ thống', 1;
	ELSE 
		UPDATE Product SET Name = @Name, Description = @Description, Gift_ID = @Gift_ID, Brand_ID = @Brand_ID WHERE Product_ID = @Product_ID;
END;



-- procedure xoá product (nếu có product có trong đã được mua ít sẽ disable chứ không xoá)
CREATE PROCEDURE deleteProduct
	@Product_ID INT
AS
BEGIN
	IF EXISTS(SELECT * FROM Product WHERE Gift_ID = @Product_ID)
		THROW 50000, 'Sản phẩm hiện tại đang làm quà tặng kèm cho sản phẩm khác, không thể xoá', 1;
	ELSE IF EXISTS(SELECT * FROM OrderProduct WHERE Product_ID = @Product_ID)
		UPDATE Product SET status = 'Unactive' WHERE Product_ID = @Product_ID;
	ELSE IF NOT EXISTS(SELECT * FROM Product WHERE Product_ID = @Product_ID)
		THROW 50000, 'Không tìm thấy sản phẩm trong hệ thống', 1;
	ELSE
	BEGIN
		DELETE FROM Version WHERE Product_ID = @Product_ID;
		DELETE FROM Product_Img WHERE Product_ID = @Product_ID;
		DELETE FROM Product WHERE Product_ID = @Product_ID;
	END
END;


CREATE PROCEDURE getCart @Account_ID INT
AS
BEGIN
    SELECT 
        p.Product_ID, 
        p.Name, 
        v.Size, 
        v.Color, 
        v.Price, 
        atc.Time, 
        atc.Amount, 
        STRING_AGG(pi.Img_url, ', ') WITHIN GROUP (ORDER BY pi.Img_url) AS Img_urls
    FROM 
        Product p, 
        Version v, 
        Add_to_cart atc, 
        Product_Img pi
    WHERE 
        atc.Customer_ID = @Account_ID
        AND atc.Color = v.Color
        AND atc.Size = v.Size
        AND atc.Product_ID = p.Product_ID
        AND pi.Product_ID = p.Product_ID
    GROUP BY 
        p.Product_ID, p.Name, v.Size, v.Color, v.Price, atc.Time, atc.Amount;
END;


CREATE PROCEDURE getTopSeller @start_day DATE, @end_day DATE
AS
BEGIN
    -- Kiểm tra start_day và end_day
    IF @start_day > @end_day
    BEGIN
        THROW 50000, 'Start date cannot be greater than end date', 1;
    END;

    -- Xếp hạng theo số lượng bán ra
    SELECT 
        p.Product_ID,
        p.Name,
        SUM(op.Quantity) AS TotalQuantitySold
    FROM 
        [Order] o, OrderProduct op, Product p
    WHERE 
        o.Order_ID = op.Order_ID
        AND op.Product_ID = p.Product_ID
        AND o.Create_time BETWEEN @start_day AND @end_day
        AND o.Status = 'Completed'
    GROUP BY 
        p.Product_ID, p.Name
    ORDER BY 
        TotalQuantitySold DESC
    OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY; -- Lấy 10 sản phẩm đầu tiên

    -- Xếp hạng theo doanh thu
    SELECT 
        p.Product_ID,
        p.Name,
        SUM(op.Quantity * op.Price) AS TotalRevenue
    FROM 
        [Order] o, OrderProduct op, Product p
    WHERE 
        o.Order_ID = op.Order_ID
        AND op.Product_ID = p.Product_ID
        AND o.Create_time BETWEEN @start_day AND @end_day
        AND o.Status = 'Completed'
    GROUP BY 
        p.Product_ID, p.Name
    ORDER BY 
        TotalRevenue DESC
    OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY; -- Lấy 10 sản phẩm đầu tiên
END;