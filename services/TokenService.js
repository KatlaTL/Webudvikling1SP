const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "e389bb7b-dc58-4b0b-8f54-dac159d5a609"; //Should ideally not have a default value

exports.verifyToken = (token, options = {}) => {
    if (token) {
        return jwt.verify(token, jwtSecret, options, (err, decodedToken) => {
            return { jwtError: err, decodedToken };
        });
    }
    return { jwtError: "Token not available", decodeToken: null }
}

exports.createToken = (data, options = {}) => {
    return jwt.sign(data, jwtSecret, options);
}