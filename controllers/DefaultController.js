const FeatureRequestService = require("../services/FeatureRequestService");
const TokenService = require("../services/TokenService");
const { sequelize } = require("../models");
const fs = require("fs/promises");


exports.index = async (req, res) => {
    //res.render('../views/pages/index');

    const { page } = req.query;
    const { authorization } = req.cookies;
    let loginInfo;

    if (authorization) {
        const decoded = TokenService.verifyToken(authorization);
        const { jwtError, decodedToken } = decoded;

        if (!jwtError) {
            const { user_id, user_name } = decodedToken
            loginInfo = {
                user_id,
                user_name,
                authorization
            }
        }
    }

    let mainPage = "featureRequests";
    let featureRequests = null;
    let pageExists = true;
    if (page) {
        mainPage = page.split("?")[0]; //hack to get around webdock not allowing to add additional query params to redirect url
        try {
            await fs.access("views/v2/pages/" + mainPage + ".ejs"); //check if ejs file exists
        } catch (err) {
            pageExists = false;
        }
    } else {    
        featureRequests = await sequelize.transaction(async (transaction) => {
            return await FeatureRequestService.getAllRequests(transaction);
        });
    }
    
    res.render('../views/v2/layout/index', { 
        mainPage,
        pageExists,
        featureRequests,
        ...(loginInfo && {loginInfo: JSON.stringify(loginInfo)})
    });
};