const { User } = require('../models');

exports.createUsers = async (req, res) => {
  try {
    const { avatarURL, email, id, name } = req.body;
    const user = await User.create({ avatarURL:avatarURL, email:email, role_id:1, name:name });
    return res.render('login');
  } catch (e) {
    console.log(e);
    return res.send('Error');
  }
};