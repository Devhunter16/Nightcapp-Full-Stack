// Need to look at this and configure it, may need to name the file "auth"
const express = require("express");
const router = express.Router();

const { createToken } = require("../helpers/tokens");

const User = require("../models/user");

router.post("/login", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.login(username, password);
        const token = createToken(user);
        return res.json({ token });
    } catch (err) {
        return next(err);
    };
});

router.post("/register", async function (req, res, next) {
    try {
        const data = { ...req.body };
        const newUser = await User.register(data);
        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;