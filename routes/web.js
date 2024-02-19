const express = require("express");

const Default = require("../controllers/DefaultController")

const router = express.Router();

module.exports = () => {
    router.get('/', Default.index);
    router.get('/feature-requests/create', Default.index);
    router.get('/feature-requests/:requestId/comments', Default.index);
    return router;
};
