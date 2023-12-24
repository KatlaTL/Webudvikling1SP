const { request, comment } = require("../libs/validation/Validation");

exports.validate = async (req, res, next) => {
    const headers = req.headers;
    const { "validation-request-type": type } = headers;
    let validation;

    switch (type) {
        case "FeatureRequest":
            validation = await request();
            break;
        case "Comment":
            validation = comment();
            break;
        default:
            validation = null;
            break;
    }

    if (!validation) {
        return res.status(400).json({
            status: 400,
            message: "validation-request-type header missing"
        })
    }

    const errors = await validation?.validate(req.body);
    if (errors && errors.length > 0) {
        let message = {};
        for (i = 0; i < errors.length; i++) {
            if (errors[i].path.includes(".")) {
                message[errors[i].path.split(".")[0]] = errors[i].message
            } else {
                message[errors[i].path] = errors[i].message
            }
        }
        return res.status(400).json(message)
    } else {
        next();
    }
}