const { Comment } = require('../models');
const { User } = require('../models');


exports.comments = async (req, res) => {
  try{
    
    const Comments = await Comment.findAll({
      /* where: { feature_request_id: 1} */
    });

    let userIds = [];
    for(let i = 0; i < Comments.length; i++) {
      userIds.push(Comments[i].user_id);  
    }
    
    /* console.log(userIds);
 */
    const Users = await User.findAll();
    /* console.log(Users.name); */

    let userIdsUsers = [];
    for(let i = 0; i < Users.length; i++) {
      userIdsUsers.push(Users[i].id); 
         
    }

    /* console.log(userIdsUsers);
    console.log(userName[1]); */

    let userName = [];
    for(let i = 0; i < userIds.length; i++) {
      if( userIds[i] === userIdsUsers[i]){
        userName.push(Users[i].name);
      };
    }

    console.log(userName[1]);

    return res.render('comments', { Comments:Comments, Users:Users });
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




