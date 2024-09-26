const { sequelize } = require("../../../models");
const StatusService = require("../../../services/StatusService");
const FeatureRequestService = require("../../../services/FeatureRequestService");
const { error } = require("../../../libs/error");

exports.update = async (req, res) => {
    try {
        const { "content-type": contentType, accept } = req.headers;

        if (!contentType || contentType != "application/json") {
            throw error("Appropriate Content-Type header missing");         
        }

        if (!accept || ["*/*", "application/json"].indexOf(accept) === -1) {
            throw error("Appropriate Accept header missing");
        }

        const { feature_request_id, status } = req.body;

        if (!feature_request_id || !status) {
            throw error("Body missing");
        }

        const result = await sequelize.transaction(async (transaction) => {
            const statusFound = await StatusService.getStatusByName(status, transaction);

            if (!statusFound) {
                throw error("Status not found");
            }

            return await FeatureRequestService.updateRequest(feature_request_id, { status_id: statusFound.id }, transaction);
        });

        res.status(200).json({
            status: 200,
            message: `Affected rows: ${result}`
        });

    } catch (err) {
        let statusCode = 500;
        let message = "";

        switch (err.name) {
            case "SequelizeDatabaseError":
                statusCode = 409; //
                message = "The request could not be completed due to a conflict with the current state of the resource."
                break;
            case "Appropriate Content-Type header missing":
                statusCode = 415; //Unsupported Media Type
                message = `${err.name}. Please provide Content-Type application/json.`;
                break;
            case "Appropriate Accept header missing":
                statusCode = 406; //Not Acceptable
                message = `${err.name}. The server doesn't support the requested media-type.`;
                break;
            case "Body missing":
                statusCode = 400; //Bad Request
                message = err.name;
                break;
            case "Status not found":
                statusCode = 400; //Bad Request
                message = `${err.name}. Status should be one of Under Review, Planned, In Progress, Completed or Closed.`;
                break;
            default:
                statusCode = 500; //Internal Server Error
                message = "The request for updating the status failed.";
                break;
        };

        return res.status(statusCode).json({
            status: statusCode,
            message: message
        });
    }
}