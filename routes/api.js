const express = require("express");
const cors = require("cors");
const Status = require("../controllers/api/v1/StatusController");

const router = express.Router();

const corsConfig = (origin, methods) => {
    return {
        origin: origin,
        methods: methods,
        allowedHeaders: "Content-Type",
        optionsSuccessStatus: 204
    };
};

module.exports = () => {
    router.options("/api/vi/status/:statusId", cors(corsConfig("https://webdock.io", ["PUT", "POST"])));
    router.put("/api/vi/status/:statusId", cors(), Status.update);
    router.post("/api/vi/status/:statusId", cors(), Status.update);
    return router;
};