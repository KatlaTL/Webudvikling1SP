const express = require("express");
const bodyParser = require('body-parser');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

const port = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use("/", webRoutes());
app.use("/", api());


app.get('/', (req, res) => {

    res.render('login');
    //let {avatarURL, email, id, name} = req.body;

  });

app.post ("/", (req, res) => {

    let {avatarURL, email, id, name} = req.body;
  
    
    etellerandet.query("INSERT INTO etellerandet (etellerandet, etellerandet, etellerandet, etellerandet) VALUES", (etellerandet , etellerandet, etellerandet, etellerandet), function (err, result) {
        if (err) throw err;
    });
});

app.listen(port, () => console.log(`server running on port: ${port}`));