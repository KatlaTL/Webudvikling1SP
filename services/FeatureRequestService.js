const { Feature_request, Status, Comment, User, Upvote } = require("../models");
const { Sequelize } = require("sequelize");

exports.getRequestById = async (feature_request_id, transaction) => {
    try {
        return await Feature_request.findOne({
            where: { id: feature_request_id }
        }, { transaction: transaction })
    } catch (err) {
        throw (err);
    }
}

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

exports.getAllCommentsByRequestID = async (Feature_request_id, transaction = null) => {
    try {
        return await Feature_request.findOne({
            attributes: {
                include: [
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
                include: {
                    model: User
                }
            }],
            where: { id: Feature_request_id }
        }, { transaction: transaction });
    } catch (err) {
        throw (err);
    }
}