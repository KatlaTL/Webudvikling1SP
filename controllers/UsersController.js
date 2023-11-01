const { User } = require('../models');

exports.index = (req, res) => {
  return res.render('index');
};

exports.createUsers = async (data) => {
  try {
    const { avatarURL, email, id, name } = data;
    const user = await User.create({ id:id, avatarURL:avatarURL, email:email, role_id:1, name:name });
    return user;
  } catch (e) {
    console.log(e);
  }
};