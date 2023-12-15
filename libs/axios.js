const axios = require("axios");

exports.axiosPost = async (url, data) => {
    return await axios.post(url, data)
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