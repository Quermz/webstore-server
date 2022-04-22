const { verifyToken } = require("./verifyToken");

const Cart = require("../models/Cart");
const { verify } = require("jsonwebtoken");

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

//Add to cart
// router.put("/addToCart", verifyToken, async (req, res) => {
//   try {
//     const cartContents = await Cart.findOne({ userId: req.headers.userid });
//     console.log(req.body.product);
//     cartContents.products.push(req.body.product);
//     const updatedCart = await Cart.findOneAndUpdate(
//       { userId: req.headers.userid },
//       {
//         products: cartContents.products,
//       },
//       { new: true }
//     );
//     res.status(200).json({ updatedCart });
//   } catch (error) {}
// });

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
