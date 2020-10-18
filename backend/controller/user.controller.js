const contacts = require('../model/user.model')

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

