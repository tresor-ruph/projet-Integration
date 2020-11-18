const sql = require('./db');


const reinitmdp = function () {
  this.mail= reinitmdp.mail
  };


  reinitmdp.cibleUser= (mail,result) => {
    let email='"' + mail + '"'
    sql.query(`SELECT * from Repsec inner join Utilisateurs on Repsec.Mail=Utilisateurs.Mail WHERE Repsec.Mail = ${email}` , (err,res) => {
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
    sql.query('SELECT Mail FROM Utilisateurs', (err,res)=>{
      if(err) {
        console.log("error : ", err);
        result (null ,err);
        return;
        }
        console.log("donnees :" , res);
        result (null, res);
        
  });
  },

  reinitmdp.resetPassword=(newData, result) => {
    
    const motdep = `'${newData.motdepasse}'`;
    const addmail = `'${newData.email}'`;

    console.log(newData);
    sql.query(`Update Utilisateurs set password = ${motdep} where Mail= ${addmail}`,
      (err, res) => {
        if (err) {
          console.log("error : ", err);
          result(null, err);
          return;
        }
        console.log("mot de passe modifié");
        result(null, res);
      });
  }
   
  




module.exports = reinitmdp;


