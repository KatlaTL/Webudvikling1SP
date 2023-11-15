const express = require("express");
const cors = require("cors");

const Default = require("../controllers/DefaultController")
const FeatureRequests = require('../controllers/featureRequestsController');
const Upvote = require("../controllers/UpvoteController");
const Login = require("../controllers/LoginController");
const { userAuth, adminAuth } = require("../middleware/Auth");
const SamplePageController = require('../controllers/SamplePageController');


const router = express.Router();

const corsConfig = (origin) => {
    return {
        origin: origin,
        methods: ["GET", "POST", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Accept"
         ],
        optionsSuccessStatus: 200
    };
};

module.exports = () => {
    router.get('/', Default.index);
    
    router.get('/featureRequests', FeatureRequests.getAll);
    router.get('/featureRequests/:requestId', FeatureRequests.single);
    router.get('/featureRequests/create', FeatureRequests.createForm);
    router.post('/featureRequests/create', FeatureRequests.create);

    router.get('/emailtest', FeatureRequests.email)

    router.get('/featureRequests/:requestId/upvotes', Upvote.getUpvotes);
    router.put('/featureRequests/:requestId/upvotes', userAuth, Upvote.upvote);


    router.get('/status', (req,res) => res.sendStatus(200))

    router.options("/login/sso/redirect", cors(corsConfig("https://webdock.io", "http://localhost:3000")));
    router.get('/login/sso/redirect', cors(), Login.redirect);
    router.get('/login/sso/token', Login.login);
    router.get('/SamplePage', SamplePageController.render);

    return router;
};
