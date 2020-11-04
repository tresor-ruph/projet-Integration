const mysql = require('mysql');
const dbConfig = require("./../config/db.config");

const connection = mysql.createConnection({
    host : dbConfig.HOST,
    user : dbConfig.USER,
    password : dbConfig.PASSWORD,
    database : dbConfig.DB
});

connection.connect(error => {
    if(error) {console.log('impossible de se connecter à la db')}
    else{
    console.log("successfully connected to database.")}
})

 module.exports = connection;