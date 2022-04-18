const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_KEY, (err, userId) => {
      if (err) {
        res.status(403).json("Token is not valid!");
        return;
      }
      if (req.headers.userid != userId.id) {
        res.status(403).json("You are not allowed to access this route");
        return;
      }
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

// const verifyTokenAndAuth = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id) {
//       next();
//     } else {
//       res.status(403).json("You are not allowed to access this route");
//     }
//   });
// };

module.exports = { verifyToken };
