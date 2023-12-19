const express = require("express");
const router = express.Router();

//Import Controller
const {createCategory} = require('../controllers/category/createCategory');
const {getCategory} = require('../controllers/category/getCategory');
const {updateCategory} = require('../controllers/category/updateCategory');
const {deleteCategory} = require('../controllers/category/deleteCategory');
const {getDishByCategory} = require('../controllers/category/getDishByCategory');

//define API Routes
router.post("/createCategory", createCategory);
router.get("/getCategory", getCategory);
router.put("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);
router.get("/:categoryId/dishes", getDishByCategory);


module.exports = router;