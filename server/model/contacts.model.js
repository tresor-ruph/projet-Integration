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

user.findGroupById = (Id, result) => {
console.log(Id);

  sql.query(`select * from ChatGroupUsers inner join ChatGroup on ChatGroup.Id = ChatGroupUsers.groupId where userId = ${Id}`, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(null, err);
      return;
    }
    console.log("group :", res);
    result(null, res);
  });
};

user.createChat = (Chat, result) => {
  const req = "insert into ChatGroup(ownerId,GroupName,GroupImage) values ?";
  const values = [[Chat.senderId, Chat.recieverId, Chat.chatId]];
  sql.query(req, [values]);
  result(null, "Values inserted");
};

user.createGroup = (group, result) => {
  console.log('test key')
  console.log(group.grpId)
  const req = "insert into ChatGroup(Id,ownerId,GroupName,GroupImage) values ?";
  
  const values = [[group.grpId, group.ownerId, group.Name, group.groupImage]];
  sql.query(req, [values], (err, res) => {
    if (err) {
      console.log("error :", err);
      result(null, err);
      return;
    } else {
      group.members.forEach((element) => {
        sql.query(
          `insert into ChatGroupUsers(userId,groupId) values
      (${element},${group.grpId})`,
          (err, res) => {
            if (err) {
              console.log("error :", err);
              result(null, err);
              return;
            }
          }
        );
      });
      sql.query(`insert into ChatGroupUsers(userId,groupId) values (${group.ownerId},${group.grpId})`)
    }
  });
};

user.findRoom = (senderId, recieverId, result) => {
  senderId = "'" + senderId + "'";
  recieverId = "'" + recieverId + "'";
  console.log(senderId);
  console.log(recieverId);
  sql.query(
    `select roomId from Chat where (senderId = ${senderId} and recieverId = ${recieverId}) or (senderId =${recieverId} and recieverId = ${senderId}) `,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      console.log("contacts :", res);
      result(null, res);
    }
  );
};

module.exports = user;




