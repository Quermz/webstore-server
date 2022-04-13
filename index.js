const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");
const productsRoute = require("./routes/product");
const ordersRoute = require("./routes/order");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection ok"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});

//Routes
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", ordersRoute);
