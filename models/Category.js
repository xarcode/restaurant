const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        categoryId: {
            type: String,
            required: true,
            unique: true,
        },
        dishes: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish',
            },
        ],
    }
);

module.exports = mongoose.model("Category", categorySchema);
