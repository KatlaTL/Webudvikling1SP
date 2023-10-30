const express = require("express");
const fs = require("fs/promises");

const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
  });

app.get('/.well-known/acme-challenge/kHjQZMGUWXX1nKCjOPI-kRYinufSDPpydmnAaMSSkpg', (req, res) => {    
    fs.readFile("SSL-certificates.txt")
        .then(data => res.send(data.toString()));
});


app.listen(port, () => console.log(`server running on port: ${port}`));