const express = require("express");

const Default = require("../controllers/DefaultController")
const FeatureRequests = require('../controllers/featureRequestsController');
const Upvote = require("../controllers/UpvoteController");
const Login = require("../controllers/LoginController");
const { userAuth, adminAuth } = require("../middleware/Auth");
const SamplePageController = require('../controllers/SamplePageController');
const CommentsController = require('../controllers/CommentsController');

const router = express.Router();

module.exports = () => {

    router.get('/', Default.index);
    router.get('/createFeatureRequest', Default.index);
    router.get('/comments/:requestId', Default.index);
    
    router.get('/featureRequests', FeatureRequests.getAll);
    router.get('/featureRequests/create', FeatureRequests.createForm);
    router.post('/featureRequests/create', userAuth, FeatureRequests.create);
    router.get('/featureRequests/:requestId', FeatureRequests.single);
 
    router.get('/categories', FeatureRequests.getAllCategories);

    router.get('/emailtest', FeatureRequests.email)

    router.get('/featureRequests/:requestId/upvotes', Upvote.getUpvotes);
    router.put('/featureRequests/:requestId/upvotes', userAuth, Upvote.upvote);

    router.get('/status', (req,res) => res.sendStatus(200))

    router.get('/login/sso/redirect', Login.redirect);
    router.get('/login/sso/token', Login.login);

    router.get('/comments', CommentsController.comments);

    router.get('/showcomments/:requestId', CommentsController.comments);

    router.post('/comments/postcomments/posted', CommentsController.postComments);
    

    return router;
};
