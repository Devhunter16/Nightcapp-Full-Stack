const { Client } = require('pg');
require('dotenv').config();

const db = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_ENDPOINT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false // For testing purposes I set this to false
    },
    connectionTimeoutMillis: 5000 // Set connection timeout
});

db.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Error connecting to the database:', err.stack));

module.exports = db;