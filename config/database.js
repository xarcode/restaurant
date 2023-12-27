const mongoose = require("mongoose");
require("dotenv").config();


const dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
        // useNewUrlParser : true,
        // useUnifiesTopology:true,
    }).then(() => console.log("Database connected")).catch((error) => {
        console.log("Error connecting database"); 
        console.error(error.message);
        process.exit(1);
    });
}

module.exports = dbConnect;