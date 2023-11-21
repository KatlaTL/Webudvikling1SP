const { Feature_request } = require("../models");
const { Status } = require("../models");
const { Category } = require("../models")
const axios = require("axios");

exports.getAllRequests = async (transaction = null) => {
    try {
        return await Feature_request.findAll({ Transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.createRequest = async (data, transaction = null) => {
    try {
        return await Feature_request.create(data, { Transaction: transaction })
    } catch (err) {
        throw (err);
    }
};

exports.getCategoryByName = async (category_name, transaction = null) => {
    try {
        return await Category.findOne({
            where: {
                category: category_name
            }
        }, { Transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.getAllCategories = async (transaction = null) => {
    try {
        return await Category.findAll({ Transaction: transaction });
    } catch (err) {
        throw (err);
    }
};

exports.getStatusByName = async (status_name, transaction = null) => {
    try {
        return await Status.findOne({
            where: { status: status_name }
        }, { Transaction: transaction });
    } catch (err) {
        throw (err);
    }
}

exports.axiosPost = async (data) => {
    return await axios.post('https://webdock.io/en/platform_data/feature_requests/new', data)
        .then(response => {
            return {
                status: response.status,
                data: response.data
            }
        })
        .catch(error => {
            return {
                status: error.response.status,
                message: error.message
            }
        });
};