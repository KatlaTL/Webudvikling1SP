const express = require("express");

const Default = require("../controllers/DefaultController")
const FeatureRequest = require('../controllers/FeatureRequestController');
const Upvote = require("../controllers/UpvoteController");
const Login = require("../controllers/LoginController");
const { userAuth, adminAuth } = require("../middleware/Auth");
const CommentsController = require('../controllers/CommentsController');
const SearchFeatureRequest = require('../controllers/SearchFeatureRequest');

const router = express.Router();

module.exports = () => {

    router.get('/', Default.index);
    router.get('/createFeatureRequest', Default.index);
    router.get('/comments/:requestId', Default.index);
    
    router.get('/featureRequests', FeatureRequest.getAll);
    router.post('/featureRequests/create', userAuth, FeatureRequest.create);
    router.put('/featureRequests/:requestId/upvotes', userAuth, Upvote.upvote);
 
    router.get('/categories', FeatureRequest.getAllCategories);

    router.get('/login/sso/redirect', Login.redirect);
    router.get('/login/sso/token', Login.login); //Should ideally be a POST route, as we create a user in our DB, but Webdock redirect only works with a GET route
    router.put('/logout', Login.logout);

    router.get('/showcomments/:requestId', CommentsController.comments);

    router.post('/comments/postcomments/posted', userAuth, CommentsController.postComments);

    router.get('/search', SearchFeatureRequest.searchFeature);
    

    return router;
};
