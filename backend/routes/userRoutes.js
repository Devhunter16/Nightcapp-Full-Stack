// Need to look at this and configure it, may need to name the file "auth"
const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/login", async function (req, res, next) {
    console.log("Logging a user in in userRoutes.js");

    try {
        const { username, password } = req.body;
        // const validator = jsonschema.validate(writeObj, userRegisterSchema);
        // if (validator.errors.length != 0) {
        // const errs = validator.errors.map((e) => e.stack);
        // throw new BadRequestError(errs);
        // }

        const user = await User.login(username, password);
        // const token = createToken(newUser);
        console.log("User: ", user);
        return res.status(201).json({ user: user });
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
        // const token = createToken(newUser);
        console.log("New user: ", newUser);
        return res.status(201).json({ user: newUser });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;