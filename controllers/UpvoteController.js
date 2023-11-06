const { Upvote } = require("../models");
const { Upvote_has_user } = require("../models");
const { sequelize } = require("../models");

exports.getUpvotes = async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const feature_request_id = Number(req.params.requestId);

            let upvote = await Upvote.findOne({ 
                where: { feature_request_id: feature_request_id}
            }, { Transaction: t});

            if(!upvote) {
                upvote = await Upvote.create({
                    amount: 0,
                    feature_request_id: feature_request_id
                }, { Transaction: t })
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
        await sequelize.transaction(async (t) => {
            const { user_id } = req.body;
            const feature_request_id = Number(req.params.requestId);
            
            let upvote = await Upvote.findOne({ 
                where: { feature_request_id: feature_request_id}
            }, { Transaction: t});

            if(!upvote) {
                upvote = await Upvote.create({
                    amount: 0,
                    feature_request_id: feature_request_id
                }, { Transaction: t })
            }

            const userHasUpvote = await Upvote_has_user.findOne({
                where: { 
                    user_id: user_id,
                    upvote_id: upvote.id
                }
            });


            if(!userHasUpvote) {
                await Upvote.increment("amount", {
                    where: { feature_request_id: feature_request_id}
                }, { Transaction: t });

                await Upvote_has_user.create({
                    user_id: user_id,
                    upvote_id: upvote.id
                }, { Transaction: t });

            } else {
                await Upvote.decrement("amount", {
                    where: { feature_request_id: feature_request_id}
                }, { Transaction: t });

                await Upvote_has_user.destroy({
                    where: {
                        user_id: user_id,
                        upvote_id: upvote.id
                    }
                }, { Transaction: t });
            }
        });
        
        return res.sendStatus(200);
    } catch(err) {
        console.log(err)
        return res.sendStatus(500);
    }
}

exports.increment = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {            
            const feature_request_id = Number(req.params.requestId);

            await Upvote.increment("amount", {
                where: { feature_request_id: feature_request_id}
            }, { Transaction: t })
        });
        return res.sendStatus(200);
    } catch(err) {
        return res.sendStatus(500);
    }
}

exports.decrement = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {            
            const feature_request_id = Number(req.params.requestId);

            await Upvote.decrement("amount", {
                where: { feature_request_id: feature_request_id}
            }, { Transaction: t })
        });

        return res.sendStatus(200);
    } catch(err) {
        return res.sendStatus(500);
    }
}