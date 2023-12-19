const Category = require("../../models/Category");

exports.createCategory = async(req, res) => {
    try{
        //Extract Data
        const {title, categoryId} = req.body;
        const response = await Category.create({title,categoryId});
        res.status(200).json(
            {
                success : true,
                data : response,
                message : 'Category created successfully',
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

