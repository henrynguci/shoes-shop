import express from "express";
import cors from "cors";
import { PORT } from "./configs/env.js";
import { connectDB } from "./utilities/database.js";
import login from "./routes/login.js";
import version from "./routes/version.js";
import cart from "./routes/cart.js";
import cartotal from "./routes/cartTotal.js";
import customer from "./routes/customer.js";
import order from "./routes/order.js";

const app = express();

//App Use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect express
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT} `);
});

//Route
app.use("/api", login);
app.use("/api", version);
app.use("/api", cart);
app.use("/api", cartotal);
app.use("/api", customer);
app.use("/api", order);
//Connect database
connectDB();

//API
app.get("/", (req, res) => {
  res.send("Hello World");
});
