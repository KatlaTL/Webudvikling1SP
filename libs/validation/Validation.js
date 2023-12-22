const Schema = require("validate");
const CategoryService = require("../../services/CategoryService");

exports.request = async () => new Schema({
    category: {
        id: {
            type: Number,
            message: "Category ID must be of type Number"
        },
        category: {
            type: String,
            required: true,
            enum: await CategoryService.getAllCategoryNames(),
            message: {
                enum: "The category must be one of the listed categories",
                required: "A category is required"
            }
        }
    },
    title: {
        type: String,
        required: true,
        length: { min: 1, max: 100 },
        message: {
            required: "A title is required",
            length: "The title can only have a maximum of 100 characters"
        }
    },
    details: {
        type: String,
        required: true,
        length: { min: 1, max: 500 },
        message: {
            required: "A description is required",
            length: "The description can only have a maximum of 500 characters"
        }
    }
});

exports.comment = () => new Schema({
    comment: {
        type: String,
        required: true,
        length: { min: 1, max: 2000 },
        message: {
            required: "You must write a comment before submitting",
            length: "The comment can only have a maximum of 2000 characters"
        }
    }
});