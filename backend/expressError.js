/** 
 * The code in this file defines a set of custom error classes that can be used in 
 * this Express.js application for handling different HTTP error statuses
 *
 */

class ExpressError extends Error {
    constructor(message, statusCode) {
        // The super() line calls the constructor of the parent class. This is 
        // necessary because when you extend a class in JavaScript, the child class
        // constructor needs to call the constructor of the parent class to set up
        // the object correctly
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
};

/** 400 Bad Request error - The server cannot or will not process the request due to something that is perceived to be a client error */

class BadRequestError extends ExpressError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
};

/** 404 Not Found error - The server could not find requested resource */

class NotFoundError extends ExpressError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
};

/** 401 Unauthorized error - The request lacks valid authentication credentials */

class UnauthorizedError extends ExpressError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
};

/** 403 Forbidden Error - The server understood the request, but refuses to authorize it */

class ForbiddenError extends ExpressError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
};

module.exports = {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError,
};
