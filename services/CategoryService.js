const { Category } = require("../models");

exports.getAllCategories = async (transaction = null) => {
    try {
        return await Category.findAll({ transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

/* exports.getCategoriesById = async (req, res) => {
    try {
       console.log(Number(categoriesId));

    const findAllCategories = await Category.findAll({
    where: {id: Number(req.params.requestId)}
      });
    return res.status(200).json({findAllCategories});
    } catch (err) {
        throw (err);
    }
} */