const { Category } = require("../models");

exports.getAllCategories = async (transaction = null) => {
    try {
        return await Category.findAll({ transaction: transaction });
    } catch (err) {
        throw (err);
    }
};