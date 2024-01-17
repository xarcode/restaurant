const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const Admin = require("../models/Admin");


//Import Controller
const {signup} = require('../controllers/admin/signup');
const {login} = require('../controllers/admin/login');


//define API Routes
router.get("/login", authenticateToken, async(req, res) => {
  if (res.locals.user) {
    res.redirect(200, "/dashboard");
  } else {
    const count = await Admin.countDocuments();
    if (count == 0) {
      return res.redirect(200, "/admin/signup");
    }
    
    const errorMessage = req.query.errorMessage;
    res.render("backend/login", { errorMessage });
  }
});
router.get("/signup", authenticateToken, async(req, res) => {
  if (res.locals.user) {
    res.redirect(200, "/dashboard");
  } else {
    const count = await Admin.countDocuments();
    if (count > 0) {
      return res.redirect({ errorMessage: null }, "/admin/login");
    }
    res.render("backend/signup", { errorMessage: null });
  }
});
router.post("/signup", signup);
router.post("/login", login);
module.exports = router;
