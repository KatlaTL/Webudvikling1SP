const EmailService = require("../services/EmailService");
const FeatureRequestService = require("../services/FeatureRequestService");
const { sequelize } = require("../models");

///TO DO update for feature request
exports.getAll = async (req, res) => {
  try {
    const requests = await Feature_request.findAll();
    return res.status(200).json({ featureRequests: requests });
  } catch (e) {
    return res.sendStatus(500);
  }
};

exports.single = async (req, res) => {
  try {
    const request = await Feature_request.findOne({ where: { id: Number(req.params.requestId) } });
    return res.status(200).json(request);
  } catch (err) {
    return res.sendStatus(500);
  }
};

exports.createForm = (req, res) => {
  return res.render('v2/pages/createFeatureRequest');
  return res.render('pages/featureRequestCreate');
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

    const response = await FeatureRequestService.axiosPost(webdockRequestData);
    if (response.status != 200) {
      return res.status(response.status).json({
        status: response.status,
        message: response.message
      })
    }

    const featureRequest = await sequelize.transaction(async (transaction) => {
      const status = await FeatureRequestService.getStatusByName("Under Review", transaction);  //Under Review is the default status

      if (!status || !status.id) {
        throw ("status not found");
      }

      const requestData = {
        id: response.data.id,
        status: status.id,
        user_id: userId,
        category_id: category.id,
        title: title,
        description: details
      }
  
      return await FeatureRequestService.createRequest(requestData, transaction);
    });


    if (!featureRequest || !featureRequest.id || !featureRequest.title || !featureRequest.description) {
      throw ("featureRequest not found");
    }

    const emailSent = await EmailService.email({ id: featureRequest.id, title: featureRequest.title, description: featureRequest.description});
    if (!emailSent) {
      throw ("email failed")
    }
    res.status(201).json({
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

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await FeatureRequestService.getAllCategories();
    res.status(200).json({
      status: 200,
      categories: categories
    })
  } catch (err) {
    res.sendStatus(500);
  }
}

//TODO move functionallity into create() function
exports.email = async (req, res) => {
  try {
    await EmailService.email({ id: 123, title: "DETTE ER EN TEST", description: "DETTE ER EN TEST. DETTE ER EN TEST. DETTE ER EN TEST. DETTE ER EN TEST." });
    res.status(200).json("Email sent");
  } catch (err) {
    res.status(err.status).json(err.message);
  }
}

