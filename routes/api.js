const express = require("express");
const cors = require("cors");
const Status = require("../controllers/api/v1/StatusController");

const router = express.Router();

const corsConfig = (origin, methods) => {
    return {
        origin: origin,
        methods: methods,
        allowedHeaders: [
            "Content-Type",
            "Accept"
         ],
        optionsSuccessStatus: 200
    };
};

module.exports = () => {
    router.options("/v1/status/update", cors(corsConfig("https://webdock.io", ["POST"])));
    router.post("/v1/status/update", cors(), Status.update);
    return router;
};