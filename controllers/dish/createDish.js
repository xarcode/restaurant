const Dish = require("../../models/dish");
const Category = require("../../models/Category");

exports.createDish = async(req, res) => {
    try{
        //Extract Data
        const {categoryId} = req.params;
        const category = await Category.findById(categoryId);
        
        // If category not found
        if (!category) {
            return res.status(404).json({
                success:false,
                data:req.params,
                message:"Category Not found"
            })
        }

        const { title, dishId, description, cost } = req.body;
        
        // New dish object
        const newDish = new Dish({
            title,
            dishId,
            description,
            cost,
            categoryId,
        });
    
        await newDish.save();
    
        category.dishes.push(newDish._id);
        await category.save();

        // Send response
        res.status(200).json(
            {
                success : true,
                data : newDish,
                message : 'Dish created successfully',
            }
        );
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

