const sql = require('./db');

const user = function(user) {
    this.id = user.id
}

user.findById = (id , result) => {
    sql.query(`select * from Utilisateurs where Id = ${id}` , (err,res) => {
        if(err) {
            console.log("error : ", err);
            result = (err ,null);
            return;
        }
        if(res.length){
            console.log("found customer:", res[0])
            result = (null , res[0]);
            return;
        }
        result({kind : "not_found"},null);
    });
};

module.exports = user;