const demande = require('../model/demande.model')
const sql = require('../model/db');
// find a all contacts

exports.findAll = (req,res) => {
  console.log('test1')
  demande.findDemande(req.params.id, (err, data) => {
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

exports.findAllAttente = (req,res) => {
  demande.findAttente((err, data) => {
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

exports.delete = (req, res) => {
  demande.supprimerDemande(req.params.idDemande, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.body.idDemande}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.body.idDemande
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

exports.deletePropos = (req, res) => {
  demande.supprimerPropos(req.params.idProposition, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.body.idProposition}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.body.idProposition
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

exports.deleteProposA = (req, res) => {
  demande.supprimerProposA(req.params.idProposition, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.body.idProposition}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.body.idProposition
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};


exports.findOne = (req, res) => {
  demande.findDemandeFilter(req.params.categorie, req.params.codeP, (err, data) => {
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

exports.findOneCat = (req, res) => {
  demande.findDemandeFilterT(req.params.categorie, (err, data) => {
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

exports.findOneCode = (req, res) => {
  demande.findDemandeFilterCode(req.params.codeP, (err, data) => {
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

exports.findPropo = (req, res) => {
  demande.findProposition(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found demande with categorie ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving demande with categorie " + req.params.id,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.findPropoA = (req, res) => {
  demande.findPropositionA(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found demande with categorie ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving demande with categorie " + req.params.id,
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
          message: `Not found demande with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving demande with id " + req.params.userId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.findDescri = (req, res) => {
  demande.findDemandeDescriptif(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found demande with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving demande with id " + req.params.userId,
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

exports.createPropos = (req, res) => {
  const propos = {
    idServeur: req.body.idServeur,
    idDemande: req.body.idDemande,
    idDemandeur: req.body.idDemandeur
  };
  demande.confPropo(propos, (err, data) => {
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