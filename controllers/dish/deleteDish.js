const Dish = require("../../models/dish");

exports.deleteDish = async (req, res) => {
    try{
        const {id} = req.params;

        await Dish.findByIdAndDelete(id);

        res.status(200).json(
            {
                success : true,
                message : 'Dish deleted',
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
