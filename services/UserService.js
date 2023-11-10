const { User } = require("../models");
const { User_has_role } = require("../models");
const { Op } = require("sequelize");

exports.getUser = async (user_id, transaction = null) => {
    try {
        return await User.findOne({
            where: { id: user_id }
        }, { Transaction: transaction });
    } catch (err) {
        throw (err);
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
        throw (err);
    }
};

exports.getOrCreateUser = async (data, transaction = null) => {
    try {
        const { id, avatarURL, email, name, role = 5 } = data;
        const [user] = await User.findOrCreate({ //returns an array with the user object and a created boolean
            where: { id: id },
            defaults: {
                avatarURL: avatarURL,
                email: email,
                name: name
            },
            Transaction: transaction //The API for findOrCreate has changed and is now only taking 1 option object with where, default and transaction
        });

        await User_has_role.create({
            user_id: user.id,
            role_id: role
        }, { Transaction: transaction });

        return user;
    } catch (err) {
        throw (err);
    }
}

exports.getUserRoles = async (user_id, transaction = null) => {
    try {
        const roles = await User_has_role.findAll({
            where: {
                user_id: user_id
            }
        }, { Transaction: transaction });

        let userRoles = [];
        for (let i = 0; i < roles.length; i++) {
            userRoles.push({
                role_id: roles[i].role_id
            });
        }
        return userRoles;
    } catch (err) {
        throw (err);
    }
};

exports.getUsersByRole = async (role_id, transaction = null) => {
    try {
        const usersByRole = await User_has_role.findAll({
            where: {
                role_id: role_id
            }
        }, { Transaction: transaction });

        let userIds = [];
        for (let i = 0; i < usersByRole.length; i++) {
            userIds.push(usersByRole[i].user_id);
        }

        return await User.findAll({
            where: {
                id: {
                    [Op.or]: userIds
                }
            }
        }, { Transaction: transaction });
    } catch (err) {
        throw (err);
    }
};