const { Comment } = require('../models');
const { User } = require('../models');

exports.comments = async (req, res) => {
  try{
    const Comments = await Comment.findAll();
    /* console.log(Comments); */

    const Users = await User.findAll();
    const User_id = await User.findOne({ where: { id: Number(User.id) }});
    /* console.log(Users); */
    console.log(User_id);

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




