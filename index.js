const express = require("express");
const bodyParser = require('body-parser');
const webRoutes = require('./routes/web');

const port = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use("/", webRoutes());



app.get('/', (req, res) => {

    res.render('login');
    //let {avatarURL, email, id, name} = req.body;

  });

app.post ("/", (req, res) => {

    let {avatarURL, email, id, name} = req.body;
  
    
    etellerandet.query("INSERT INTO user (avatarURL, email, id, name) VALUES", (avatarURL , email, id, name), function (err, result) {
        if (err) throw err;
    });
});

app.listen(port, () => console.log(`server running on port: ${port}`));