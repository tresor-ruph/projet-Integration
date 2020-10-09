const sql = require('./db');

const user = function(user) {
    this.id = user.id
}

user.findById = (id , result) => {
    sql.query(`select * from Utilisateurs where Id = ${id}` , (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
        if(res.length){
            console.log("user :" , res);
            result (null, res);
            return;

        }
          result({kind : "not_found"},null);
    });
};

module.exports = user;