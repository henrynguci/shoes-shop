import express from "express";
import sql from "mssql";

const router = express.Router();
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }

  try {
    const result =
      await sql.query`SELECT * FROM Account WHERE Username = ${username}`;

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const account = result.recordset[0];

    // Compare the password directly (without hashing)
    if (account.Password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).send({
      message: "Login successful",
      id: account.Account_ID,
      username: account.Username,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
