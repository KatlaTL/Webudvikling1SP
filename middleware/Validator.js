const { request, comment, merge } = require("../libs/validation/Validation");
const FeatureRequestService = require("../services/FeatureRequestService");

exports.validate = async (req, res, next) => {
    const { "validation-request-type": type } = req.headers;
    const feature_request_id = Number(req.params.requestId);
    let validation;
    let hasParent = false;

    switch (type) {
        case "FeatureRequest":
            validation = await request();
            break;
        case "Comment":
            hasParent = await containsParent(feature_request_id);

            if (hasParent) {
                return res.status(400).json({
                    status: 400,
                    message: "The request is no longer active"
                })
            }
            validation = comment();
            break;
        case "Merge":
            hasParent = await containsParent(feature_request_id);

            if (hasParent) {
                return res.status(400).json({
                    status: 400,
                    message: "The request has already been merged"
                })
            }
            validation = merge();
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

const containsParent = async (feature_request_id) => {
    try {
        const request = await FeatureRequestService.getRequestById(feature_request_id);
        if (request.parent_feature_request_id) {
            throw new Error();
        }
        return false;
    } catch (err) {
        return true;
    }
}