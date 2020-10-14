const sql = require('./db');

const user = function(user) {
    this.id = user.id
}

user.findContacts = ( result) => {
    sql.query("select * from Utilisateurs"  , (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
            
    });
};

user.findById = (name,result) => {

    sql.query(`SELECT * FROM Utilisateurs WHERE Nom = ${name}`, (err, res) =>{
    if(err){
        console.log("error : ", err)
        result(null , err);
        return;
    }
    console.log("contacts :", res);
    result(null, res);
});
}

module.exports = user;