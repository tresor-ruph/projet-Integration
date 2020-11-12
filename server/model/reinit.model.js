const sql = require('./db');
const rein ="require('../model/reinit.model')"
const reinitmdp = function () {
  this.mail= reinitmdp.mail
  };


  reinitmdp.cibleUser= (mail,result) => {
    sql.query(`select * from RepSec inner join Utilisateurs on RepSec.Mail=Utilisateurs.Mail WHERE Mail = ${mail}` , (err,res) => {
      if(err) {
          console.log("error : ", err);
          result (null ,err);
          return;
      }
          console.log("contacts :" , res);
          result (null, res);
          
  });
}

  
  reinitmdp.findQuestion=(mail,result) =>{
  sql.query(`select * from RepSec inner join Utilisateurs on RepSec.Mail=Utilisateurs.Mail WHERE Mail = ${mail}` , (err,res) => {
    if(err) {
        console.log("error : ", err);
        result (null ,err);
        return;
    }
        console.log("contacts :" , res);
        result (null, res);
        
});
}

module.exports = reinitmdp;


