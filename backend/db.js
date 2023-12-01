const { Client } = require('pg')
require('dotenv').config();

const db = new Client({
    user: process.env.DB_USER,
    host: "localhost",
    database: "nightcapp",
    password: process.env.DB_PASSWORD,
    port: process.env.DEV_PORT,
});

db.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Error connecting to the database', err));

module.exports = db;