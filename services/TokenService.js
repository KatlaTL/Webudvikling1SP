const jwt = require("jsonwebtoken");
const jwtSecret = "e389bb7b-dc58-4b0b-8f54-dac159d5a609";

exports.verifyToken = (token, options = {}) => {
    if(token) {
        return jwt.verify(token, jwtSecret, options, (err, decodedToken) => {
            return {err, decodedToken};
        });
    }
}

exports.createToken = (data, options = {}) => {
    return jwt.sign(data, jwtSecret, options);
}