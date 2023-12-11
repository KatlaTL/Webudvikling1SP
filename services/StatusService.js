const { Status } = require("../models");

exports.getStatusByName = async (status_name, transaction = null) => {
    try {
        return await Status.findOne({
            where: { status: status_name }
        }, { transaction: transaction });
    } catch (err) {
        throw (err);
    }
}