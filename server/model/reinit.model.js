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
  }
    
   
  




module.exports = reinitmdp;


