const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async(req, res) => {
    try{
        //Extract Data
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Fill all the details',
            });
        }

        //Find existing registered email
        const exsistingAdmin = await Admin.findOne({email});
        if(!exsistingAdmin){
            return res.status(401).json({
                success: false,
                message: 'Admin not registered',
            });
        }

        let payload = {
            email: exsistingAdmin.email,
            id: exsistingAdmin._id,
            role: exsistingAdmin.role
        };

        if(await bcrypt.compare(password, exsistingAdmin.password)){
            // Create JWT Token for login
            // Sign params - payload, JWT Secret
            let token = jwt.sign(payload, process.env.JWTSECRET);
            exsistingAdmin.token = token;
            exsistingAdmin.password = undefined;

            res.status(200).json(
                {
                    success : true,
                    token,
                    data : exsistingAdmin,
                    message : 'Admin logged in successfully',
                }
            );
        }
        else{
            // Password doesnt match
            return res.status(403).json({
                success: false,
                message: 'Incorrect Password',
            });
        }

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

