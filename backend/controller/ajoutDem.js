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


exports.findOne = (req, res) => {
  demande.findDemandeFilter(req.params.categorie, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found demande with categorie ${req.params.categorie}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving demande with categorie " + req.params.categorie,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.findOneUI = (req, res) => {
  demande.findDemandeFilterU(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found demande with categorie ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving demande with categorie " + req.params.userId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};


exports.create = (req, res) => {
  const demande3 = {
    descriptif: req.body.descriptif,
    categorie: req.body.categorie,
    userId: req.body.userId
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