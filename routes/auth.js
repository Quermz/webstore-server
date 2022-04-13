const router = require("express").Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//Register new user
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_VALUE
    ).toString(),
  });

  try {
    savedUser = await newUser.save();
    console.log(savedUser);
    const newCart = new Cart({
      userId: savedUser._id,
    });
    savedCart = await newCart.save();
    res.status(201).json({ savedUser, savedCart });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Incorrect Login Details");
    }
    const cart = await Cart.findOne({ userId: user._id });

    const unhashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_VALUE
    ).toString(CryptoJS.enc.Utf8);

    if (unhashedPassword !== req.body.password) {
      res.status(401).json("Wrong Password");
    } else {
      delete user._doc.password;
      const accessToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_KEY
      );
      console.log(user);
      res.status(200).json({ user, cart, accessToken });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("error logging in");
  }
});

// Validate token

module.exports = router;
