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


const { FeatureRequest } = require('../models');

exports.updateStatus = async (req, res) => {
  try {
    const { feature_request_id, status } = req.body;

    const validStatusValues = ['Under Review', 'Planned', 'In Progress', 'Completed', 'Closed'];

    if (!validStatusValues.includes(status)) {
      return res.status(400).json({ message: 'Ugyldig statusværdi' });
    }
   
    const updatedFeatureRequest = await FeatureRequest.update(
      { status },
      { where: { id: feature_request_id } }
    );
   
    if (updatedFeatureRequest) {
      return res.status(200).json({ message: 'Status opdateret med succes' });
    } else {
      return res.status(404).json({ message: 'Funktionanmodning ikke fundet' });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

