const TokenService = require("../services/TokenService");
const fs = require("fs/promises");

exports.index = async (req, res) => {
    const { authorization } = req.cookies;
    let loginInfo;
    let admin = false;

    if (authorization) {
        const { jwtError, decodedToken } = TokenService.verifyToken(authorization);

        if (!jwtError) {
            const { user_id, user_name, user_roles } = decodedToken
            loginInfo = {
                user_id,
                user_name,
                authorization
            }

            for (role in user_roles) {
                if (user_roles[role].role_id <= 3) {
                    admin = true;
                    break;
                }
            }
        }
    }

    let feature_request_id;
    if (req.params.requestId) {
        feature_request_id = Number(req.params.requestId);
    }

    let urlArr = req.originalUrl.split("/");
    let pageUrl = urlArr[urlArr.length - 1];
    try {
        if (pageUrl === "create") {
            pageUrl = "createFeatureRequest";
        }
        await fs.access("views/pages/" + pageUrl + ".ejs"); //check if ejs file exists
    } catch (err) {
        pageUrl = "featureRequests";
    }

    res.render('../views/layout/index', {
        pageUrl,
        admin,
        ...(loginInfo && { loginInfo: JSON.stringify(loginInfo) }),
        ...(feature_request_id && { feature_request_id })
    });
};