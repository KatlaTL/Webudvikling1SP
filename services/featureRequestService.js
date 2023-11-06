const { Feature_request } = require("../models");
const { Upvote } = require("../models")
const { sequelize } = require("../models");

exports.getRequest = async (id) => {
    try {
      return await Feature_request.findOne({ where: { id: id}});
    } catch(err) {
      console.error(err);
      return res.send("Error in getRequest service");
    }
  };


exports.getUpvotes = async (data) => {
    try {
        return await sequelize.transaction(async (t) => {
            const { feature_request_id } = data;

            let upvote = await Upvote.findOne({ 
                where: { feature_request_id: feature_request_id}
            }, { Transaction: t});

            if(!upvote) {
                upvote = await Upvote.create({
                    amount: 0,
                    feature_request_id: feature_request_id
                }, { Transaction: t})
            }

            return upvote;
        });
        
    } catch(err) {
        console.log(err)
    }
}