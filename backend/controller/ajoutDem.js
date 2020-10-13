const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net' ,
    user: 'sql7343279',
    password: 'lm5ksRt97g',
    database: 'sql7343279'
});

exports.registerDem = (req,res) =>{
    console.log(req);
    const { idDemande , userId , Titre , Description, Statut } = req.body;
    db.query('INSERT INTO Utilisateurs (userId , Titre , Description, Statut) VALUES ?',[idDemande , userId , Titre , Description, Statut])

}