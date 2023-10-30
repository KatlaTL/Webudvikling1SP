const express = require('express');
/* const webRoutes = require('./routes/web'); */
/* const bodyParser = require('body-parser'); */

const port = process.env.PORT || 4000;
const app = express();

/* app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs'); */

/* app.use('/', webRoutes()); */



app.get('/', (req, res) => {
    res.send('Hello World');
  });

app.post ("/", (req, res) => {

    var avatarURL = req.body.avatar;
    var email = req.body.email;
    var id = req.body.id;
    var name = req.body.name;
    
    connection.query("INSERT INTO user (avatarURL, email, id, name) VALUES", (avatarURL , email, id, name), function (err, result) {
        if (err) throw err;
    });
});

app.listen(port, () => console.log(`server running on port: ${port}`));