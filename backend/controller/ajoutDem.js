const demande = require('../model/demande.model');


const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net' ,
    user: 'sql7343279',
    password: 'lm5ksRt97g',
    database: 'sql7343279'
});


// find a all contacts

exports.findAll = (req,res) => {
  console.log('test1')
  demande.findDemande( (err, data) => {
      if (err) {
            res.status(500).send({
              message: "Error retrieving * demande "
            });
          }
        else {
          res.header("Access-Control-Allow-Origin","*");
          res.send(data);
        }
  });
};

exports.registerDem = (req,res) =>{
    console.log(req);
    const { idDemande , userName , description, statut } = req.body;
    db.query('INSERT INTO Demande (idDemande , UserName , Categorie, Descriptif) VALUES ?',[idDemande , userName , description, statut])
};


exports.create = (req, res) => {
  const demande3 = {
    idDemande: req.body.idDemande,
    userName: req.body.userName,
    descriptif: req.body.descriptif,
    categorie: req.body.categorie
  };
  demande.createDemande(demande3)( (err, data) => {
    if (err) {
          res.status(500).send({
            message: "Error creating demande "
          });
        }
      else {
        res.header("Access-Control-Allow-Origin","*");
        res.send(data);
      }
});
}