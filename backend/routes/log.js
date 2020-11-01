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
    
    var password = req.body.password;
    var Mail = req.body.mail;

    
    
    var sql = 'SELECT * from Utilisateurs where Mail = "'+Mail+'"';
    db.query(sql, function (err, result, fields) {
if(result[0] == undefined){
  res.json({message: 'erreur'});
}else{
      
/*
bcrypt.compare(result[0].password, password, function(err, re) {
  console.log(result[0].password);
  console.log(re);
  
  */

      //if(re){
        //req.body.session = Mail;
        //req.session.email = Mail;
        //console.log(req.session);
        
        res.json({message: "entrée dans l'appli" , id : result[0].Id, hash: result[0].password});
        //return res.redirect(307,'/appli');
      //}else{
        //res.json({message: 'erreur'});
      //}
    
//});

}
  })
  });
  module.exports = router;