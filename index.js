// Server Instantiate
const express = require("express");
const app = express();

// Load ENV File
require("dotenv").config();
const PORT = process.env.PORT || 8000;

//Middleware to parse the data
app.use(express.json());

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
