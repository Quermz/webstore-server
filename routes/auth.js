const router = require("express").Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { verifyToken } = require("./verifyToken");

dotenv.config();

//Register new user
router.post("/register", async (req, res) => {
  try {
    if (
      !req.body.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      res.status(400).json("Email");
      return;
    }
    if (req.body.password != req.body.confirmPassword) {
      res.status(400).json("Confirm passord");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    savedUser = await newUser.save();
    const newCart = new Cart({
      userId: savedUser._id,
    });
    savedCart = await newCart.save();
    res.status(201).json({ savedUser, savedCart });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      email: req.body.email,
    });
    const cart = await Cart.findOne({ userId: user._id });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    delete user._doc.password;
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "2h" }
    );
    res.status(200).json({ user, cart, accessToken });
  } catch (err) {
    res.status(500).json("error logging in");
  }
});

// RefreshLogin
router.post("/refreshLogin", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.headers.userid);
    const cart = await Cart.findOne({ userId: req.headers.userid });
    res.status(200).json({ user, cart });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
