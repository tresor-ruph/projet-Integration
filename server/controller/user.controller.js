/* eslint-disable quotes */
const appUser = require("../model/user.model");

// find a all appUser
module.exports = {

  findAll: (req, res) => {
    appUser.findUsers((err, data) => {
      if (err) {
        res.status(500).send({
          message: "Error retrieving * users ",
        });
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200);
        res.send(data);
      }
    });
  },

  findOne: (req, res) => {
    const idt = req.params.id;
    appUser.findById(idt, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${idt}.`,
          });
        } else {
          res.status(500).send({
            message: "internal server error ",
          });
        }
      } 
      if(!data.length){
        res.status(404).send('user with the provided id not found')
      }
      else {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200);
        res.send(data);
      }
    });
  },

  update: (req, res) => {
  // update the user data
    appUser.updateUser(req.body, (err, data) => {
      if (err) throw err;
      else {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(data);
      }
    });
  },

  updateEmail: (req, res) => {
    let email = req.params.email;
    // update the user data
      appUser.validationEmail(email, (err, data) => {
        if (err) throw err;
        else {
          res.header("Access-Control-Allow-Origin", "*");
          res.status(200).json(data);
        }
      });
  },
  suppCompte: (req, res) => {
    let email = req.params.email;//à verif
    appUser.suppCompte(email, (err, data) => {
      if (err) throw err;
      else {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(data);
      }
    });
  },
  findMM: (req, res) => {
    const mail = req.params.mail;
    appUser.findMailMdp(mail, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with mail ${mail}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user ",
          });
        }
      } 
      else {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200);
        res.send(data);
      }
    });
  }
};