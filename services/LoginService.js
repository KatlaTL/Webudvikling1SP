const TokenService = require("../services/TokenService");
const UserService = require("../services/UserService");

exports.login = async (ssoToken) => {
    try {
        const decoded = TokenService.verifyToken(ssoToken);
        const { jwtError, decodedToken } = decoded;

        if (jwtError) {
            return res.status(401).json({ messsage: "Not authorized" });
        }

        const { id, name, email } = await UserService.getOrCreateUser(decodedToken);
        const maxAge = 0.5 * 60 * 60; //30 min in secounds

        const token = TokenService.createToken({
            user_id: id,
            user_email: email
        }, { expiresIn: maxAge });

        return {
            user: id,
            userName: name,
            jwt: token,
        }

    } catch (err) {
        throw (err);
    }
};