const Product = require("../models/Product");
const router = require("express").Router();

//Get products
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get single product
router.get("/single", async (req, res) => {
  try {
    let product = await Product.findById(req.headers.productid);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
