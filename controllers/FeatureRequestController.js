const EmailService = require("../services/EmailService");
const FeatureRequestService = require("../services/FeatureRequestService");
const StatusService = require("../services/StatusService");
const UpvoteService = require("../services/UpvoteService");
const CategoryService = require("../services/CategoryService");
const CommentService = require("../services/CommentService");
const UserService = require("../services/UserService");
const { axiosPost } = require("../libs/axios");
const { sequelize } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const { requests, count } = await FeatureRequestService.getAllRequests({ ...req.query });
    return res.status(200).json({ featureRequests: requests, totalAmountOfRecords: count });
  } catch (err) {
    return res.sendStatus(500);
  }
};

exports.getAllByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const requests = await FeatureRequestService.getAllRequestByStatus(status);
    return res.status(200).json({ featureRequests: requests });
  } catch (err) {
    return res.sendStatus(500);
  }
};

exports.create = async (req, res) => {
  try {
    const { category, title, details } = req.body;
    const userId = req.user.id;

    if (!category || !title || !details) {
      return res.status(400).json({
        status: 400,
        message: 'All fields are required'
      });
    }

    const webdockRequestData = {
      userID: userId,
      title: title,
      description: details,
      category: category.category
    };

    const response = await axiosPost("https://webdock.io/en/platform_data/feature_requests/new", webdockRequestData);
    if (response.status != 200) {
      return res.status(response.status).json({
        status: response.status,
        message: response.message
      })
    }

    const featureRequest = await sequelize.transaction(async (transaction) => {
      const status = await StatusService.getStatusByName("Under Review", transaction);  //Under Review is the default status

      if (!status || !status.id) {
        throw ("status not found");
      }

      const requestData = {
        id: response.data.id,
        status_id: status.id,
        user_id: userId,
        category_id: category.id,
        title: title,
        description: details
      }

      const request = await FeatureRequestService.createRequest(requestData, transaction);

      await UpvoteService.createUpvote(request, transaction);

      return request;
    });


    if (!featureRequest || !featureRequest.id || !featureRequest.title || !featureRequest.description) {
      throw ("featureRequest not found");
    }

    const emailSent = await EmailService.email({ id: featureRequest.id, title: featureRequest.title, description: featureRequest.description });
    if (!emailSent) {
      throw ("email failed")
    }
    return res.status(201).json({
      status: 201,
      message: `Feature request created with ID: ${featureRequest.id}`
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      message: 'The request failed'
    }); //TODO enhance error handling
  }
};

exports.mergeRequest = async (req, res) => {
  try {
    const { "merge-request-select": request_to_merge } = req.body;
    const user_id = req.user?.id;
    const feature_request_id = Number(req.params.requestId);

    const user = await sequelize.transaction(async (transaction) => {
      const statusFound = await StatusService.getStatusByName("Closed", transaction);

      await FeatureRequestService.updateRequest(feature_request_id, {
        parent_feature_request_id: request_to_merge,
        status_id: statusFound.id
      }, transaction);

      const comment = `Feature request :feature_request_id:${feature_request_id}:feature_request_id: has been merged into this post`;
      await CommentService.createComment({
        comment,
        feature_request_id: request_to_merge,
        user_id
      }, transaction);

      return await UserService.getUser(user_id, transaction);
    });

    return res.status(200).json({
      User: user,
      createdAt: new Date(),
      merged_request_id: request_to_merge
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'The request failed'
    });
  }
}

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    return res.status(200).json({
      status: 200,
      categories: categories
    })
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'The request failed'
    });
  }
}

exports.getAllStatuses = async (req, res) => {
  try {
    const statuses = await StatusService.getAllStatuses();
    return res.status(200).json({
      status: 200,
      statuses: statuses
    })
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'The request failed'
    });
  }
}

exports.getFeatureRequestComments = async (req, res) => {
  try {
    const feature_request_id = Number(req.params.requestId);
    const featureRequest = await FeatureRequestService.getAllCommentsByRequestID(feature_request_id);
    return res.status(200).json({ featureRequest });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Request failed"
    });
  }
}