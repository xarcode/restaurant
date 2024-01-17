const Dish = require("../../models/dish");

exports.updateDish = async (req, res) => {
    try{
        const {id} = req.params;
        const obj   = req.body;
        var {title,code, description,hasVar,varieties,varietiesCode,varietiesCost,dcost} = req.body;

        var hasVariety = true, cost = 0;
        if (obj.hasvarieties == undefined || obj.hasvarieties == null) {
          hasVariety = false;
          varieties = [];
            varietiesCode = [];
            varietiesCost = [];
          cost = obj.cost;
        }



        const updatedDish = await Dish.findByIdAndUpdate(
            {_id : id},
            {title,code, description,hasVariety,varieties,varietiesCode,varietiesCost,cost}
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
