const { sequelize } = require("../models");
const UpvoteService = require("../services/UpvoteService");

exports.getUpvotes = async (req, res) => {
    try {
        const result = await sequelize.transaction(async (transaction) => {
            const feature_request_id = Number(req.params.requestId);
            const amount = 0;

            const [upvote] = await UpvoteService.getOrCreateUpvote(feature_request_id, amount, transaction);
            return upvote;
        });

        return res.status(200).json(result);
    } catch (err) {
        return res.sendStatus(500);
    }
};

exports.upvote = async (req, res) => {
    try {
        const result = await sequelize.transaction(async (transaction) => {
            const { user_id } = req.body;
            const feature_request_id = Number(req.params.requestId);
            const amount = 0;

            const [upvote] = await UpvoteService.getOrCreateUpvote(feature_request_id, amount, transaction);

            const userHasUpvote = await UpvoteService.getUserUpvotes(user_id, upvote.id, transaction);

            if (!userHasUpvote) {
                await UpvoteService.increment(feature_request_id, transaction);

                await UpvoteService.createUserUpvotes(user_id, upvote.id, transaction);

            } else {
                await UpvoteService.decrement(feature_request_id, transaction);

                await UpvoteService.destroyUserUpvotes(user_id, upvote.id, transaction);
            }

            return await UpvoteService.getUpvote(feature_request_id, transaction);
        });

        return res.status(200).json(result);
    } catch (err) {
        return res.sendStatus(500);
    }
};