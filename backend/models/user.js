const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../expressError");

class User {
    // Using the "static" keyword here before the class methods to indicate that
    // these methods are associated with the class itself rather than an instance of
    // the class. This means I can cal these methods directly on the class without
    // having to create an instance
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
        const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_WORK_FACTOR);

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