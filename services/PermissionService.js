const { Role } = require("../models");
const { User_has_role } = require("../models");
const cache = require("../loaders/cache");

exports.getAllRoles = async (transaction = null) => {
    try {
        const roles = await Role.findAll({
            attributes: ["id", "role", "description"]
        },  { Transaction: transaction });
        
        let userRoles = {};
        for (let i = 0; i < roles.length; i++) {
            userRoles[roles[i].role] = roles[i].id;
        }

        cache.set("userRoles", userRoles);

        return userRoles;
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