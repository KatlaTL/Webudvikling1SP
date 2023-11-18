const FeatureRequestService = require("../services/FeatureRequestService");
const UpvoteService = require("../services/UpvoteService");
const LoginService = require("../services/LoginService");
const CommentService = require("../services/CommentService");
const { sequelize } = require("../models");


exports.index = async (req, res) => {
    //res.render('../views/pages/index');

    const { page, ssoToken } = req.query;
    console.log(page)
    
    let loginInfo = {};

    if (ssoToken) {
        loginInfo = await LoginService.login(ssoToken);
    }

    let mainPage = "featureRequests";
    let featureRequests = null;
    if (page) {
        mainPage = page.split("?")[0]; //hack to get around webdock not allowing to add additional query params to redirect url
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
        mainPage,
        featureRequests,
        loginInfo: JSON.stringify(loginInfo)
    });
};