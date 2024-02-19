const CommentService = require("../services/CommentService");
const { error } = require("../libs/error");

exports.createComment = async (req, res) => {
    try {
        const feature_request_id = Number(req.params.requestId);
        const user_id = req.user?.id;
        const { comment } = req.body;

        if (!feature_request_id || !user_id || !comment) {
            throw error("Invalid data");
        }
        
        const createdComment = await CommentService.createComment({
            comment,
            feature_request_id,
            user_id
        });

        res.status(200).json({ createdComment });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: `Request failed. ${err.name}`
        });
    }
}