const express = require("express");

const LoginController = require("../controllers/LoginController");
const LocalStorageController = require("../services/localStorage");
const UsersController = require("../controllers/UsersController");
const CommentsController = require('../controllers/CommentsController');


const router = express.Router();

module.exports = () => {
    //ADD routers here with router.get / router.post
    router.get('/users', UsersController.createUsers);
    router.get('/index', LoginController.indexRedirect);
    router.get('/login', LoginController.login);
    router.get('/comments', CommentsController.comments);
    router.get('/loggedout', LoginController.localStorageLoggedOutRedirect);
    router.get('/login/ssoredirect', LoginController.redirect);
    router.get('/login/ssotoken', LoginController.ssoToken);
    router.get('/login/localstorage', LocalStorageController.loginLocalStorage);
    return router;
};