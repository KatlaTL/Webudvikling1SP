const TokenService = require("../services/TokenService");
const PermissionService = require("../services/PermissionService");
const cache = require("../loaders/cache");

exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        const decoded = TokenService.verifyToken(token);
        const { jwtError, decodedToken } = decoded;
        
        if (jwtError) {
            return res.status(401).json({messsage: "Not authorized"});
        }

        if (decodedToken && !decodedToken.roles) {
            return res.status(401).json({messsage: "Not authorized"});
        }

        next();
    } else {
        res.status(401).json({message: "Not authorized, token not available"});
    }
};

exports.adminAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (token) {
        const decoded = TokenService.verifyToken(token);
        const { jwtError, decodedToken } = decoded;
 
        if (jwtError) {
            return res.status(401).json({messsage: "Not authorized"});
        }

        if (decodedToken && decodedToken.roles) {
            const cachedRoles = cache.get("userRoles");    
            let userRoles = {}; 
            
            if (cachedRoles) {
                userRoles = cachedRoles;
            } else {
                userRoles = await PermissionService.getAllRoles();
            }

            let authorized = false;
            for (let i = 0; i < decodedToken.roles.length; i++) {
                if (decodedToken.roles[i].role_id === userRoles.SuperAdmin || decodedToken.roles[i].role_id === userRoles.Admin) {
                    authorized = true;
                }
            }

            if (!authorized) {
                return res.status(401).json({messsage: "Not authorized"});
            }
        } else {
            return res.status(401).json({messsage: "Not authorized"});
        }

        next();
    } else {
        res.status(401).json({message: "Not authorized, token not available"});
    }
};