const { sequelize } = require("../models");
const UpvoteService = require("../services/UpvoteService");

exports.getUpvotes = async (req, res) => {
    try {
        const result = await sequelize.transaction(async (transaction) => {
            const feature_request_id = Number(req.params.requestId);

            let upvote = await UpvoteService.getUpvote(feature_request_id, transaction);

            if(!upvote) {
                upvote = await UpvoteService.createUpvote(feature_request_id, 0, transaction);
            } 
            return upvote;
        });

        return res.status(200).json(result);
    } catch(err) {
        return res.sendStatus(500);
    }
}

exports.upvote = async (req, res) => {
    try {
        await sequelize.transaction(async (transaction) => {
            const { user_id } = req.body;
            const feature_request_id = Number(req.params.requestId);
            
            let upvote = await UpvoteService.getUpvote(feature_request_id, transaction);

            if(!upvote) {
                upvote = await UpvoteService.createUpvote(feature_request_id, 0, transaction);
            }

            const userHasUpvote = await UpvoteService.getUserUpvotes(user_id, upvote.id, transaction);

            if(!userHasUpvote) {
                await UpvoteService.increment(feature_request_id, transaction);

                await UpvoteService.createUserUpvotes(user_id, upvote.id, transaction);

            } else {
                await UpvoteService.decrement(feature_request_id, transaction);

                await UpvoteService.destroyUserUpvotes(user_id, upvote.id, transaction);
            }
        });
        
        return res.sendStatus(200);
    } catch(err) {
        console.log(err)
        return res.sendStatus(500);
    }
}