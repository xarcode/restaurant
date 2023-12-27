const Dish = require("../../models/dish");

exports.updateDish = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, description,cost} = req.body;
        const updatedDish = await Dish.findByIdAndUpdate(
            {_id : id},
            {title, description,cost}
        )
        if(!updatedDish){
            return res.status(404).json({
                success:false,
                message:"No data found"
            })
        }
        return res.redirect("/dashboard");
        // res.status(200).json(
        //     {
        //         success : true,
        //         data : updatedDish,
        //         message : 'Updated Successfully',
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
