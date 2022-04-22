const { verifyToken } = require("./verifyToken");

const Cart = require("../models/Cart");

const Order = require("../models/Order");
const nodemon = require("nodemon");

const router = require("express").Router();

// Get Orders
router.get("/getOrders", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.headers.userid });
    console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json();
  }
});

//Create order
router.post("/createOrder", verifyToken, async (req, res) => {
  try {
    const findCart = await Cart.findOne({ userId: req.headers.userid });
    let totalPrice = 0;
    for (product of findCart.products) {
      totalPrice += product.price;
    }
    const newOrder = new Order({
      userId: req.headers.userid,
      products: findCart.products,
      totalPrice: totalPrice,
      addressLineOne: req.body.addressLineOne,
      addressLineTwo: req.body.addressLineTwo,
      postCode: req.body.postCode,
    });
    await newOrder.save();
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.headers.userid },
      { products: [] },
      { new: true }
    );
    res.status(200).json({ updatedCart });
  } catch (err) {
    res.status(500).json();
  }
});

//Create anonymous order
router.post("/createAnonOrder", async (req, res) => {
  try {
    const newOrder = new Order({
      products: req.body.products,
      addressLineOne: req.body.addressLineOne,
      addressLineTwo: req.body.addressLineTwo,
      postCode: req.body.postCode,
    });
    await newOrder.save();
    res.status(200);
  } catch (err) {
    res.status(500).json();
  }
});

module.exports = router;
