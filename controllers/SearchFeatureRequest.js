const { Feature_request } = require('../models');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.searchFeature = async (req, res) => {
    try {
        let { searchFeature } = req.query;

        console.log(searchFeature);

        const search = await Feature_request.findAll({where: { title: {[Op.like]: '%' + searchFeature + '%'} }});
        console.log(search);
        return res.status(200).json({ searchFeature: search });
   } catch(e) {
    console.log(e);
  }
};