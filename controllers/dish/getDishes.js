//Import Model
const Dish = require("../../models/dish");

// Get Dishes Controller
exports.getDishes = async(req, res) => {
    try{
        //Fetch all the items from database
        const allDishes = await Dish.find({});
        res.status(200).json({
            success:true,
            data:allDishes,
            message: "All dishes are fetched"
        })
    }
    catch(error){
        console.log(error);
        console.error(error);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:error.message,
        })
    }
}

