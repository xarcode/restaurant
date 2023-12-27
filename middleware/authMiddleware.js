// authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWTSECRET, (err, user) => {
      if (err) {
        res.clearCookie("jwt");
        res.locals.user = null;
      } else {
        res.locals.user = user;
      }
    });
  } else {
    res.locals.user = null;
  }

  next();
};

module.exports = authenticateToken;
