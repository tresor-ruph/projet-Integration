const demande = require('../model/demande.model')
const sql = require('../model/db');
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

exports.create = (req, res) => {
  const demande3 = {
    userName: req.body.userName,
    descriptif: req.body.descriptif,
    categorie: req.body.categorie
  };
  demande.createDemande(demande3, (err, data) => {
    console.log(data)
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