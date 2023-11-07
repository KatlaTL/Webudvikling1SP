const express = require("express");

const Default = require("../controllers/DefaultController")
const Login = require("../controllers/LoginController");
const Users = require("../controllers/UsersController");
const FeatureRequests = require('../controllers/featureRequestsController');
const Upvote = require("../controllers/UpvoteController");
const SamplePageController = require('../controllers/SamplePageController');

const router = express.Router();

module.exports = () => {
    router.get('/featureRequests', FeatureRequests.getAll);

    router.get('/', Default.index);

    router.get('/featureRequests/:requestId', FeatureRequests.single);
    router.get('/featureRequests/create', FeatureRequests.createForm);
    router.post('/featureRequests/create', FeatureRequests.create);

    router.get('/upvotes/featureRequests/:requestId', Upvote.getUpvotes);
    router.put('/upvotes/featureRequests/:requestId', Upvote.upvote);


    //TO DO at route

    router.get('/status', (req,res) => res.sendStatus(200))

    router.get('/users', Users.create);

    router.get('/login', Login.login);
    router.get('/login/ssoredirect', Login.redirect);
    router.get('/SamplePage', SamplePageController.render);

    return router;
};
