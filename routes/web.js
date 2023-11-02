const express = require("express");

const LoginController = require("../controllers/LoginController");
const LocalStorageController = require("../controllers/LocalStorageController");
const UsersController = require("../controllers/UsersController");

const router = express.Router();

module.exports = () => {
    //ADD routers here with router.get / router.post
    router.get('/users', UsersController.createUsers);
    router.get('/index', LoginController.indexRedirect);
    router.get('/login', LoginController.login);
    router.get('/login/ssoredirect', LoginController.redirect);
    router.get('/login/ssotoken', LoginController.ssoToken);
    router.get('/login/localstorage', LocalStorageController.loginLocalStorage);
    return router;
};