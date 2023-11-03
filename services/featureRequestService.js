const { Feature_request } = require("../models");


exports.getRequest = async (id) => {
    try {
      return await Feature_request.findOne({ where: { id: id}});
    } catch(err) {
      console.error(err);
      return res.send("Error in getRequest service");
    }
  };
  