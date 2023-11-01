const { featureRequest } = require('../models');

exports.index = async (req, res) => {
  try {
    const featureRequests = await FeatureRequest.findAll();
    return res.render('pages/featureRequest', {featureRequest});
  } catch (e) {
    console.log(e);
    return res.send('Error');
  }
};

exports.createForm = (req, res) => {
  return res.render('pages/featureRequestCreate',);
};

exports.create = async (req, res) => {
  try {
    const { category, title, details } = req.body;
    const featureRequest = await featureRequest.create({category, title, details});
    return res.render('pages/featureRequestCreate');
  } catch (e) {
    console.log(e);
    return res.send('Error');
  }
};


