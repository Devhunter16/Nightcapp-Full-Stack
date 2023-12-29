const jwt = require("jsonwebtoken");

/** Return signed JWT from user data */

const createToken = (user) => {
    SECRET_KEY = process.env.SECRET_KEY;

    let payload = {
        username: user.username
    };

    console.log("Payload from createToken() in token.js:", payload)
    return jwt.sign(payload, SECRET_KEY);
};

/** Return payload from token */

const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

module.exports = { createToken, verifyToken };