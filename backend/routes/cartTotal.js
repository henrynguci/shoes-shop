import express from "express";
import sql from "mssql";

const router = express.Router();
router.get("/cart-total/:customerID", async (req, res) => {
  const { customerID } = req.params; // Retrieve CustomerID from URL params

  if (!customerID) {
    return res.status(400).json({ message: "CustomerID is required" });
  }

  try {
    // Now, create the SQL Request object using `sql.request()`
    const request = new sql.Request(); // Correct way to create a request

    // Query to fetch the cart total for the given CustomerID
    const result = await request
      .input("CustomerID", sql.Int, customerID) // Pass CustomerID as a parameter
      .query("SELECT * FROM CartTotals WHERE CustomerID = @CustomerID");

    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ message: "Cart total not found for this customer" });
    }

    // Return the cart total data
    res.status(200).send(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching cart total:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
