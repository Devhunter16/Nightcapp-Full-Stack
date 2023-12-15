// Need to look at this and configure it, may need to name the file "auth"
const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/register", async function (req, res, next) {
    console.log("Registering a user in userRoutes.js");

    try {
        const writeObj = { ...req.body };
        // const validator = jsonschema.validate(writeObj, userRegisterSchema);
        // if (validator.errors.length != 0) {
        // const errs = validator.errors.map((e) => e.stack);
        // throw new BadRequestError(errs);
        // }

        const newUser = await User.register(writeObj);
        // const token = createToken(newUser);
        console.log("New user: ", newUser);
        return res.status(201).json({ user: newUser });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;