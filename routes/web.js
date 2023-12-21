const express = require("express");

const Default = require("../controllers/DefaultController")

const router = express.Router();

module.exports = () => {
    router.get('/', Default.index);
    router.get('/featureRequests/create', Default.index);
    router.get('/featureRequests/:requestId/comments', Default.index);
    return router;
};
