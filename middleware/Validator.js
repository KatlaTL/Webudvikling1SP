const { request } = require("../libs/validation/requestValidation");

exports.validate = async (req, res, next) => {
    const requestValidation = await request();

    const errors = await requestValidation.validate(req.body);
    if (errors.length > 0) {
        let message = {};
        for (i = 0; i < errors.length; i++) {
            if (errors[i].path.includes(".")) {
                message[errors[i].path.split(".")[0]] = errors[i].message
            } else {
                message[errors[i].path] = errors[i].message
            }
        }
        res.status(400).json(message)
    } else {
        next();
    }
}