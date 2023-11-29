const { Comment } = require('../models');
const { User } = require('../models');
const { Feature_request } = require('../models');


exports.comments = async (req, res) => {
  try{
   Comments = await Comment.findAll({
      include: [User,
      Feature_request]
     /*  include: [{
        model: Feature_request,
        as: 'parent_feature_request_id',
        where: {parent_feature_request_id: 'feature_request_id' },
        include: [{
          model: User,
          where: {
            id: "user_id"
          },
          required: false
        }]
      }] */
    });

  /*   const FeatureRequests = await Feature_request.findAll();
    
    let Feature_request_id = [];
    for(let i = 0; i < FeatureRequests.length; i++) {
      Feature_request_id.push(FeatureRequests[i].id);  
    }
    console.log(Feature_request_id);
    
    const Comments = await Comment.findAll({
      where: { feature_request_id: Feature_request_id}
    });

    console.log(Comments);

    let userIds = [];
    for(let i = 0; i < Comments.length; i++) {
      userIds.push(Comments[i].user_id);  
    }
    
    const Users = await User.findAll({
      where: { id: userIds }
      });

    let userIdsUsers = [];
    for(let i = 0; i < Users.length; i++) {
      userIdsUsers.push(Users[i].id); 
    }

    let userName = [];
    for(let i = 0; i < userIdsUsers.length; i++) {

      if( userIdsUsers[i] == userIds[i]){
        userName.push(Users[i].name);
      };
    }
 */

    return res.status(200).json({Comments});
  } catch(e) {
    console.log(e);
  }
};



exports.postCommentForm = async (req, res) => {
  res.render('comments');
};


exports.postComments = async (req,res) => {
  try {
    let comment =req.body.commentData;
    console.log(comment);
    let commentPost = await Comment.create({ comment:comment });
    return res.status(200).json({commentPost});
  } catch (e) {
    console.log(e);
  }
};




