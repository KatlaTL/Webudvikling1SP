const { sequelize } = require("../models");
const UpvoteService = require("../services/UpvoteService");

exports.upvote = async (req, res) => {
    try {
        const result = await sequelize.transaction(async (transaction) => {
            const user = req.user;
            const feature_request_id = Number(req.params.requestId);

            const upvote = await UpvoteService.getUpvote(feature_request_id, user.id, transaction);
            const upvoteHasUser = await UpvoteService.upvoteHasUser(upvote, user, transaction);

            if (!upvoteHasUser) {
                await UpvoteService.increment(upvote, transaction);
                await UpvoteService.addUserUpvotes(upvote, user, transaction);
            } else {
                await UpvoteService.decrement(upvote, transaction);
                await UpvoteService.removeUserUpvotes(upvote, user, transaction);
            }
            return await upvote.reload({ transaction, transaction });
        });

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Request failed"
        });
    }
};