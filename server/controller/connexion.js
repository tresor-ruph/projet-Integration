const co = require("../model/connexion.model");

exports.create = (req, res) =>{
    if(!req.body){
    res.status(400).send({
      message : "body cannot be empty",
    });
    }
  
    const con = {
      nom : req.body.nom,
      prenom : req.body.prenom,
      adresse : req.body.adresse,
      codePostal : req.body.codePostal,
      Mail : req.body.Mail,
      password : req.body.password,
    }
  
    co.create(con,(err, data) => {
      if(err)
      res.status(500).send({
        message : err.message || "some error occured while inserting values"
      })
      else res.send(data)
    })
  
  }

  exports.access = (req, res) =>{
    if(!req.body){
    res.status(400).send({
      message : "body cannot be empty",
    });
    }
  
    const cons = {
      Mail : req.body.Mail,
    }
  
    co.access(cons,(err, data) => {
      if(err)
      res.status(500).send({
        message : err.message || "some error occured while trying to log in"
      })
      else res.send(data)
    })
  
  }