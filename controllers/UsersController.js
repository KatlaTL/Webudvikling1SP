const { user } = require('../models');

exports.createUsers = async (req, res) => {
  try {
    const { avatarURL, email, id, name } = req.body;
    const user = await user.create({ avatarURL, email, id, name });
    return res.render('login');
  } catch (e) {
    console.log(e);
    return res.send('Error');
  }
};