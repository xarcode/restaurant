//Import Model
const Category = require("../../models/Category");

// Get Dishes Controller
exports.getCategory = async(req, res) => {
    try{
        //Fetch all the items from database
        const allCategory = await Category.find({});
        res.status(200).json({
            success:true,
            data:allCategory,
            message: "All Categories are fetched"
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

