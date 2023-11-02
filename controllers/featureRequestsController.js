const { featureRequest } = require('../models');
const sequelize = require("sequelize");
const axios = require("axios");
const express = require('express');
const app = express();

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

const featureRequestData = {
  userID: "Brugerens ID",
  title: "Title på feature request",
  description: "Indholdet i feature requesten",
  category: "Valgt kategori"
};

axios.post('https://webdock.io/en/platform_data/feature_requests/new', featureRequestData)
  .then(response => {
    if (response.status === 200) {
      console.log("Feature request added. ID:", response.data.id);
    } else {
      console.error("An error occurred:", response.data.message);
    }
  })
  .catch(error => {
    console.error("An error occurred:", error.message);
  });

  
  