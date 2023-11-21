const TokenService = require("../services/TokenService");
const UserService = require("../services/UserService");

//TO DO refactor redirect function, make the redirect url more dynamic
exports.redirect = (req, res) => {
    const { page } = req.query;
    const host = "http://webdockproje.vps.webdock.cloud"; //use for production
    const localhost = "http://127.0.0.1:3000" //use for development
    const path = "/"; //"/login/sso/token";
    const pageParam = page ? `?page=${page}` : "";

    const url = new URL("https://webdock.io/en/login");

    url.searchParams.append("companyID", "ucl_feedback_tool");
    url.searchParams.append("redirect", localhost + path + pageParam);
    return res.redirect(url);
    //For testing
    //return res.redirect('http://localhost:3000/login/sso/token?companyID=ucl_feedback_tool&ssoToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdmF0YXJVUkwiOiIiLCJlbWFpbCI6ImFua3IzODczMEBlZHUudWNsLmRrIiwiaWQiOjIyNDg2LCJuYW1lIjoiQW5kZXJzIEtyb2doIn0.d87KXlK-bGFvqiK-jRcb2Pa5synhSlDm0wJNxg_-xGY&redirect=https%3A%2F%2Ffeedback.webdock.io');
};

exports.login = async (req, res) => {
    try {
        const { ssoToken } = req.query;

        const decoded = TokenService.verifyToken(ssoToken);
        const { jwtError, decodedToken } = decoded;

        if (jwtError) {
            return res.status(401).json({ messsage: "Not authorized" });
        }

        const { id, name } = await UserService.getOrCreateUser(decodedToken);
        const maxAge = 0.5 * 60 * 60; //30 min in secounds

        const token = TokenService.createToken({
            user_id: id,
            user_name: name,
        }, { expiresIn: maxAge });

        res.status(201).json({
            messsage: "User was successfully logged in",
            user: id,
            userName: name,
            jwt: token
        });

    } catch (err) {
        return res.sendStatus(500);
    }
};