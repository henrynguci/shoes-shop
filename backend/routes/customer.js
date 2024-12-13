import express from "express";
import sql from "mssql";

const router = express.Router();
// Get customer details for a specific account ID
router.get("/customer/:accountId", async (req, res) => {
  const { accountId } = req.params; // Get the accountId from the URL parameter

  if (!accountId) {
    return res.status(400).json({ message: "Account ID is required" });
  }

  try {
    // Prepare the request object
    const request = new sql.Request();

    // Declare and bind the @accountId parameter
    request.input("accountId", sql.Int, accountId);

    // SQL Query to join Customer and Account tables based on Account_ID
    const query = `
        SELECT * 
        FROM Customer C
        JOIN Account A ON C.Account_ID = A.Account_ID
        WHERE A.Account_ID = @accountId;
      `;

    // Execute the query
    const result = await request.query(query);

    // Check if any rows were returned
    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ message: "No customer found for this account" });
    }

    // Return the result
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching customer data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
