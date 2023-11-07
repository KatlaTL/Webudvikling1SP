const express = require("express");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const bodyParser = require("body-parser");
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

const port = process.env.PORT || 6001;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.use("/", webRoutes());
app.use("/", apiRoutes());

app.listen(port, () => console.log(`server running on port: ${port}`));


