const { Feature_request } = require('../models');
const sequelize = require("sequelize");
const axios = require("axios");

///TO DO update for feature request
exports.getAll = async (req, res) => {
  try {
    const featureRequest = await featureRequest.findAll();
    return res.render('featureRequest', { featureRequest: featureRequest });
  } catch (e) {
    console.log(e);
    return res.send('Error');
  }
};


exports.single = async (req, res) => {
  try {
    const request = await Feature_request.findOne({ where: { id: Number(req.params.requestId)}});
    return res.status(200).json(request);
  } catch(err) {
    return res.sendStatus(500);
  }
};

exports.createForm = (req, res) => {
    return res.render('pages/featureRequestCreate');
  };
  
  exports.create = async (req, res) => {
    try {
      const { category, title, details } = req.body;
  
      if (!category || !title || !details) {
        return res.status(400).send('Alle felter skal udfyldes korrekt.');
      }

      const featureRequestData = {
        userID: 22486,
        title: title,
        description: details,
        category: category
      };

      const data = await axioscall(featureRequestData);
    
      const externalId = data.data.id;

      featureRequestData.id = externalId;


      const FeatureRequest = await Feature_request.create(featureRequestData);
  
        
        res.status(200).send(`Feature request oprettet med ID: ${FeatureRequest.id}`);


    } catch (e) {
      console.error(e);
      return res.status(500).send('Der opstod en fejl under oprettelsen af feature-requesten.');
    }
  };

 const axioscall = async (data) => {

  return await axios.post('https://webdock.io/en/platform_data/feature_requests/new', data)
  .then(response => {
    if (response.status === 200) {
      return response
        

    } else {
      console.error("An error occurred:", response.data.message);
    }
  })
  .catch(error => {
    console.error("An error occurred:", error.message);
  });

 }

  

  
