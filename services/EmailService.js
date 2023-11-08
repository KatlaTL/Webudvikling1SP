const axios = require("axios");

const postmarkServerApiToken = "c3d41965-18a4-479f-a591-4369b7f5952c"; //Should be saved in an environment variable

exports.email = (feature_request) => {
    try {
        console.log(feature_request)
        const { id, title, description } = feature_request;
        const sender = "uclfeedback@webdock.io";
        const recipients = "balloupjuske2208@gmail.com";
        const ccRecipients = ""; //get all user emails with email notification email

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
                                <h1>New feature request created with ID: ${id}.</h1>
                                <h2>${title}</h2> <br/>
                                <p>${description}</p>
                            </body>
                        </html>` 
        }

        axios({
            method: "post",
            url: "https://api.postmarkapp.com/email",
            headers: headers,
            data: JSON.stringify(body)
        });

    } catch(err) {
        throw(err);
    }
}