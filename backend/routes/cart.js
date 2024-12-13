import express from "express";
import sql from "mssql";

const router = express.Router();
router.post("/add-to-cart", async (req, res) => {
  const { CustomerID, ProductID, Color, Size, Amount, VoucherID } = req.body;

  if (!CustomerID || !ProductID || !Color || !Size) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  try {
    // Connect to the database

    // Now that we're connected, create the request object and execute the stored procedure
    const request = new sql.Request(); // This initializes the request object correctly

    // Add input parameters to the request
    request
      .input("CustomerID", sql.Int, CustomerID)
      .input("ProductID", sql.Int, ProductID)
      .input("Color", sql.VarChar(50), Color)
      .input("Size", sql.VarChar(20), Size)
      .input("Amount", sql.Int, Amount || 1) // Default to 1 if Amount is not provided
      .input("VoucherID", sql.VarChar(50), VoucherID || null); // Default to NULL if VoucherID is not provided

    // Execute the stored procedure
    await request.execute("AddToCart"); // Execute stored procedure

    // Return a success response
    res.status(200).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/cart/:customerId", async (req, res) => {
  const customerId = req.params.customerId; // Get customer ID from the request parameter

  // Ensure that customerId is provided
  if (!customerId) {
    return res.status(400).json({ message: "Customer ID is required" });
  }

  try {
    // Prepare the request object
    const request = new sql.Request();

    // Declare and bind the @customerId parameter
    request.input("customerId", sql.Int, customerId);

    // SQL Query
    const query = `
     SELECT 
       Im.Img_url, 
       P.Name AS 'Name', 
       A.*, 
       ISNULL(Pr.Name, 'No Voucher') AS 'VoucherName', 
       V.Price, 
       ISNULL(Pr.Discount_Percent, 0) AS 'Discount', 
       (A.Amount * V.Price * (100 - ISNULL(Pr.Discount_Percent, 0)) / 100) AS TotalPrice
     FROM 
       Add_to_cart A
     JOIN Version V
       ON A.Product_ID = V.Product_ID
       AND A.Color = V.Color
       AND A.Size = V.Size
     LEFT JOIN Voucher Vo
       ON A.Voucher_Id = Vo.Voucher_ID
     LEFT JOIN Promotion Pr
       ON Pr.Promotion_ID = Vo.Promotion_ID
     LEFT JOIN Product_Img Im
       ON A.Product_ID = Im.Product_ID
     LEFT JOIN Product P
       ON A.Product_ID = P.Product_ID
     WHERE 
       A.Customer_ID = @customerId;
   `;

    // Execute the query with the input parameter
    const result = await request.query(query);

    // Return the result
    res.status(200).json(result.recordset); // recordset contains the query result rows
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/cart/:customerId", async (req, res) => {
  const customerId = req.params.customerId; // Retrieve customerId from the URL parameter

  if (!customerId) {
    return res.status(400).json({ message: "Customer ID is required" });
  }

  try {
    // Prepare the request object
    const request = new sql.Request();

    // Declare and bind the @customerId parameter
    request.input("customerId", sql.Int, customerId);

    // SQL DELETE query to remove items from the Add_to_cart table for the specific Customer_ID
    const query = `
      DELETE FROM Add_to_cart WHERE Customer_ID = @customerId;
    `;

    // Execute the query
    const result = await request.query(query);

    // Check if any rows were deleted
    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ message: "No cart items found for this customer" });
    }

    // Return success response
    res.status(200).json({ message: "Cart items deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/checkout", async (req, res) => {
  const { CustomerID, Address, PhoneNumber, VoucherID, Shipfee, Shipper_ID } =
    req.body;

  try {
    const request = new sql.Request();

    // Pass the parameters from the request body
    request.input("CustomerID", sql.Int, CustomerID);
    request.input("Address", sql.NVarChar(255), Address);
    request.input("PhoneNumber", sql.VarChar(15), PhoneNumber);
    request.input("VoucherID", sql.VarChar(50), VoucherID || null); // Default to null if not provided
    request.input("Shipfee", sql.Decimal(15, 2), Shipfee || 0); // Default to 0 if not provided
    request.input("Shipper_ID", sql.Int, Shipper_ID || null); // Default to null if not provided

    // Execute the stored procedure
    await request.execute("Checkout");

    // If the procedure runs successfully
    res.status(200).json({ message: "Checkout successful" });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({
      message: "An error occurred during checkout. Please try again.",
    });
  }
});

export default router;
