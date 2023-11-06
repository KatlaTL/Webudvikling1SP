const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.static('views'));

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(cors());

const SamplePageController = {
    render: (req, res) => {
        res.render('pages/SamplePage');
    },
};

module.exports = SamplePageController;