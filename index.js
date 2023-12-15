require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

const port = process.env.PORT || 80;
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
})

app.listen(port, () => console.log(`server running on port: ${port}`));


