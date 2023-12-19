const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");

exports.signup = async(req, res) => {
    try{
        //Extract Data
        const {name, email, password, role} = req.body;

        //Find existing registered email
        const exsistingAdmin = await Admin.findOne({email});
        if(exsistingAdmin){
            return res.status(404).json({
                success: false,
                message: 'Admin already registered',
            });
        }

        //Encrypting the password
        let encryptedPassword;
        try{
            encryptedPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: 'Unable to encryt password',
            });
        }

        //Insert into database
        const response = await Admin.create({name, email, password:encryptedPassword, role});
        res.status(200).json(
            {
                success : true,
                data : response,
                message : 'Admin added successfully',
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

