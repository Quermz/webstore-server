const mongoose = require("mongoose");

const Productchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Productchema);
