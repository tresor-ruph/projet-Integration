const contacts = require('./../model/user.model')

// find a all contacts

exports.findAll = (req,res) => {
contacts.findContacts( (err, data) => {
    if (err) {
          res.status(500).send({
            message: "Error retrieving * users "
          });
        }
       else {
        res.header("Access-Control-Allow-Origin","*");
        res.send(data);
      }
});
};

exports.findOne = (req, res) => {
  contacts.findById(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId
        });
      }
    } else{
      res.header("Access-Control-Allow-Origin", "*")
       res.send(data);
    }
  });
};
