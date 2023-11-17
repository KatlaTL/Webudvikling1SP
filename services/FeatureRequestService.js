const { Feature_request } = require('../models');

exports.getAll = async (req, res) => {
    try {
      const requests = await Feature_request.findAll();
      return res.status(200).json({ featureRequests: requests});
    } catch (e) {
      return res.sendStatus(500);
    }
  };