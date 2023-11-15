const express = require("express");

const Default = require("../controllers/DefaultController")
const FeatureRequests = require('../controllers/featureRequestsController');
const Upvote = require("../controllers/UpvoteController");
<<<<<<< HEAD
const Login = require("../controllers/LoginController");

const { userAuth, adminAuth } = require("../middleware/auth");
const SamplePageController = require('../controllers/SamplePageController');
=======
const SamplePageController = require('../controllers/SamplePageController');
const Comment = require('../controllers/CommentController');
>>>>>>> signe

const router = express.Router();

module.exports = () => {

    
    router.get('/', Default.index);
    
    router.get('/featureRequests', FeatureRequests.getAll);
    router.get('/featureRequests/:requestId', FeatureRequests.single);
    router.get('/featureRequests/create', FeatureRequests.createForm);
    router.post('/featureRequests/create', FeatureRequests.create);

<<<<<<< HEAD
    router.get('/emailtest', FeatureRequests.email)
=======
    router.get('/upvotes/featureRequests/:requestId', Upvote.getUpvotes);
    router.put('/upvotes/featureRequests/:requestId', Upvote.upvote);
    router.get('/requestComment', Comment.index);
>>>>>>> signe

    router.get('/featureRequests/:requestId/upvotes', userAuth, Upvote.getUpvotes);
    router.put('/featureRequests/:requestId/upvotes', userAuth, Upvote.upvote);


    router.get('/status', (req,res) => res.sendStatus(200))


    router.get('/login/ssoredirect', Login.redirect);
<<<<<<< HEAD
    router.get('/login/ssotoken', Login.login);
=======
>>>>>>> signe
    router.get('/SamplePage', SamplePageController.render);

    return router;
};
