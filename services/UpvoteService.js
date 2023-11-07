const { Upvote } = require("../models");
const { Upvote_has_user } = require("../models");

exports.getUpvote = async (request_id, transaction = null) => {
    try {
        return await Upvote.findOne({ 
            where: { feature_request_id: request_id}
        }, { Transaction: transaction});
    } catch(err) {
        throw(err);
    }
}

exports.createUpvote = async (request_id, amount = 0, transaction = null) => {
    try {
        return await Upvote.create({
            amount: amount,
            feature_request_id: request_id
        }, { Transaction: transaction });
    } catch(err) {
        throw(err);
    }
}

exports.increment = async (request_id, transaction = null) => {
    try {
        await Upvote.increment("amount", {
            where: { feature_request_id: request_id}
        }, { Transaction: transaction })
    } catch(err) {
        throw(err);
    }
}

exports.decrement = async (request_id, transaction = null) => {
    try {
        await Upvote.decrement("amount", {
            where: { feature_request_id: request_id}
        }, { Transaction: transaction })
    } catch(err) {
        throw(err);
    }
}

exports.getUserUpvotes = async (user_id, upvote_id, transaction = null) => {
    try {
        return await Upvote_has_user.findOne({
            where: { 
                user_id: user_id,
                upvote_id: upvote_id
            }
        }, { Transaction: transaction })
    } catch(err) {
        throw(err);
    }
}

exports.createUserUpvotes = async (user_id, upvote_id, transaction = null) => {
    try {
        return await Upvote_has_user.create({
            user_id: user_id,
            upvote_id: upvote_id
        }, { Transaction: transaction });
    } catch(err) {
        throw(err);
    }
}

exports.destroyUserUpvotes = async (user_id, upvote_id, transaction = null) => {
    try {
        await Upvote_has_user.destroy({
            where: {
                user_id: user_id,
                upvote_id: upvote_id
            }
        }, { Transaction: transaction });
    } catch(err) {
        throw(err);
    }
}