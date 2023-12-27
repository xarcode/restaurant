const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    // Extract Data
    const { email, password } = req.body;

    if (!email || !password) {
      return res.redirect("/admin/login?errorMessage="+encodeURIComponent("Fill all the details"));
    }

    // Find existing registered email
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.redirect("/admin/login?errorMessage="+encodeURIComponent("Admin not registered"));
    }

    let payload = {
      name: existingAdmin.name,
      email: existingAdmin.email,
      id: existingAdmin._id,
      role: existingAdmin.role,
    };

    if (await bcrypt.compare(password, existingAdmin.password)) {
      // Create JWT Token for login
      // Sign params - payload, JWT Secret
      let token = jwt.sign(payload, process.env.JWTSECRET);
      existingAdmin.token = token;
      existingAdmin.password = undefined;

      res.cookie("jwt", token, { httpOnly: true });
      console.log("user logged in successfully");
      res.redirect("/dashboard");
    } else {
      // Password doesn't match
      return res.redirect("/admin/login?errorMessage="+encodeURIComponent("Incorrect Password"));
    }
  } catch (error) {
    console.error(error);
    return res.redirect("/admin/login?errorMessage="+encodeURIComponent("Internal Server Error"));

  }
};
