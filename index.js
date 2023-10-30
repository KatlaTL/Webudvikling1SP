const express = require("express");
const port = process.env.PORT || 3000;
const app = express();


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