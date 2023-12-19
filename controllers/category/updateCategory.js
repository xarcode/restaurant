const Category = require("../../models/Category");

exports.updateCategory = async (req, res) => {
    try{
        const {id} = req.params;
        const {title} = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            {_id : id},
            {title}
        )
        if(!updatedCategory){
            return res.status(404).json({
                success:false,
                message:"No data found"
            })
        }
        res.status(200).json(
            {
                success : true,
                data : updatedCategory,
                message : 'Updated Successfully',
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
