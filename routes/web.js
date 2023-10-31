const express = require("express");

const router = express.Router();
const featureRequests = require('../controllers/featureRequestsController');

module.exports = () => {
    //ADD routers here with router.get / router.post
    
    return router;
};