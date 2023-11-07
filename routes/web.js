const express = require("express");


const Default = require("../controllers/DefaultController")
const FeatureRequests = require('../controllers/featureRequestsController');
const Upvote = require("../controllers/UpvoteController");

const LoginController = require("../controllers/LoginController");
const LocalStorageController = require("../services/localStorage");
const UsersController = require("../controllers/UsersController");



const router = express.Router();

module.exports = () => {

    
    router.get('/', Default.index);
    
    router.get('/featureRequests', FeatureRequests.getAll);
    router.get('/featureRequests/:requestId', FeatureRequests.single);
    router.get('/featureRequests/create', FeatureRequests.createForm);
    router.post('/featureRequests/create', FeatureRequests.create);

    router.get('/featureRequests/:requestId/upvotes', Upvote.getUpvotes);
    router.put('/featureRequests/:requestId/upvotes', Upvote.upvote);


    router.get('/status', (req,res) => res.sendStatus(200))


    router.get('/users', UsersController.createUsers);
    router.get('/index', LoginController.indexRedirect);
    router.get('/login', LoginController.login);
    router.get('/loggedout', LoginController.localStorageLoggedOutRedirect);
    router.get('/login/ssoredirect', LoginController.redirect);
    router.get('/login/ssotoken', LoginController.ssoToken);
    router.get('/login/localstorage', LocalStorageController.loginLocalStorage);

    return router;
};
