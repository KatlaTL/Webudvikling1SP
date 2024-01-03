require('dotenv').config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

const port = process.env.PORT || 3000;
let options = {}
try {
    options = {
        key: fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/privkey.pem`),
        cert: fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/fullchain.pem`)
    }
} catch (err) {
    options = null;
}

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use("/", webRoutes());
app.use("/api", apiRoutes());

app.get('*', (req, res) => {
    res.status(404).send("404 - Page not found");
});

if (options) {
    https.createServer(options, app).listen(port, () => console.log(`server running on port: ${port}`));
} else {
    app.listen(port, () => console.log(`server running on port: ${port}`));
}