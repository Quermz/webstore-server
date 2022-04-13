const { verifyTokenAndAuth } = require("./verifyToken");

const Cart = require("../models/Cart");

const Order = require("../models/Order");

const router = require("express").Router();

//Create order
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const findCart = await Cart.findOne({ userId: req.params.id });
    console.log(findCart);
    const newOrder = new Order({
      userId: req.params.id,
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
router.put("/", async (req, res) => {
  try {
    const newOrder = new Order({
      products: req.body.products,
      addressLineOne: req.body.addressLineOne,
      addressLineTwo: req.body.addressLineTwo,
      postCode: req.body.postCode,
    });
    console.log(newOrder);
    await newOrder.save();
    res.status(200).json("ok");
  } catch (err) {
    console.log(err);
    res.status(500).json();
  }
});

module.exports = router;
