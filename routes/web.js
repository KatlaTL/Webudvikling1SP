const express = require("express");
const sequelize = require("sequelize");

const router = express.Router();
const featureRequests = require('../controllers/FeatureRequestsController');

module.exports = () => {
    router.get('/featureRequests/create', featureRequests.createForm);
    router.post('/featureRequests/create', featureRequests.create);

    router.get('/status', (req,res) => res.sendStatus(200))
    return router;

};

