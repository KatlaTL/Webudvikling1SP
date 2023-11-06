const { User } = require('../models');


exports.createUsers = async (data) => {
  try {
    let { avatarURL, email, id, name } = data;
    let user = await User.create({ id:id, avatarURL:avatarURL, email:email, role_id:1, name:name });
    return user;
  } catch (e) {
    console.log(e);
  }
};