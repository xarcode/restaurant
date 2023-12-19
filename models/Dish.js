const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        dishId: {
            type: String, 
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    }
);

module.exports = mongoose.model("Dish", dishSchema);
