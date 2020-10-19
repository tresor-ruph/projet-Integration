const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net' ,
    user: 'sql7343279',
    password: 'lm5ksRt97g',
    database: 'sql7343279'
});

exports.registerDem = (req,res) =>{
    console.log(req);
    const { idDemande , userName , description, statut } = req.body;
    db.query('INSERT INTO Demande (idDemande , UserName , Categorie, Descriptif) VALUES ?',[idDemande , userName , description, statut])

}