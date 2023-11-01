const express = require("express");

const Status = require("../controllers/api/v1/StatusController");

const router = express.Router();

module.exports = () => {
    router.put("/api/vi/status/:id", Status.update);
    router.post("/api/vi/status/:id", Status.update);
    return router;
};