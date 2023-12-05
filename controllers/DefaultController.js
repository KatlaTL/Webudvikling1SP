const TokenService = require("../services/TokenService");
const fs = require("fs/promises");

exports.index = async (req, res) => {
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
    
    let pageUrl = req.originalUrl.split("/")[1];
    try {
        await fs.access("views/pages/" + pageUrl + ".ejs"); //check if ejs file exists
    } catch (err) {
        pageUrl = "featureRequests";
    }
    
    res.render('../views/layout/index', {
        pageUrl,
        ...(loginInfo && {loginInfo: JSON.stringify(loginInfo)})
    });
};