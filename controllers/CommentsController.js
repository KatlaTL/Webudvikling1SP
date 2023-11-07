const { Comment } = require('../models');

exports.comments = async (req, res) => {
  try{
    const Comments = await Comment.findAll();
    console.log(Comments);
    return res.render('comments', { Comments:Comments});
  } catch(e) {
    console.log(e);
  }
};

exports.postComments = async (req,res) => {
  try {
    let comment =req.body.comment;
    let commentPost = await Comment.create({ comment:comment});
    return commentPost;
  } catch (e) {
    console.log(e);
  }
};




