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





router.post('/',(req,res)=>{
    var sql = 'SELECT * from Utilisateurs where id = "'+req.body.id+'"';
    db.query(sql, function (err, result, fields) {
      if(result[0] == undefined){
        res.json({message: 'erreur'});
      }else{
          if(req.body.id){
            res.json({ message: "entrée dans l'appli" , utilisateur: result[0].Mail });
          }else{
            res.json({ message: "vous n'êtes pas autorisé à etre ici" });
          }
  }});

  });
  module.exports = router;