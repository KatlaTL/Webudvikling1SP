const express = require("express");

const FeatureRequest = require('../controllers/FeatureRequestController');
const Upvote = require("../controllers/UpvoteController");
const Login = require("../controllers/LoginController");
const Comment = require("../controllers/CommentController");
const { userAuth, adminAuth } = require("../middleware/Auth");
const { validate } = require("../middleware/Validator");

const router = express.Router();

module.exports = () => {
    router.get('/featureRequests', FeatureRequest.getAll);
    router.post('/featureRequests/create', validate, userAuth, FeatureRequest.create);
    router.put('/featureRequests/:requestId/upvotes', userAuth, Upvote.upvote);
    router.get('/featureRequests/:requestId/comments', FeatureRequest.getFeatureRequestComments);
    router.post('/featureRequests/:requestId/comments', validate, userAuth, Comment.createComment);
 
    router.get('/categories', FeatureRequest.getAllCategories);

    router.get('/login/sso/redirect', Login.redirect);
    router.get('/login/sso/token', Login.login); //Should ideally be a POST route, as we create a user in our DB, but Webdock redirect only works with a GET route
    router.put('/logout', Login.logout);  

    return router;
};
