const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net' ,
    user: 'sql7343279',
    password: 'lm5ksRt97g',
    database: 'sql7343279'
});


exports.register = (req,res) =>{
    console.log(req);
<<<<<<< HEAD:backend/controller/auth.js
    const { nom , prenom , adresse , codePostal } = req.body;
    db.query('INSERT INTO Utilisateurs (Nom , Prenom , Adresse , CodePostal) VALUES ?',[nom,prenom,adresse,codePostal])
=======

    //const { nom , prenom , adresse , codePostal } = req.body;
   // db.query('INSERT INTO Utilisateurs (Nom , Prenom , Adresse , CodePostal) VALUES ?',[nom,prenom,adresse,codePostal])


    //const { nom , email , password } = req.body;
    //db.query('SELECT...')
>>>>>>> 007f35d704583775592c5ab655ac89fa9cca126a:backend/controllers/auth.js
}