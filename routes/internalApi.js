const express = require("express");

const FeatureRequest = require('../controllers/FeatureRequestController');
const Upvote = require("../controllers/UpvoteController");
const Login = require("../controllers/LoginController");
const Comment = require("../controllers/CommentController");
const { userAuth, adminAuth } = require("../middleware/Auth");
const { validate } = require("../middleware/Validator");

const router = express.Router();

module.exports = () => {
    router.get('/feature-requests', FeatureRequest.getAll);
    router.post('/feature-requests', validate, userAuth, FeatureRequest.create);
    router.get('/feature-requests/:status', FeatureRequest.getAllByStatus);
    router.put('/feature-requests/:requestId/upvotes', userAuth, Upvote.upvote);
    router.get('/feature-requests/:requestId/comments', FeatureRequest.getFeatureRequestComments);
    router.post('/feature-requests/:requestId/comments', validate, userAuth, Comment.createComment);
    router.put('/feature-requests/:requestId/merge', validate, adminAuth, FeatureRequest.mergeRequest);

    router.get('/categories', FeatureRequest.getAllCategories);
    router.get('/statuses', FeatureRequest.getAllStatuses);

    router.get('/login/sso/redirect', Login.redirect);
    router.get('/login/sso/token', Login.login); //Should ideally be a POST route, as we create a user in our DB, but Webdock redirect only works with a GET route
    router.put('/logout', Login.logout);  

    return router;
};
