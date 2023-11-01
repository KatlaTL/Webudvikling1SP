const { Feature_request } = require("../../../models/feature_request");
const { Status } = require("../../../models/status");

exports.update = async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const { feature_request_id, status } = req.body;
            
            const foundStatus = await Status.findOne({ 
                where: { status: status}
            }, { Transaction: t});

            return await Feature_request.update({ status_id: foundStatus.status_id}, {
                where: { id: feature_request_id }
            }, { Transaction: t});
        });

        res.status(200).json({
            feature_request: result
        });

    } catch(err) {
        return res.status(500).json({
            message: "The request for updating the status failed",
            error: err.message
        });
    }
}