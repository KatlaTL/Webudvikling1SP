const { Comment } = require('../models');

exports.count = async (request_id, transaction = null) => {
    try {
        return await Comment.count({
            where: { feature_request_id: request_id }
        }, { transaction: transaction });
    } catch (err) {
        throw (err);
    }
};