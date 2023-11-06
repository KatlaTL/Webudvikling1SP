const { Feature_request } = require('../models');
const sequelize = require("sequelize");
const axios = require("axios");
const express = require('express');
const app = express();

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
        id: externalId,
        userID: 22486,
        title: title,
        description: details,
        category: category
      };

      const FeatureRequest = await Feature_request.create(featureRequestData);

      axios.post('https://webdock.io/en/platform_data/feature_requests/new', featureRequestData)
      .then(response => {
        if (response.status === 200) {

            const externalId = response.data.id;

            featureRequestData.id = externalId;
            

        } else {
          console.error("An error occurred:", response.data.message);
        }
      })
      .catch(error => {
        console.error("An error occurred:", error.message);
      });


        const newFeatureRequest = await featureRequest.create(featureRequestData);
  
        
        res.status(200).send(`Feature request oprettet med ID: ${newFeatureRequest.id}`);


    } catch (e) {
      console.error(e);
      return res.status(500).send('Der opstod en fejl under oprettelsen af feature-requesten.');
    }
  };

  //få lavet databasen//
  

  