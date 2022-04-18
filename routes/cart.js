const { verifyToken } = require("./verifyToken");

const Cart = require("../models/Cart");

const router = require("express").Router();

//Update cart
router.put("/updateCart", verifyToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.headers.userid },
      {
        products: req.body.products,
      },
      { new: true }
    );
    res.status(200).json({ updatedCart });
  } catch (err) {
    console.log(err);
    res.status(500).json();
  }
});

//Get cart
router.get("/getCart", verifyToken, async (req, res) => {
  try {
    const getCart = await Cart.findOne({ userId: req.headers.userid });
    res.status(200).json(getCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
