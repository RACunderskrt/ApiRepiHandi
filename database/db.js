const {Pool} = require('pg');
require('dotenv').config()
//Connect to the db on the server
const pool = new Pool({
    connectionString: process.env.DB_LINK,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()

module.exports = { pool };