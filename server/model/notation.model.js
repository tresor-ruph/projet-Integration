const sql = require("./db");
const notation = function () {
   
  };
 

notation.access = (no, result) => {
    const rechsql = 'SELECT * from Notation join Utilisateurs  on Notation.donneurId = Utilisateurs.Id  where userId = '+no.id;
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
  notation.rating = (rate, result) => {
    const rechsql = 'UPDATE Notation SET rating = '+rate.rating+' WHERE userId = '+rate.id+' AND donneurId = '+rate.donneurId;
    //const rechsql = 'INSERT INTO Notation(userId,idDemande,donneurId,rating) VALUES ?';
    const values = [[rate.id,rate.donneurId,rate.rating]];
    sql.query(rechsql);
  }


  module.exports = notation;