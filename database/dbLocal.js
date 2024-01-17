const {Pool} = require('pg');
require('dotenv').config()
//Connect to the local db
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.connect()

module.exports = { pool };