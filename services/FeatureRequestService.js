const { Feature_request } = require('../models');

exports.getAllRequests = async (transaction = null) => {
    try {
        return await Feature_request.findAll({ Transaction: transaction });
    } catch (err) {
        throw (err);
    }
};