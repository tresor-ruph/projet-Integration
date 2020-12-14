const notif = require("../model/notif.model");

exports.findOneToken = (req, res) => {
    notif.findToken(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user with id " + req.params.id,
          });
        }
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(data);
      }
    });
  };