const express = require("express");
const port = process.env.PORT || 3000;
const app = express();


app.get('/', (req, res) => {

    let {avatarURL, email, id, name} = req.body;
    
  });

app.post ("/", (req, res) => {

    let {avatarURL, email, id, name} = req.body;
  
    
    etellerandet.query("INSERT INTO user (avatarURL, email, id, name) VALUES", (avatarURL , email, id, name), function (err, result) {
        if (err) throw err;
    });
});

app.listen(port, () => console.log(`server running on port: ${port}`));