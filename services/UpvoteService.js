const { Upvote, Upvote_has_user, User } = require("../models");
const { Op } = require("sequelize");

exports.getUpvote = async (request_id, transaction = null) => {
    try {
        return await Upvote.findOne({
            include: User,
            where: { feature_request_id: request_id }
        }, { Transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.createUpvote = async (request_id, amount = 0, transaction = null) => {
    try {
        return await Upvote.create({
            amount: amount,
            feature_request_id: request_id
        }, { Transaction: transaction });
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
            Transaction: transaction //The API for findOrCreate has changed and is now only taking 1 option object with where, default and transaction
        });
    } catch (err) {
        throw (err);
    }
};

exports.increment = async (request_id, transaction = null) => {
    try {
        await Upvote.increment("amount", {
            where: { feature_request_id: request_id }
        }, { Transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.decrement = async (request_id, transaction = null) => {
    try {
        await Upvote.decrement("amount", {
            where: { feature_request_id: request_id }
        }, { Transaction: transaction });
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
        }, { Transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.createUserUpvotes = async (user_id, upvote_id, transaction = null) => {
    try {
        return await Upvote_has_user.create({
            user_id: user_id,
            upvote_id: upvote_id
        }, { Transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.destroyUserUpvotes = async (user_id, upvote_id, transaction = null) => {
    try {
        await Upvote_has_user.destroy({
            where: {
                user_id: user_id,
                upvote_id: upvote_id
            }
        }, { Transaction: transaction });
    } catch (err) {
        throw (err);
    }
};