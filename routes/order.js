const { verifyToken } = require("./verifyToken");

const Cart = require("../models/Cart");

const Order = require("../models/Order");

const router = require("express").Router();

// Get Orders
router.get("/getOrders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.headers.userid });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json();
  }
});

//Create order
router.post("/createOrder", verifyToken, async (req, res) => {
  try {
    const findCart = await Cart.findOne({ userId: req.headers.userid });

    const newOrder = new Order({
      userId: req.headers.userid,
      products: findCart.products,
      addressLineOne: req.body.addressLineOne,
      addressLineTwo: req.body.addressLineTwo,
      postCode: req.body.postCode,
    });
    await newOrder.save();
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.id },
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
