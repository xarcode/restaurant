const Category = require("../../models/Category");
const Dish = require("../../models/dish");

exports.deleteCategory = async (req, res) => {
    try{
        const {id} = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        // NOT WORKING --------------------------------------------------------------
        // Delete all dishes in the category
        await Dish.deleteMany({ categoryId: category._id });
        // --------------------------------------------------------------------------
        
        // Delete the category
        await Category.findByIdAndDelete(id);

        res.redirect("/dashboard");
        // res.status(200).json(
        //     {
        //         success : true,
        //         message : 'Category and its dishes are deleted',
        //     }
        // );
        
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
