const { Feature_request, Status, Comment, User, Upvote, sequelize } = require("../models");
const StatusService = require("./StatusService");
const CategoryService = require("./CategoryService");
const { Sequelize, Op } = require("sequelize");

exports.getRequestById = async (feature_request_id, transaction = null) => {
    try {
        return await Feature_request.findOne({
            where: { id: feature_request_id }
        }, { transaction: transaction })
    } catch (err) {
        throw (err);
    }
}

exports.getAllRequestByStatus = async (status_name, transaction = null) => {
    let unManaged = false;
    if (!transaction) {
        transaction = await sequelize.transaction();
        unManaged = true;
    }
    try {
        switch (status_name) {
            case "planned":
                status_name = "Planned";
                break;
            case "inProgress":
                status_name = "In Progress";
                break;
            case "completed":
                status_name = "Completed";
                break;
            default:
                status_name = status_name;
                break;
        }
        const status = await StatusService.getStatusByName(status_name, transaction);
        const requests = await Feature_request.findAll({
            attributes: {
                include: [
                    [Sequelize.col("Upvote.amount"), "upvotes"]
                ]
            },
            include:  {
                model: Upvote,
                attributes: []
            },
            where: { status_id: status.id }
        }, { transaction: transaction })

        if (unManaged) await transaction.commit();

        return requests;
    } catch (err) {
        if (unManaged) await transaction.rollback();
        throw (err);
    }
}

exports.getAllRequests = async (options = {}, transaction = null) => {
    let unManaged = false;
    if (!transaction) {
        transaction = await sequelize.transaction();
        unManaged = true;
    }
    try {
        let queryOptions = {
            where: {},
            order: [["title", "DESC"]]
        }
        for (const [key, value] of Object.entries(options)) {
            switch (key) {
                case "search":
                    if (!value) {
                        continue;
                    }
                    queryOptions.where[Op.or] = [{
                        title: {
                            [Op.substring]: value
                        }
                    },
                    {
                        description: {
                            [Op.substring]: value
                        }
                    }]
                    break;
                case "sortBy":
                    switch (value) {
                        case "Trending":
                            queryOptions.order = [["commentCount", "DESC"]]
                            break;
                        case "Top":
                            queryOptions.order = [["upvotes", "DESC"]]
                            break;
                        case "New":
                            queryOptions.order = [["createdAt", "DESC"]]
                            break;
                        default:
                            queryOptions.order = [["title", "DESC"]]
                            break;
                    }
                    break;
                case "category":
                    const category = await CategoryService.getCategoryByName(value, transaction);
                    queryOptions.where.category_id = category.id;
                    break;
                case "status":
                    const status = await StatusService.getStatusByName(value, transaction);
                    queryOptions.where.status_id = status.id;
                    break;
                case "myOwn":
                    queryOptions.where.user_id = value
                    break;
            }
        }

        const requests = await Feature_request.findAll({
            attributes: {
                include: [
                    [Sequelize.fn("COUNT", Sequelize.col("Comments.id")), "commentCount"],
                    [Sequelize.col("Upvote.amount"), "upvotes"],
                    [Sequelize.col("Status.status"), "status"]
                ]
            },
            ...queryOptions,
            include: [{
                model: Status,
                attributes: []
            }, {
                model: Upvote,
                attributes: []
            }, {
                model: Comment,
                attributes: []
            }],
            group: ["Feature_request.id"]
        }, { transaction: transaction });

        if (unManaged) await transaction.commit();

        return requests;
    } catch (err) {
        if (unManaged) await transaction.rollback();
        throw (err);
    }
};

exports.createRequest = async (data, transaction = null) => {
    try {
        return await Feature_request.create(data, { transaction: transaction })
    } catch (err) {
        throw (err);
    }
};

exports.updateRequest = async (feature_request_id, data, transaction = null) => {
    try {
        return await Feature_request.update(data, {
            where: { id: feature_request_id }
        }, { transaction: transaction })
    } catch (err) {
        throw (err);
    }
};

exports.getAllCommentsByRequestID = async (Feature_request_id, transaction = null) => {
    try {
        return await Feature_request.findOne({
            attributes: {
                include: [
                    [Sequelize.col("Upvote.amount"), "upvotes"],
                    [Sequelize.col("Status.status"), "status"]
                ]
            },
            include: [{
                model: Status,
                attributes: []
            }, {
                model: Upvote,
                attributes: []
            }, {
                model: Comment,
                include: {
                    model: User
                }
            }],
            where: { id: Feature_request_id }
        }, { transaction: transaction });
    } catch (err) {
        throw (err);
    }
}