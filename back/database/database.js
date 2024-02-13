const mysql = require('mysql2');
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PWD,
    database: process.env.BD_DTB,
    port: process.env.BD_PORT,
})

module.exports = { pool: pool.promise() };