const sql = require('./db');


const reinitmdp = function () {
  this.mail= reinitmdp.mail
  };


  reinitmdp.cibleUser= (mail,result) => {
    let email='"' + mail + '"'
    sql.query(`SELECT * from repsec inner join utilisateurs on repsec.Mail=utilisateurs.Mail WHERE repsec.Mail = ${email}` , (err,res) => {
          if(err) {
          console.log("error : ", err);
          result (null ,err);
          return;
          }
          console.log("donnees :" , res);
          result (null, res);
          
    });
}

  
  reinitmdp.findAllUsers=(result)=>{
    sql.query('SELECT Mail FROM utilisateurs', (err,res)=>{
      if(err) {
        console.log("error : ", err);
        result (null ,err);
        return;
        }
        console.log("donnees :" , res);
        result (null, res);
        
  });
  },

  reinitmdp.pushDonnees = (User, result) => {
    let bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(User.reponseSec, salt, function(err, hash) {
    var requete = "INSERT INTO repsec(Mail, QuestionValue, Repsecrete) VALUES ? ";
    var values = [[User.mail , User.question, hash]];
    console.log(User.reponseSec)
    sql.query(requete, [values],
      (err, res) => {
        if (err) {
          console.log("error : ", err);
          result(null, err);
          return;
        }
        console.log("Enrégistré");
        result(null, res);

          });
    
        });
    
      })
  }
  

 


  /*reinitmdp.resetPassword=(newData, result) => {
    
    const motdep = newData.motdepasse;
    const addmail = `'${newData.email}'`;

    let rechsql = `SELECT * from repsec where Mail = ${addmail}`;
    sql.query(rechsql, function (err, res) {
      console.log(res);
      console.log(err);
      console.log('1')
    })

    console.log(motdep);
    let bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newData.motdepasse, salt, function(err, hash) {
    sql.query(`Update utilisateurs set password = '${hash}' where Mail= ${addmail}`,
      (err, res) => {
        if (err) {
          console.log("error : ", err);
          result(null, err);
          return;
        }
        console.log("mot de passe modifié");
        result(null, res);
      });
    
     });

   });
} */

reinitmdp.resetPassword=(newData, result) => {
    
  const motdep = newData.motdepasse;
  const addmail = `'${newData.email}'`;
  
    
  let rechsql = `SELECT * from repsec where Mail = ${addmail}`;
  sql.query(rechsql, function (err, resul) {
      console.log(resul);
      console.log(err);
  if(resul == undefined || resul[0] == undefined){
  result(null , {message:'erreur de repsec'});
  }
  else{
    var bcrypt = require('bcryptjs');
    bcrypt.compare(newData.reponsesecrete, resul[0].Repsecrete, function(err, re) {
      console.log(re);
      console.log(err);
      console.log(newData.reponsesecrete)
      if(re){
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(motdep, salt, function(err, hash) {
          sql.query(`Update utilisateurs set password = '${hash}' where Mail= ${addmail}`,
            (err, res) => {
              if (err) {
                console.log("error : ", err);
                result(null, err);
                return;
              }
            console.log("mot de passe modifié");
            result(null, res);
          });
        
         });
        
        });
        result(null , {message:'Reussi'});
      }else{
        result(null , {message:'erreur de réponse secrète'});
      }
    });
  }
})
}
   
  




module.exports = reinitmdp;


