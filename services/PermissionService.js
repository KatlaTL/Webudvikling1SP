const { Role } = require("../models");
const cache = require("../loaders/cache");

exports.getAllRoles = async (transaction = null) => {
    try {
        const roles = await Role.findAll({
            attributes: ["id", "role", "description"]
        },  { transaction: transaction });
        
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