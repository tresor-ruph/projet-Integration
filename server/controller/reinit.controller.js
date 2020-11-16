
const sql = require('../model/db');
const reinitmdp = require('../model/reinit.model');

exports.cibleUser = (req, res) => {
  console.log(req.params)
    reinitmdp.cibleUser(req.params.mail, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Mail inconnu : ${req.params.mail}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving reinit with mail " + req.params.mail,
          });
        }
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(data);
      }
    });

  };

  exports.findAllUsers = (req, res) => {
    console.log(req.params)
      reinitmdp.findAllUsers( (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
            });
          } else {
            res.status(500).send({
              
            });
          }
        } else {
          res.header("Access-Control-Allow-Origin", "*");
          res.send(data);
        }
      });
  
    };
  


 