const TokenService = require("../services/TokenService");

exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        const decoded = TokenService.verifyToken(token);
        const { err } = decoded;
        
        if (err) {
            return res.status(401).json({messsage: "Not authorized"});
        } 

        next();
    } else {
        res.status(401).json({message: "Not authorized, token not available"});
    }
};