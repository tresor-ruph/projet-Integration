const sql = require("./db");
const connexion = function () {
   
  };
 
  
connexion.create = (con, result) => {
  let rechsql = 'SELECT Mail from utilisateursattente';
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
    const req = 'INSERT INTO utilisateursattente(Nom , Prenom , Adresse , CodePostal,Mail,password, emailVerif, nombre) VALUES ? ';
    const values = [[con.nom,con.prenom,con.adresse,con.codePostal,con.Mail,hash, false, con.nombre]];
    sql.query(req , [values] ,function (err, resu, fields) {
      let rechid = 'SELECT Id from utilisateursattente where Mail = "'+con.Mail+'"';
      sql.query(rechid, function (err, resu, fields) {
        console.log(resu);
        if(resu == undefined){
          result(null , { message: 'erreur interne'});
        }else{
          const nodemailer = require("nodemailer");

          let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "HelpRecover2020@gmail.com",
              pass: "gK6p2wm!d"
            },
          });
      
          var jwt = require('jsonwebtoken');
          var token = jwt.sign(
            {
              data: con.Mail
            }, '8376806802b688bf4d8ab6dc2762d91e',
             { expiresIn: '1000h' });
          

          let mailOptions = { 
            from: '"HelpRecover" <HelpRecover2020@gmail.com>', 
            to: "inconnu12345612@gmail.com", 
            subject: "Vérification email", 
            text: "Vérifiez votre email", 
            html: `<b>Vérifiez votre email : <a href='http://localhost:3000/emailVerif/${token}'>Cliquez ici pour confirmer votre inscription.</a></b>`,
          };
      
          try {
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              //console.log("Message sent: %s", info.messageId);
              //console.log(req.body);
            })
          }
          catch(error) {
            console.error(error);
          }
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
      let rechsql = 'SELECT * from utilisateurs where Mail = "'+cons.Mail+'"';
      sql.query(rechsql, function (err, res) {
          console.log(res);
          console.log(err);
  if(res == undefined || res[0] == undefined){
      result(null , {message:'erreur de mail'});
  }
  else{
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