const { Comment } = require('../models');
const { User } = require('../models');
const { Feature_request } = require('../models');


exports.comments = async (req, res) => {
  try{
    const Comments = await Comment.findAll({
      where: {feature_request_id: Number(req.params.requestId)},
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
    let user_id = req.body.userId;
    console.log(req.user);
    let commentPost = await Comment.create({ comment:comment, feature_request_id:featureRequestId , user_id:user_id });
    return res.status(200).json({commentPost});
  } catch (e) {
    console.log(e);
  }
};




