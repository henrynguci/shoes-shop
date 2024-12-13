import express from "express";
import sql from "mssql";

const router = express.Router();
router.get("/orders/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    // SQL Query to get the order details for the given customer
    const result = await sql.query(`
        SELECT O.*, 
               Pr.Name AS "PromotionName", 
               S.Fullname, 
               S.PhoneNumber AS "ShipNumber" 
        FROM [Order] O
        LEFT JOIN Voucher V ON O.Voucher_ID = V.Voucher_ID
        LEFT JOIN Promotion Pr ON V.Promotion_ID = Pr.Promotion_ID
        LEFT JOIN Shipper S ON O.Shipper_ID = S.Shipper_ID
        WHERE O.Customer_ID = ${customerId}
      `);

    // If no orders found for the customer
    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this customer" });
    }

    // Return the orders data
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching order data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching order data" });
  }
});

router.get("/order-product/:orderId", async (req, res) => {
  const { orderId } = req.params; // Extract Order_ID from the URL parameter

  try {
    // Declare the parameter and bind the value
    const request = new sql.Request();
    request.input("OrderId", sql.Int, orderId); // Declare and bind the parameter

    // SQL query to get order product details with the necessary joins
    const query = `
          SELECT 
            Im.Img_url,
            P.Name AS 'Name', 
            A.*, 
            ISNULL(Pr.Name, 'No Voucher') AS 'VoucherName', 
            ISNULL(Pr.Discount_Percent, 0) AS 'Discount'
          FROM 
            OrderProduct A
          JOIN 
            Version V
            ON A.Product_ID = V.Product_ID
            AND A.Color = V.Color
            AND A.Size = V.Size
          LEFT JOIN 
            Voucher Vo ON A.Voucher_Id = Vo.Voucher_ID
          LEFT JOIN 
            Promotion Pr ON Pr.Promotion_ID = Vo.Promotion_ID
          LEFT JOIN 
            Product_Img Im ON A.Product_ID = Im.Product_ID
          LEFT JOIN 
            Product P ON A.Product_ID = P.Product_ID
          WHERE 
            A.Order_ID = @OrderId`; // Parameterized query with placeholder @OrderId

    // Execute the query
    const result = await request.query(query); // Use the request to execute the query

    // Return the data as a JSON response
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching order product data:", error);
    res.status(500).json({ message: "Error fetching order product data" });
  }
});

export default router;
