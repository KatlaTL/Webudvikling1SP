const express = require("express");

const Default = require("../controllers/DefaultController")
const FeatureRequests = require('../controllers/featureRequestsController');
const Upvote = require("../controllers/UpvoteController");
const Login = require("../controllers/LoginController");

const { userAuth } = require("../middleware/auth");

const router = express.Router();

module.exports = () => {

    
    router.get('/', Default.index);
    
    router.get('/featureRequests', FeatureRequests.getAll);
    router.get('/featureRequests/:requestId', FeatureRequests.single);
    router.get('/featureRequests/create', FeatureRequests.createForm);
    router.post('/featureRequests/create', FeatureRequests.create);

    router.get('/featureRequests/:requestId/upvotes', userAuth, Upvote.getUpvotes);
    router.put('/featureRequests/:requestId/upvotes', userAuth, Upvote.upvote);


    router.get('/status', (req,res) => res.sendStatus(200))


    router.get('/login/ssoredirect', Login.redirect);
    router.get('/login/ssotoken', Login.login);

    return router;
};
