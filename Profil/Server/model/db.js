const mysql = require("mysql");
const dbConfig = require("./../config/db.config");

var connection

function handleDisconnect() {
    connection = mysql.createConnection({
        host : dbConfig.HOST,
        user : dbConfig.USER,
        password : dbConfig.PASSWORD,
        database : dbConfig.DB
    });

    connection.connect(function(err) {              
      if(err) {                                    
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }
      else 
      console.log("Connected !");                                    
    });  
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
  
handleDisconnect();

 module.exports = connection;