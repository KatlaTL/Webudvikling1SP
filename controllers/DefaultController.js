const FeatureRequestService = require("../services/FeatureRequestService");
const UpvoteService = require("../services/UpvoteService");
const CommentService = require("../services/CommentService");
const { sequelize } = require("../models");


exports.index = async (req, res) => {
    //res.render('../views/pages/index');

    const page = req.query.page;

    let mainPage = "featureRequests";
    let featureRequests = null;
    if (page) {
        mainPage = page;
    } else {    
        featureRequests = await sequelize.transaction(async (transaction) => {
            const requests = await FeatureRequestService.getAllRequests(transaction);
            
            const amount = 0;
            for (let i = 0; i < requests.length; i++) {
                let [upvote] = await UpvoteService.getOrCreateUpvote(requests[i].id, amount, transaction);
                requests[i].upvotes = upvote.amount;
                requests[i].comments = await CommentService.count(requests[i].id, transaction);
            }
            return requests;
        });
    }

    res.render('../views/v2/layout/index', { 
        mainPage: mainPage,
        featureRequests: featureRequests
    });
};