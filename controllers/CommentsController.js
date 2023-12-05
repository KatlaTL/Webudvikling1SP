const { Comment } = require('../models');
const { User } = require('../models');
const { Feature_request } = require('../models');


exports.comments = async (req, res) => {
  try{
  const Comments = await Comment.findAll({
    include: [User,
    Feature_request]
    });

    return res.status(200).json({Comments});
  } catch(e) {
    console.log(e);
  }
};

exports.postComments = async (req,res) => {
  try {
    let comment =req.body.commentData;
    let featureRequestId = req.body.feature_request_id;
    console.log(comment);
    console.log(featureRequestId);
    let commentPost = await Comment.create({ comment:comment });
    return res.status(200).json({commentPost});
  } catch (e) {
    console.log(e);
  }
};




