const TokenService = require("../services/TokenService");
const UserService = require("../services/UserService");
const cache = require("../loaders/cache");

exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        const decoded = TokenService.verifyToken(token);
        const { jwtError } = decoded;
        
        if (jwtError) {
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
        
        if (decodedToken) {
            const cachedRoles = cache.get("userRoles");    
            let userRoles; 
            
            if (cachedRoles) {
                userRoles = cachedRoles;
            } else {
                userRoles = await UserService.getAllRoles();
            }
            
            if (userRoles && decodedToken.role_id !== userRoles.SuperAdmin && decodedToken.role_id !== userRoles.Admin) {
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