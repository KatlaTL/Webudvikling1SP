const express = require("express");


const Default = require("../controllers/DefaultController")
const FeatureRequests = require('../controllers/featureRequestsController');
const Upvote = require("../controllers/UpvoteController");
const Login = require("../controllers/LoginController");
const { userAuth, adminAuth } = require("../middleware/Auth");
const SamplePageController = require('../controllers/SamplePageController');
const CommentsController = require('../controllers/CommentsController');
const CommentController = require('../controllers/CommentController');



const router = express.Router();


module.exports = () => {

    router.get('/', Default.index);
    
    router.get('/featureRequests', FeatureRequests.getAll);
    router.get('/featureRequests/:requestId', FeatureRequests.single);
    router.get('/featureRequests/create', FeatureRequests.createForm);
    router.post('/featureRequests/create', FeatureRequests.create);
    router.get('/featureRequest', FeatureRequests.index);

    router.get('/emailtest', FeatureRequests.email)

    router.get('/featureRequests/:requestId/upvotes', Upvote.getUpvotes);
    router.put('/featureRequests/:requestId/upvotes', userAuth, Upvote.upvote);


    router.get('/status', (req,res) => res.sendStatus(200))

    router.get('/login/sso/redirect', Login.redirect);
    router.get('/login/sso/token', Login.login);
    router.get('/SamplePage', SamplePageController.render);

    router.get('/comments', CommentsController.comments);
    router.post('/postcomments', CommentsController.postComments);

    return router;
};
