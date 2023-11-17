const { Comment } = require('../models');
const { User } = require('../models');


exports.comments = async (req, res) => {
  try{
    
    const Comments = await Comment.findAll({
      where: { feature_request_id: 1}
    });

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
        console.log(userName[i]);
      };
    }


    return res.status(200).json({Comments, userName});
  } catch(e) {
    console.log(e);
  }
};



exports.postCommentForm = async (req, res) => {
  res.render('comments');
};


exports.postComments = async (req,res) => {
  try {
    console.log(req.user);
    let comment =req.body.comment;
    let commentPost = await Comment.create({ comment:comment });
    return res.status(200).json({commentPost});
  } catch (e) {
    console.log(e);
  }
};




