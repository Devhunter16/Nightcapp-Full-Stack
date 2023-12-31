const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../expressError");

// Using the "static" keyword before the class methods in this class to indicate 
// that these methods are associated with the class itself rather than an instance
// of the class. This means I can call these methods directly on the class without
// having to create an instance
class User {

    // Finds a user in the database upon login and authenticates the login creds
    static async login(username, password) {

        const result = await db.query(
            `SELECT first_name as name,
                username, 
                password
                FROM users
                WHERE username = $1`,
            [username]
        );

        const user = result.rows[0];

        if (user) {
            // Compares hashed password to password entered in login form
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                return user;
            };
        };
        throw new UnauthorizedError("Invalid username/password");
    };

    // Register a user with data
    static async register({ firstName, lastName, username, password }) {
        try {
            // Check for duplicate username
            const duplicateCheck = await db.query(
                `SELECT username
                FROM users
                WHERE username = $1`,
                [username]
            );

            if (duplicateCheck.rows[0]) {
                throw new BadRequestError(`Duplicate username: ${username}`);
            };

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Insert user into the database
            const result = await db.query(
                `INSERT INTO users
                (first_name, last_name, username, password)
                VALUES ($1, $2, $3, $4)
                RETURNING *`,
                [firstName, lastName, username, hashedPassword]
            );

            const user = result.rows[0];

            return user;
        } catch (error) {
            // Handle registration errors
            throw new BadRequestError(`Registration failed: ${error.message}`);
        };
    };
};

module.exports = User;