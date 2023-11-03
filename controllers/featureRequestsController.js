const { Feature_request } = require('../models');
const { getRequest } = require("../services/featureRequestService");
const axios = require("axios");


exports.single = async (req, res) => {
  try {
    const request = await getRequest(Number(req.params.requestId));
    return res.render("pages/index", { request: request});
  } catch(err) {
    console.error(err);
    return res.send("Error in getRequest");
  }
};



const featureRequestData = {
  userID: "Brugerens ID",
  title: "Title på feature request",
  description: "Indholdet i feature requesten",
  category: "Valgt kategori"
};

exports.createForm = (req, res) => {
  return res.render('pages/featureRequestCreate',);
};

exports.create = async (req, res) => {

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
//axios post her
    try {
    const { category, title, details } = req.body;
    const featureRequest = await Feature_request.create({category, title, details});
    return res.render('pages/featureRequestCreate');
  } catch (e) {
    console.log(e);
    return res.send('Error');
  }
};
/* 
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

  
   */