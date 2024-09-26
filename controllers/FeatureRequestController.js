const EmailService = require("../services/EmailService");
const FeatureRequestService = require("../services/FeatureRequestService");
const StatusService = require("../services/StatusService");
const UpvoteService = require("../services/UpvoteService");
const CategoryService = require("../services/CategoryService");
const { axiosPost } = require("../libs/axios");
const { sequelize } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const requests = await FeatureRequestService.getAllRequests();
    return res.status(200).json({ featureRequests: requests });
  } catch (e) {
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
    res.status(201).json({
      status: 201,
      message: `Feature request created with ID: ${featureRequest.id}`
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'The request failed'
    }); //TODO enhance error handling
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json({
      status: 200,
      categories: categories
    })
  } catch (err) {
    res.sendStatus(500);
  }
}

