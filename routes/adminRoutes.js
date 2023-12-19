const express = require("express");
const router = express.Router();

//Import Controller
const {signup} = require('../controllers/admin/signup');
const {login} = require('../controllers/admin/login');

//define API Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;