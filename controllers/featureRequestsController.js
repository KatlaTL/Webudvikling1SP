const { FeatureRequest } = require('../models');

exports.index = async (req, res) => {
  try {
    const featureRequests = await FeatureRequest.findAll();
    return res.render('pages/featureRequest', { featureRequests });
  } catch (e) {
    console.log(e);
    return res.send('Error');
  }
};

exports.createForm = (req, res) => {
  return res.render('pages/featureRequest');
};

exports.create = async (req, res) => {
  try {
    const { category, title, details } = req.body;
    const featureRequest = await FeatureRequest.create({ category, title, details });
    return res.render('pages/featureRequest');
  } catch (e) {
    console.log(e);
    return res.send('Error');
  }
};