const sql = require("./db");

const user = function (user) {
  this.id = user.id;
};

user.findContacts = (result) => {
  sql.query("select * from Utilisateurs", (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(null, err);
      return;
    }
    console.log("contacts :", res);
    result(null, res);
  });
};

user.findById = (email, result) => {
  email = "'" + email + "'";

  sql.query(`SELECT * FROM Utilisateurs WHERE Mail = ${email}`, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(null, err);
      return;
    }
    console.log("contacts :", res);
    result(null, res);
  });
};


user.createChat = (Chat, result) => {
  const req ="insert into Chat(senderId,recieverId,roomId) values ?";
  const values = [[Chat.senderId, Chat.recieverId, Chat.chatId]]
  sql.query(req , [values])
  result(null , 'Values inserted')
}

user.findRoom = (senderId, recieverId, result) => {
  senderId = "'" + senderId + "'";
  recieverId = "'" + recieverId + "'";
  console.log(senderId)
  console.log(recieverId)


  sql.query(`select roomId from Chat where (senderId = ${senderId} and recieverId = ${recieverId}) or (senderId =${recieverId} and recieverId = ${senderId}) `, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(null, err);
      return;
    }
    console.log("contacts :", res);
    result(null, res);
  });

}

module.exports = user;
