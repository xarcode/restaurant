const mongoose = require("mongoose");

let dishSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique: false,
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
        hasVariety: {
            type: Boolean,
            required: true,
        },
        varieties: {
            type: [String],
            required: function() {
                return this.hasVariety === true;
            },
        },
        varietiesCode: {
            type: [String],
            required: function() {
                return this.hasVariety === true;
            },
        },
        varietiesCost: {
            type: [Number],
            required: function() {
                return this.hasVariety === true;
            },
        },
        cost: {
            type: Number,
            required: function() {
                return this.hasVariety === false;
            },
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    }
);

module.exports = mongoose.model("Dish", dishSchema);


