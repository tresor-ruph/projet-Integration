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

exports.findOne =(req,res) => {
  contacts.findById(req.params.id, (err, data) => {
    if(err){
      res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.id

      })
    }else {
      res.header("Access-Control-Allow-Origin","*");
        res.send(data);
    }
  })
}

