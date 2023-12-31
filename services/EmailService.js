const axios = require("axios");
const UserService = require("./UserService");
const PermissionService = require("../services/PermissionService");
const cache = require("../loaders/cache");

const postmarkServerApiToken = process.env.POSTMARK_SERVER_API_TOKEN || "c3d41965-18a4-479f-a591-4369b7f5952c"; //Should ideally not have a default value

exports.email = async (feature_request) => {
    try {
        const { id, title, description } = feature_request;

        const sender = process.env.EMAIL_SENDER || "uclfeedback@webdock.io";
        const recipients = process.env.EMAIL_RECIPIENTS || "admin@webdock.io";
        const ccRecipients = (await getRecipients()).toString(); //get all user emails with email notification permission

        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Postmark-Server-Token": postmarkServerApiToken
        };

        const body = {
            From: sender,
            To: recipients,
            Cc: ccRecipients,
            Subject: `New feature request created with ID: ${id}`,
            Tag: "Feature Request Notification",
            TextBody: `New feature request created with ID: ${id}. n\n\ Title: ${title} \n\n Description: ${description}`,
            HtmlBody: `<html>
                            <body>
                                <h1>New feature request created with ID: ${id}.</h1> <br/>
                                <h2>${title}</h2>
                                <p>${description}</p>
                            </body>
                        </html>`
        };

        await axios({
            method: "post",
            url: "https://api.postmarkapp.com/email",
            headers: headers,
            data: JSON.stringify(body)
        });
        return true;
    } catch (err) {
        let error = new Error(`${err.response.statusText}. ${err.response.data.Message}`);
        error.status = err.response.status;
        //throw error;
        return false;
    }
}

const getRecipients = async () => {
    const cachedRoles = cache.get("userRoles");
    let userRoles = {};

    if (cachedRoles) {
        userRoles = cachedRoles;
    } else {
        userRoles = await PermissionService.getAllRoles();
    }

    const users = await UserService.getUsersByRole(userRoles.EmailNotifications);

    let emails = [];
    for (let i = 0; i < users.length; i++) {
        emails.push(users[i].email);
    }

    return emails;
}