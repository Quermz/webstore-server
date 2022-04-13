const { verifyTokenAndAuth } = require("./verifyToken");

const Cart = require("../models/Cart");

const router = require("express").Router();

//Create or update cart
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.id },
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
router.get("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const getCart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(getCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
