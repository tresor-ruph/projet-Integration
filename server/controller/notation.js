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

 