const { Comment } = require('../models');

exports.comments = (req, res) => {
  return res.render('comments');
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


