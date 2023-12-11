const { Feature_request, Status, Comment, Category, Upvote } = require("../models");
const { Sequelize } = require("sequelize");
const axios = require("axios");

exports.getAllRequests = async (transaction = null) => {
    try {
        return await Feature_request.findAll({
            attributes: {
                include: [
                    [Sequelize.fn("COUNT", Sequelize.col("Comments.id")), "commentCount"],
                    [Sequelize.col("Upvote.amount"), "upvotes"],
                    [Sequelize.col("Status.status"), "status"]
                ]
            },
            include: [{
                model: Status,
                attributes: []
            }, {
                model: Upvote,
                attributes: []
            }, {
                model: Comment,
                attributes: []
            }],
            group: ["Feature_request.id"]
        }, { transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.createRequest = async (data, transaction = null) => {
    try {
        return await Feature_request.create(data, { transaction: transaction })
    } catch (err) {
        throw (err);
    }
};

exports.updateRequest = async (feature_request_id, data, transaction = null) => {
    try {
        return await Feature_request.update(data, {
            where: { id: feature_request_id }
        }, { transaction: transaction })
    } catch (err) {
        throw (err);
    }
};

exports.getCategoryByName = async (category_name, transaction = null) => {
    try {
        return await Category.findOne({
            where: {
                category: category_name
            }
        }, { transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.getAllCategories = async (transaction = null) => {
    try {
        return await Category.findAll({ transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.axiosPost = async (data) => {
    return await axios.post('https://webdock.io/en/platform_data/feature_requests/new', data)
        .then(response => {
            return {
                status: response.status,
                data: response.data
            }
        })
        .catch(error => {
            return {
                status: error.response.status,
                message: error.message
            }
        });
};