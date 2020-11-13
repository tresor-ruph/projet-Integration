const note = require("../model/notation.model");

exports.access = (req, res) =>{
    if(!req.body){
    res.status(400).send({
      message : "body cannot be empty",
    });
    }
  
    const no = {
      id : req.body.Id
    }
  
    note.access(no,(err, data) => {
      if(err)
      res.status(500).send({
        message : err.message || "some error occured while inserting values"
      })
      else res.send(data)
    })
  
  }

  exports.rating = (req, res) =>{
    if(!req.body){
    res.status(400).send({
      message : "body cannot be empty",
    });
    }
  
    const rate = {
      id : req.body.Id,
      donneurId : req.body.donneurId,
      idDemande : req.body.idDemande,
      rating : req.body.rating,
      commentaire : req.body.commentaire

    }
  
    note.rating(rate,(err, data) => {
      if(err)
      res.status(500).send({
        message : err.message || "some error occured while inserting values"
      })
      else res.send(data)
    })
  
  }
 