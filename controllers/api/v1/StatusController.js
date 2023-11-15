const { Feature_request } = require("../../../models");
const { Status } = require("../../../models");
const { sequelize } = require("../../../models");

exports.update = async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const { feature_request_id, status } = req.body;

            const foundStatus = await Status.findOne({
                where: { status: status }
            }, { Transaction: t });

            if (!foundStatus) {
                throw ("Status not found");
            }

            const feature_request = await Feature_request.update({ status_id: foundStatus.id }, {
                where: { id: feature_request_id }
            }, { Transaction: t });
            return feature_request;
        });

        res.status(200).json({
            status: 200,
            message: `Affected rows: ${result}`
        });

    } catch (err) {
        let statusCode = 500;
        let message = "The request for updating the status failed";
        if (err == "Status not found") {
            statusCode = 400;
            message = `${err}. Status should be one of Under Review, Planned, In Progress, Completed or Closed`;
        }

        return res.status(statusCode).json({
            status: statusCode,
            message: message
        });
    }
}