const express = require("express");
const router = express.Router();

//Import Controller
const {createDish} = require('../controllers/dish/createDish');
const {getDishes} = require('../controllers/dish/getDishes');
const {updateDish} = require('../controllers/dish/updateDish');
const {deleteDish} = require('../controllers/dish/deleteDish');

//define API Routes
router.post("/createDish/:id", createDish);
router.get("/getDishes", getDishes);
router.post("/updateDish/:id", updateDish);
router.post("/deleteDish/:id", deleteDish);

module.exports = router;