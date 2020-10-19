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

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const customer = new Customer({
    userName: req.body.username,
    password: req.body.password,
  });

  // Save Customer in the database
  contacts.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
}
