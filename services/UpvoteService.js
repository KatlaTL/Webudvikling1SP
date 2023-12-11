const e = require("cors");
const { Upvote, Upvote_has_user, User } = require("../models");
const { Op } = require("sequelize");

exports.getUpvote = async (request_id, transaction = null) => {
    try {
        return await Upvote.findOne({
            where: { feature_request_id: request_id }
        }, { transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.createUpvote = async (request, transaction = null) => {
    try {
        await request.createUpvote({
            amount: 0,
            feature_request_id: request.id
        }, { transaction: transaction })
    } catch (err) {
        throw (err);
    }
};

exports.getOrCreateUpvote = async (request_id, amount = 0, transaction = null) => {
    try {
        return await Upvote.findOrCreate({ //returns an array with the user object and a created boolean
            where: { feature_request_id: request_id },
            defaults: {
                amount: amount
            },
            transaction: transaction //The API for findOrCreate has changed and is now only taking 1 option object with where, default and transaction
        });
    } catch (err) {
        throw (err);
    }
};

exports.increment = async (upvote, transaction = null) => {
    try {
        await upvote.increment("amount", { transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.decrement = async (upvote, transaction = null) => {
    try {
        await upvote.decrement("amount", { transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.getUserUpvotes = async (feature_request_id, user_id, transaction = null) => {
    try {
        return await Upvote_has_user.findOne({
            include: {
                model: Upvote,
                where: { feature_request_id: feature_request_id }
            },
            where: {
                user_id: user_id,
                upvote_id: { [Op.col]: "Upvote.id" }
            }
        }, { transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.addUserUpvotes = async (upvote, user, transaction = null) => {
    try {
        await upvote.addUser(user, { transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.removeUserUpvotes = async (upvote, user, transaction = null) => {
    try {
        await upvote.removeUser(user, { transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.upvoteHasUser = async (upvote, user, transaction = null) => {
    try {
        return await upvote.hasUser(user, { transaction: transaction });
    } catch (err) {
        throw (err);
    }
}
