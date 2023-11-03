const { getRequest } = require("../services/featureRequestService");

exports.index = async (req, res) => {

    const requestID = 1537979745;
    const request = await getRequest(requestID);
    console.log(request)
    
    res.render('../views/pages/index', {
      request: request
    });
  };