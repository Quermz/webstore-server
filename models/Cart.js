const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    products: [
      {
        productId: { type: String },
        title: { type: String },
        img: { type: String },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
