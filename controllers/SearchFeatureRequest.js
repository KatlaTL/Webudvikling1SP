const { Feature_request } = require('../models');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.searchFeature = async (req, res) => {
    try {
    let { searchFeature } = req.query;

   const search = await Feature_request.findAll({where: { title: {[Op.like]: '%' + searchFeature + '%'} }});
   return res.status(200).json({search });
   } catch(e) {
    console.log(e);
  }
};