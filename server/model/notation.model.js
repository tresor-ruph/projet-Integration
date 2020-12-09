const sql = require("./db");
const notation = function () {
   
  };
 

notation.access = (no, result) => {
    const rechsql = 'SELECT * from notation join utilisateurs  on notation.donneurId = utilisateurs.Id  where userId = ?';
    const values = [[no.id]];
    console.log(no.id);
    sql.query(rechsql,values, function (err, resu, fields) {
        console.log(resu);
      if(resu == undefined){
          result(null , { message: 'pas de demande a ce nom'});
      }else{
          result(null , { message: 'envoi des demandes', resultat : resu });
      }
      });
  }

  notation.ajout = (no, result) => {
    const rechsql = 'INSERT INTO notation(userId,donneurId,rating,idDemande) VALUES ('+no.id+','+no.donneurId+',3,'+no.idDemande+')';
    const values = [[no.id,no.donneurId,3,no.idDemande]];
    sql.query(rechsql,values, function (err, resu, fields) {
        console.log(err);
      
      });
  }

notation.rating = (rate, result) => {
    const rechsql = 'UPDATE notation SET rating = '+rate.rating+' , commentaire = "'+rate.commentaire+'" WHERE userId = '+rate.id+' AND donneurId = '+rate.donneurId+ ' AND idDemande = '+ rate.idDemande ;
    //const rechsql = 'INSERT INTO Notation(userId,idDemande,donneurId,rating) VALUES ?';
    console.log("passe ici");
    console.log(rate.commentaire);
    
    sql.query(rechsql, function (err, resu, fields) {
      console.log(err);
    
    });

  }


  module.exports = notation;