const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'sql7.freemysqlhosting.net' ,
  user: 'sql7343279',
  password: 'lm5ksRt97g',
  database: 'sql7343279'
});



db.connect( (err) =>{
  if(err){
      console.log(err);
  }else{
      console.log("connection établie")
  }
} );


//const cont = require('../controllers/auth');

router.post('/',(req, res) => {

  
  var nom = req.body.nom;
  var prenom = req.body.prenom;
  var adresse = req.body.adresse;
  var codePostal = req.body.codePostal;
  var Mail = req.body.mail;
  var password = req.body.password;
  



  /*
 const saltRounds = 10;
 const myPlaintextPassword = password;
 var h = '';

 bcrypt.genSalt(saltRounds, function(err, salt) {
   bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
       console.log(hash);
       h=hash;
   });
 });

*/


var rechsql = 'SELECT Mail from Utilisateurs';
var spotted = true;
db.query(rechsql, function (err, result, fields) {
  
  for(var i = 0;i<result.length;i++){
    if(result[i].Mail==Mail){
        spotted = false;
        /*
        res.status(400).json({
          status: 'error',
          error: 'email deja utilisé',
          message: 'error' 
        });*/
    }
}
if(spotted){

var sql = 'INSERT INTO Utilisateurs(Nom , Prenom , Adresse , CodePostal,Mail,password) VALUES ? ';
var values = [[nom,prenom,adresse,codePostal,Mail,password]];
db.query(sql,[values]);
//req.session.email = Mail;
var rechid = 'SELECT Id from Utilisateurs where Mail = "'+Mail+'"';
db.query(rechid, function (err, resu, fields) {
  console.log(resu);
if(resu == undefined){
  res.json({ message: 'erreur interne'});
}else{
  res.json({ message: 'inscription finie', id : resu[0].Id });
}
});

}else{
res.json({ message: 'error' });
}

})


});

module.exports = router;