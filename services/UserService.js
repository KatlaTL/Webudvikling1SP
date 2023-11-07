const { User } = require("../models");

exports.getUser = async (user_id, transaction = null) => {
   try {
        return await User.findOne({ 
            where: { id: user_id}
        }, { Transaction: transaction });
   } catch(err) {
        throw(err);
   }
}

exports.createUser = async (data, transaction = null) => {
    try {
        //Set role to 5 by default. 5 is the user role
        const { id, avatarURL, email, name, role = 5 } = data;
        return await User.create({ 
            id: id, 
            avatarURL: avatarURL, 
            email: email, 
            name: name, 
            role_id: role
        }, { Transaction: transaction });
    } catch (err) {
        throw(err);
    }
};