const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../expressError");

// Using the "static" keyword before the class methods in this class to indicate 
// that these methods are associated with the class itself rather than an instance
// of the class. This means I can call these methods directly on the class without
// having to create an instance
class User {

    /** Register a user with data
    *
    * Returns { username, firstName, lastName, email, isAdmin }
    *
    * Throws BadRequestError on duplicates
    */
    static async register({ firstName, lastName, username, password }) {
        const duplicateCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username]
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        };

        // The BCRYPT_WORK_FACTOR is the number of rounds the bcrypt algorithm
        // will execute when hashing the password
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await db.query(
            `INSERT INTO users
            (first_name, last_name, username, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [firstName, lastName, username, hashedPassword]
        );

        const user = result.rows[0];

        return user;
    };
};

module.exports = User;