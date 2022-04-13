const Product = require("../models/Product");

const router = require("express").Router();

//Get products
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  console.log(req.query.category);
  try {
    let products;
    if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get single product
router.post("/single", async (req, res) => {
  console.log(req.body);
  try {
    let product = await Product.findById(req.body.id);
    console.log(product);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
