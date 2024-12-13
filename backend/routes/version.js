import express from "express";
import sql from "mssql";

const router = express.Router();
router.get("/versions", async (req, res) => {
  const query = `
    select V.*, P.Name, Im.Img_url from Version V
    join Product P on V.Product_ID = P.Product_ID
    join Product_Img Im on P.Product_ID = Im.Product_ID;
  `;

  try {
    const result = await sql.query(query);
    res.status(200).send(result.recordset); // `recordset` contains the rows from SQL Server
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
