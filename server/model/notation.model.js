const sql = require("./db");
const notation = function () {
   
  };
 

notation.access = (no, result) => {
    const rechsql = 'SELECT * from Demande where userId = '+no.id;
    const values = [[no.id]];
    sql.query(rechsql, function (err, resu, fields) {
        console.log(resu);
      if(resu == undefined){
          result(null , { message: 'pas de demande a ce nom'});
      }else{
          result(null , { message: 'envoi des demandes', resultat : resu });
      }
      });
  }



  module.exports = notation;