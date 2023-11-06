const { getRequest, upvote } = require("../services/featureRequestService");

exports.index = async (req, res) => {

    /* const requestID = 1537979745;
    const request = await getRequest(requestID);
    console.log(request.id)

    const upvoteRequest = await upvote({
      feature_request_id: requestID
    });
    console.log(upvoteRequest) */
    
    res.render('../views/pages/index');
  };