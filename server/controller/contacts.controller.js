const contacts = require("../model/contacts.model");


// find a all contacts
exports.findAll = (req, res) => {
  contacts.findContacts((err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving * users ",
      });
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  contacts.findById(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with email ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with email " + req.params.email,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};

exports.findRoom = (req, res) => {
  console.log(req.params)
  contacts.findRoom(req.params.senderId, req.params.recieverId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with email ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving room with senderId " + req.params.senderId,
        });
      }
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    }
  });
};



exports.createChat = (req, res) =>{
  if(!req.body){
  res.status(400).send({
    message : "body cannot be empty",
  });
  }

  const chat = {
    senderId : req.body.senderId,
    recieverId : req.body.recieverId,
    chatId : req.body.chatId,
  }

  contacts.createChat(chat,(err, data) => {
    if(err)
    res.status(500).send({
      message : err.message || "some error occured while creating chatId"
    })
    else res.send(data)
  })

}
