const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static('public')); 
app.set('view engine', 'ejs');


app.use("/", webRoutes());
app.use("/", apiRoutes());

app.listen(port, () => console.log(`server running on port: ${port}`));


