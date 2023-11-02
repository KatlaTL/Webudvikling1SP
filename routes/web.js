const express = require("express");
const sequelize = require("sequelize");

const LoginController = require("../controllers/LoginController");
const UsersController = require("../controllers/UsersController");

const router = express.Router();
const featureRequests = require('../controllers/FeatureRequestsController');

module.exports = () => {
    router.get('/featureRequests/create', featureRequests.createForm);
    router.post('/featureRequests/create', featureRequests.create);

    router.get('/status', (req,res) => res.sendStatus(200))
    //ADD routers here with router.get / router.post
    router.get('/users', UsersController.create);
    router.get('/login', LoginController.login);
    router.get('/login/ssoredirect', LoginController.redirect);
    return router;

};

