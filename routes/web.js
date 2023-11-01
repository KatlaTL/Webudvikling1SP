const express = require("express");

const router = express.Router();
const featureRequests = require('../controllers/featureRequestsController');

module.exports = () => {
    router.get('/featureRequests/create', featureRequests.createForm);
    router.post('/featureRequests/create', featureRequests.create);
    router.put('/featureRequests/:id/update-status', featureRequestsController.updateStatus);

    router.get('/status', (req,res) => res.sendStatus(200))
    return router;

};

