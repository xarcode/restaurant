const express = require("express");
const router = express.Router();

//Import Controller
const {createDish} = require('../controllers/dish/createDish');
const {getDishes} = require('../controllers/dish/getDishes');
const {updateDish} = require('../controllers/dish/updateDish');
const {deleteDish} = require('../controllers/dish/deleteDish');

//define API Routes
router.post("/createDish/:categoryId", createDish);
router.get("/getDishes", getDishes);
router.put("/updateDish/:id", updateDish);
router.delete("/deleteDish/:id", deleteDish);

module.exports = router;