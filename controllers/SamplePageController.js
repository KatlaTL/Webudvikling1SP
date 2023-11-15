const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.static('views'));

<<<<<<< HEAD
app.set('view engine', 'ejs');

=======
>>>>>>> signe
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(cors());

<<<<<<< HEAD
const header = {
    render: (req, res) => {
        res.render('views/partials/components/header'); 
    },
};

const SamplePageController = {
    render: (req, res) => {
        res.render('pages/SamplePage'); 
=======
const SamplePageController = {
    render: (req, res) => {
        res.render('pages/SamplePage');
>>>>>>> signe
    },
};

module.exports = SamplePageController;