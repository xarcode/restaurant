const Dish = require("../../models/dish");
const Category = require("../../models/Category");

exports.deleteDish = async (req, res) => {
    try{
        const {id} = req.params;

        
        await Dish.findByIdAndDelete(id);

        res.redirect("/dashboard");
        // res.status(200).json(
        //     {
        //         success : true,
        //         message : 'Dish deleted',
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
