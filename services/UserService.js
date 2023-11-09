const { User } = require("../models");
const { User_has_role } = require("../models");

exports.getUser = async (user_id, transaction = null) => {
   try {
        return await User.findOne({ 
            where: { id: user_id}
        }, { Transaction: transaction });
   } catch(err) {
        throw(err);
   }
};

exports.createUser = async (data, transaction = null) => {
    try {
        //Set role to 5 by default. 5 is the user role
        const { id, avatarURL, email, name, role = 5 } = data;
        const user = await User.create({ 
            id: id, 
            avatarURL: avatarURL, 
            email: email, 
            name: name
        }, { Transaction: transaction });

        await User_has_role.create({
            user_id: user.id,
            role_id: role
        }, { Transaction: transaction });

        return user;
    } catch (err) {
        throw(err);
    }
};


exports.getUserRoles = async (user_id, transaction = null) => {
    const roles = await User_has_role.findAll({
        where: {
            user_id: user_id
        }
    },  { Transaction: transaction });

    let userRoles = [];
    for (let i = 0; i < roles.length; i++) {
        userRoles.push({
            role_id: roles[i].role_id 
        });
    }
    return userRoles;
}