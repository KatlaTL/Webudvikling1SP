const express = require("express");

const Default = require("../controllers/DefaultController")
const FeatureRequest = require('../controllers/FeatureRequestController');
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
    
    router.get('/featureRequests', FeatureRequest.getAll);
    router.get('/featureRequests/create', FeatureRequest.createForm);
    router.post('/featureRequests/create', userAuth, FeatureRequest.create);
    router.get('/featureRequests/:requestId', FeatureRequest.single);
 
    router.get('/categories', FeatureRequest.getAllCategories);

    router.get('/emailtest', FeatureRequest.email)

    router.get('/featureRequests/:requestId/upvotes', Upvote.getUpvotes);
    router.put('/featureRequests/:requestId/upvotes', userAuth, Upvote.upvote);

    router.get('/status', (req,res) => res.sendStatus(200))

    router.get('/login/sso/redirect', Login.redirect);
    router.get('/login/sso/token', Login.login); //Should ideally be a POST route, as we create a user in our DB, but Webdock redirect only works with a GET route
    router.put('/logout', Login.logout);

    router.get('/comments', CommentsController.comments);

    router.get('/showcomments/:requestId', CommentsController.comments);

    router.post('/comments/postcomments/posted', CommentsController.postComments);
    

    return router;
};
