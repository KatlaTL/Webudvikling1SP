const FeatureRequestService = require("../services/FeatureRequestService");
const TokenService = require("../services/TokenService");
const { sequelize } = require("../models");
const fs = require("fs/promises");


exports.index = async (req, res) => {
    const { page } = req.query;
    const { authorization } = req.cookies;
    let loginInfo;

    if (authorization) {
        const { jwtError, decodedToken } = TokenService.verifyToken(authorization);

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
    let pageExists = true;
    if (page) {
        mainPage = page.split("?")[0]; //hack to get around webdock not allowing to add additional query params to redirect url
        try {
            await fs.access("views/pages/" + mainPage + ".ejs"); //check if ejs file exists
        } catch (err) {
            pageExists = false;
        }
    }
    
    res.render('../views/layout/index', { 
        mainPage,
        pageExists,
        ...(loginInfo && {loginInfo: JSON.stringify(loginInfo)})
    });
};