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

    return res.render('comments', { Comments:Comments, username:userName });
  } catch(e) {
    console.log(e);
  }
};

exports.postComments = async (req,res) => {
  try {
    let comment =req.body.comment;
    let commentPost = await Comment.create({ comment:comment });
    return commentPost;
  } catch (e) {
    console.log(e);
  }
};




