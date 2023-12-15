const { Upvote } = require("../models");

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
