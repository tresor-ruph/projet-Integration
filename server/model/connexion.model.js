const sql = require("./db");
const connexion = function () {
   
  };
 

connexion.create = (con, result) => {
    let rechsql = 'SELECT Mail from Utilisateurs';
let spotted = true;
sql.query(rechsql, (err, res)=> {
  
  for(let i = 0;i<res.length;i++){
    if(res[i].Mail==con.Mail){
        spotted = false;
        
    }
}
if(spotted){
  let bcrypt = require('bcryptjs');
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(con.password, salt, function(err, hash) {
  //insert into Notation(userId,idDemande,donneurId,rating) values(172,69,203,9);
    const req = 'INSERT INTO Utilisateurs(Nom , Prenom , Adresse , CodePostal,Mail,password) VALUES ? ';
    const values = [[con.nom,con.prenom,con.adresse,con.codePostal,con.Mail,hash]];
    sql.query(req , [values] ,function (err, resu, fields) {
      let rechid = 'SELECT Id from Utilisateurs where Mail = "'+con.Mail+'"';
      sql.query(rechid, function (err, resu, fields) {
        console.log(resu);
      if(resu == undefined){
          result(null , { message: 'erreur interne'});
      }else{
          result(null , { message: 'inscription finie', id : resu[0].Id });
      }
      });
    })
  });
});
    


}else{
    result(null , { message: 'error'});
}

})



    //result(null , 'Values inserted')


  }



connexion.access = (cons, result) => {
console.log(cons.Mail);
    let rechsql = 'SELECT * from Utilisateurs where Mail = "'+cons.Mail+'"';
    sql.query(rechsql, function (err, res) {
        console.log(res);
if(res == undefined || res[0] == undefined){
    result(null , {message:'erreur de mail'});
}else{
  var bcrypt = require('bcryptjs');
  bcrypt.compare(cons.password, res[0].password, function(err, re) {
    console.log(re);
    console.log(err);
    if(re){
    result(null , {message: "entrée dans l'appli" , id : res[0].Id});
    }else{
      result(null , {message:'erreur de mot de passe'});
    }
  });
}
  })


}
  module.exports = connexion;