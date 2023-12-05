const TokenService = require("../services/TokenService");
const UserService = require("../services/UserService");
const { serialize } = require("cookie");

exports.redirect = (req, res) => {
    const { page, ...rest } = req.query;

    const host = process.env.SSO_redirect_back || "http://webdockproje.vps.webdock.cloud";
    const path = "/login/sso/token";

    const returnURL = new URL(host + path);
    returnURL.searchParams.append("page", page);
    
    for (const [key, value] of Object.entries(rest)) {
        returnURL.searchParams.append(key, value);
    }

    const url = new URL("https://webdock.io/en/login");

    url.searchParams.append("companyID", "ucl_feedback_tool");
    url.searchParams.append("redirect", encodeURI(returnURL));

    return res.redirect(url);
};

exports.login = async (req, res) => {
    try {
        let replaceIndex = 0;
        const originalUrl = decodeURIComponent(req.originalUrl).replace(/\?/g, (match) => ++replaceIndex === 2 ? "&" : match); //hack to work around Webdock not properly attaching queryparams
        const fixedUrl = new URLSearchParams(originalUrl.split("?")[1]);

        const page = fixedUrl.get("page") || "";
        const ssoToken = fixedUrl.get("ssoToken");

        const decoded = TokenService.verifyToken(ssoToken);
        const { jwtError, decodedToken } = decoded;

        if (jwtError) {
            return res.status(401).json({ messsage: "Not authorized" });
        }

        const { id, name, email } = await UserService.getOrCreateUser(decodedToken);
        const maxAge = 0.5 * 60 * 60; //30 min in secounds

        const token = TokenService.createToken({
            user_id: id,
            user_name: name,
            user_email: email
        }, { expiresIn: maxAge });

        res.setHeader("Set-Cookie", serialize("authorization", token, {
            httpOnly: true, //makes so the cookie can't be accessed through client site javascript
            maxAge: maxAge,
            secure: process.env.NODE_ENV === 'production', //Secure set httpOnly to httpsOnly, for development set it to false
            sameSite: "lax", //Cookie will not be sent along with requests initiated by third-party websites
            path: "/"
        }));
        
        const host = process.env.SSO_redirect_back || "http://webdockproje.vps.webdock.cloud";
        const url = new URL(`${host}/${page}`);

        const blacklistedParams = ["page", "companyID", "ssoToken", "redirect"];
        fixedUrl.forEach((value, key) => {
            if (!blacklistedParams.includes(key)) {
                url.searchParams.append(key, value);
            }
        });
        
        res.redirect(url);
    } catch (err) {
        return res.sendStatus(500);
    }
};

exports.logout = (req, res) => {
    const { authorization } = req.cookies;
    console.log(authorization)
    if(!authorization) {
        console.log("here")
        res.status(401).json({
            status: 401,
            message: "Not authorized"
        });
    }

    //clear the cookie by creating a new cookie with the exact same settings, but setting maxAge to somewhere in the past
    res.setHeader("Set-Cookie", serialize("authorization", null, {
        httpOnly: true, 
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        path: "/"
    }));

    res.status(200).json({
        status: 200,
        message: "Logged out"
    });
}