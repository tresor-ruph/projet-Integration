const mysql = require("mysql");
const dbConfig = require("./../config/db.config");


const pool = mysql.createPool({
    connectionLimit: 50,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
  });


module.exports = pool;