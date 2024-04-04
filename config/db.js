const mysql = require("mysql2/promise");

const mySqlPool = mysql.createPool({
    host:'localhost',
    user: 'root',
    password:'Mohan@96!',
    database: 'students_db'
})

module.exports = mySqlPool;