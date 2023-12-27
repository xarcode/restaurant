const Category = require("../../models/Category");

exports.createCategory = async(req, res) => {
    try{
        //Extract Data
        const {title, categoryId} = req.body;
        const response = await Category.create({title,categoryId});
        res.redirect("/dashboard");
    }
    catch(error){
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:error.message,
        })
    }
}

