//Import Model
const Category = require("../../models/Category");
const Dish = require("../../models/dish");

// Get Dishes Controller
exports.getDishByCategory = async(req, res) => {

    
    try{
        const {categoryId} = req.params;
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                success:false,
                message:"Category Not found"
            })
        }

        // Fetch all dishes for the specified category  
        const dishes = await Dish.find({ categoryId });

        res.status(200).json({
            success:true,
            data:dishes,
            message: "All Dishes in category are fetched"
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

