// Server Instantiate
const express = require("express");
const bodyParser = require("body-parser");
const authenticateToken = require("./middleware/authMiddleware");
const cookieParser = require("cookie-parser");

const ejs = require("ejs");

// Import Models
const Dish = require("./models/dish");
const Category = require("./models/Category");
const Admin = require("./models/Admin");


const app = express();

// Load ENV File
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// set template engine
app.set("view engine", "ejs");

//Middleware to parse the data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authenticateToken);


//Import Routes  
const dishRoutes = require("./routes/dishRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const adminRoutes = require("./routes/adminRoutes");

//Mount the routes
app.use("/dish", dishRoutes);
app.use("/category", categoryRoutes);
app.use("/admin", adminRoutes);


// Activate Server
app.listen(8000, () => {
    console.log("Server running on port 8000");
});

//Connect DB
const dbConnect = require("./config/database");
dbConnect();

//Default Route
app.get('/', (req, res) => {
    res.send("KYKO");
})

app.get("/dashboard", async(req, res) => {
  // Check if user is authenticated (user object is stored in res.locals by the middleware)
  if (res.locals.user) {
    // console.log(res.locals.user);
    //fetch all categories
    // const categories = Category.find({});
    const categoriesQuery = Category.find({});
    const categories = await categoriesQuery.exec();
    // const foodItems = Dish.find({});
    const foodItemsQuery = Dish.find({});
    const foodItems = await foodItemsQuery.exec();

    res.render("backend/dashboard", { user: res.locals.user, categories, foodItems });
  } else {
    res.redirect("/admin/login"); // Redirect to login page if not authenticated
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/admin/login");
});

app.get("/addcategory",async(req,res) =>{
  if(res.locals.user){
    const categoriesQuery = Category.find({});
    const categories = await categoriesQuery.exec();
    res.render("backend/addcategory",{categories});
  }
  else{
    res.redirect("/admin/login");
  }
});

// write code of get route for editCategory, specific category id will be given in the params
app.get("/editCategory/:categoryId",async(req,res) =>{
  if(res.locals.user){
    const cat = Category.find({"categoryId":req.params.categoryId});
    const category = await cat.exec();
    res.render("backend/editCategory",{category});
  }
  else{
    res.redirect("/admin/login");
  }
} );


app.get("/addfooditem/:categoryId", async (req, res) => {
  if (res.locals.user) {
    const cat = Category.find({ "_id": req.params.categoryId });
    const category = await cat.exec();
    const foodItemsQuery = Dish.find({});
    const foodItems = await foodItemsQuery.exec();
    res.render("backend/addfooditem", { category, foodItems });
  } else {
    res.redirect("/admin/login");
  }
});


app.get("/editfooditem/:id", async (req,res) =>{
  if(res.locals.user){
    const food = Dish.find({"_id":req.params.id});
    const foodItem = await food.exec();

    res.render("backend/editFoodItem",{foodItem});
  }else{
    res.redirect("/admin/login");
  }
});

app.get("*", function (req, res) {
  res.redirect("/");
});