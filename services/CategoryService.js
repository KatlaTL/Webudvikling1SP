const { Category } = require("../models");

exports.getAllCategories = async (transaction = null) => {
    try {
        return await Category.findAll({ transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.getAllCategoryNames = async (transaction = null) => {
    try {
        const categories = await Category.findAll({ transaction: transaction });
        return categories.map(({ category }) => category);
    } catch (err) {
        throw (err);
    }
};

exports.getCategoryByName = async (category_name, transaction = null) => {
    try {
        return await Category.findOne({
            where: { category: category_name }
        }, { transaction: transaction });
    } catch (err) {
        throw (err);
    }
}