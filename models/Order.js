const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: String },

  products: [
    {
      productId: { type: String },
      title: { type: String },
      img: { type: String },
      price: { type: Number },
    },
  ],
  addressLineOne: { type: String, required: true },
  addressLineTwo: { type: String, required: true },
  postCode: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
