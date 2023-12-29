// Need to look at this and configure it, may need to name the file "auth"
const express = require("express");
const router = express.Router();

const { createToken } = require("../helpers/tokens");

const User = require("../models/user");

router.post("/login", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        // const validator = jsonschema.validate(writeObj, userRegisterSchema);
        // if (validator.errors.length != 0) {
        // const errs = validator.errors.map((e) => e.stack);
        // throw new BadRequestError(errs);
        // }

        const user = await User.login(username, password);
        // FIXME CHECK THIS OUT
        const token = createToken(user);
        console.log("token in userRoutes /login: ", token);
        return res.json({ token });
    } catch (err) {
        return next(err);
    };
});

router.post("/register", async function (req, res, next) {
    try {
        const data = { ...req.body };
        // const validator = jsonschema.validate(writeObj, userRegisterSchema);
        // if (validator.errors.length != 0) {
        // const errs = validator.errors.map((e) => e.stack);
        // throw new BadRequestError(errs);
        // }

        const newUser = await User.register(data);
        const token = createToken(newUser);
        console.log("token in userRoutes /register: ", token);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;