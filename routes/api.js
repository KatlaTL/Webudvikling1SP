const express = require("express");

const Status = require("../controllers/api/v1/StatusController");

const router = express.Router();

module.exports = () => {
    //ADD routers here with router.get / router.post
    router.put("/api/vi/status/:id", Status.update);
    return router;
};