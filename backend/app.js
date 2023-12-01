// Helps enforce a stricter set of rules and coding standards in this file
"use strict";

/** Express app for nightcapp */
const express = require("express");
// CORS is important because it enforces same-origin policy which is a security 
// measure that prevents a malicious script from accessing resources that it should
// not have access to
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;