const TokenService = require("../services/TokenService");
const PermissionService = require("../services/PermissionService");
const UserService = require("../services/UserService");
const cache = require("../loaders/cache");
const { sequelize } = require("../models");

exports.userAuth = async (req, res, next) => {
    try {
        req.user = await auth(req.headers);
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({
            status: 401,
            message: "Not authorized"
        });
    }
};

exports.adminAuth = async (req, res, next) => {
    try {
        const user = await auth(req.headers);

        const cachedRoles = cache.get("userRoles");
        let userRoles = {};

        if (cachedRoles) {
            userRoles = cachedRoles;
        } else {
            userRoles = await PermissionService.getAllRoles();
        }

        let authorized = false;
        for (let i = 0; i < user.roles.length; i++) {
            if (user.roles[i].role_id === userRoles.SuperAdmin || user.roles[i].role_id === userRoles.Admin) {
                authorized = true;
            }
        }

        if (!authorized) {
            throw ("Invalid user permissions")
        }

        req.user = user;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({
            status: 401,
            message: "Not authorized"
        });
    }
};

const auth = async (headers) => {
    try {
        if (!headers || !headers.authorization) {
            throw ("Missing authorization");
        }

        const [bearer, token] = headers.authorization.split(" ");

        if (!bearer || bearer.trim().toLowerCase() != "bearer") {
            throw ("Incorrect auth scheme");
        }

        if (!token) {
            throw ("Missing token");
        }

        const decoded = TokenService.verifyToken(token);
        const { jwtError, decodedToken } = decoded;

        if (jwtError) {
            throw (jwtError.message);
        }

        if (!decodedToken || !decodedToken.user_id || !decodedToken.user_email) {
            throw ("Invalid token");
        }

        const user = await sequelize.transaction(async (transaction) => {
            let user = await UserService.getUser({
                id: decodedToken.user_id,
                email: decodedToken.user_email,
            }, transaction);

            if (!user || !user.id) {
                throw ("User not found");
            }

            user.roles = await UserService.getUserRoles(user.id, transaction);
            return user;
        });

        if (!user || !user.roles) {
            throw ("Invalid user permissions");
        }

        return user;
    } catch (err) {
        throw (err);
    }
}