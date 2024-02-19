const { Comment, User } = require("../models");

exports.createComment = async (data, transaction = null) => {
    try {
        //Sequelize hook that will execute after a comment has been created
        Comment.afterCreate(async (comment, options) => {
            await comment.reload({
                include: {
                    model: User
                },
                transaction: options.transaction
            });
        })
        const comment = await Comment.create(data, { transaction: transaction });

        return comment;
    } catch (err) {
        throw (err);
    }
}