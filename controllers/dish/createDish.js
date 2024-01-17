const Dish = require("../../models/dish");
const Category = require("../../models/Category");

exports.createDish = async(req, res) => {
    try{
        //Extract Data
        const {id} = req.params;
        const category = await Category.findById(id);
        // let category = await Category.findOne({categoryId});
        // console.log(category);
        // If category not found
        if (!category) {
            return res.status(404).json({
                success:false,
                data:req.params,
                message:"Category Not found"
            })
        }
        const obj = req.body;
        const { title, code, dishId, description, hasVar, varieties,varietiesCode, varietiesCost , dCost } = req.body;

        var hasVariety = true, cost = 0;
        if (obj.hasvarieties == undefined || obj.hasvarieties == null) {
          hasVariety = false;
          cost = obj.cost;
        }
        // console.log(cost)
        // New dish object
        const newDish = new Dish({
            title,
            code,
            dishId,
            description,
            hasVariety,
            varieties,
            varietiesCode,
            varietiesCost,
            cost,
            categoryId : category._id,
        });
    
        await newDish.save();
    
        category.dishes.push(newDish._id);
        await category.save();

        res.redirect('/dashboard');
        // Send response
        // res.status(200).json(
        //     {
        //         success : true,
        //         data : newDish,
        //         message : 'Dish created successfully',
        //     }
        // );
    }
    catch(error){
        console.log(req.body);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:error.message,
        })
    }
}

