const sql = require("./db");

const user = function (user) {
  this.id = user.id;
};

user.findContacts = (result) => {
  sql.query("select * from Utilisateurs", (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(null, err)
      return;
    }
    console.log("contacts :", res)
    result(null, res);
  });
};

user.findById = (email, result) => {
  console.log(email)
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

  sql.query(
    `select * from ChatGroupUsers inner join ChatGroup on ChatGroup.Id = ChatGroupUsers.groupId where userId = ${Id}`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      console.log("group :", res);
      result(null, res);
    }
  );
};

user.findGroupUsersById = (Id, result) => {
  console.log(Id);

  sql.query(
    `select userId, groupId, Nom, Prenom, PhotoProfil,ownerId from 
    ChatGroupUsers join Utilisateurs join ChatGroup where ChatGroupUsers.userId = Utilisateurs.Id 
    and (ChatGroup.Id = ${Id} and ChatGroupUsers.groupId =${Id}) 
    `,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      console.log("group :", res);
      result(null, res);
    }
  );
};

user.createChat = (Chat, result) => {
  sql.query(`select * from Chat where senderId =${Chat.senderId} and recieverId =${Chat.recieverId} and roomId ="${ Chat.chatId}" and contact =${Chat.contact}`,
  ((err,res) => {
    if(err){
      result(null,err)
      return
    }else {
      if(res.length === 0){
        const req = "insert into Chat(senderId,recieverId,roomId,contact) values ?";
        const values = [[Chat.senderId, Chat.recieverId, Chat.chatId,Chat.contact]];
        sql.query(req, [values], (err,res) => {
          if(err) {
            console.log("error :", err);
            result(null, err)
            return
          }
          result(null, "Values inserted");
         
        });
      }else {
        result(null, "cette entre existe deja");
      }
      return result;
    }
  })
  )


};

user.createService = (serv, result) => {
 
  sql.query(`select * from Proposition where idDem =${serv.IdService} and idServeur=${serv.idOffreur} and idDemandeur=${serv.idDemandeur}`,
  ((err,res) => {
    if(err){
      result(null, err)
      return
    }else {
      if(res.length === 0){
      const req = "insert into Proposition(idDem,idServeur,idDemandeur) values ?";
      const values = [[serv.IdService, serv.idOffreur, serv.idDemandeur]];
      sql.query(req, [values], (err,res) => {
        if(err) {
          console.log("error :", err);
          result(null, err)
         
        }
        result(null, "Values inserted");
       
      });
    }else {
      result(null, "cette entre existe deja")
    }
    }
    return result
  }))
 

};

user.createGroup = (group, result) => {
  console.log(group)
  const req = "insert into ChatGroup(Id,ownerId,GroupName,GroupImage) values ?";
  
  const values = [[group.grpId, group.ownerId, group.Name, group.groupImage]];
  sql.query(req, [values], (err, res) => {
    if (err) {
      console.log("error :", err);
      result(null, err);
      return;
    } else {
     
      console.log(group.members)
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


user.addGroup = (group, result) => {
  console.log(group.users);
  group.users.forEach((elt) => {
    sql.query(
      `insert into ChatGroupUsers(userId, groupId) values 
    (${elt},${group.grpId})`,
      (err, res) => {
        if (err) {
          console.log("error :", err);
          result(null, err);
          return;
        }
        result(null, res);
      }
    );
  });
};

user.findRoom = (senderId, recieverId,verif, result) => {
  senderId = "'" + senderId + "'";
  recieverId = "'" + recieverId + "'";
  verif = "'" + verif + "'";
  console.log(senderId);
  
  console.log(verif);
  sql.query(
    `select roomId from Chat where ((senderId = ${senderId} and recieverId = ${recieverId}) or (senderId =${recieverId} and recieverId = ${senderId})) and contact= ${verif}`,
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

user.findConversRoom = (userId, result) => {
  console.log('bigbang')
  userId = "'" + userId + "'";
  
  sql.query(
    `select * from Chat join Utilisateurs join Demande where Chat.recieverId = Utilisateurs.Id and contact != -1 and (senderId =${userId} or recieverId =${userId}) and Chat.contact = Demande.idDemande `,
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




user.leaveGroup = (id, result) => {
  sql.query(`delete from ChatGroupUsers where userId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user from group with id: ", id);
    result(null, res);
  });
};

user.removeGroup = (id, result) => {
  sql.query(`delete from ChatGroupUsers where groupId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }
    sql.query(`delete from ChatGroup where Id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
    });

    console.log("deleted group with id: ", id);
    result(null, res);
  });
};

module.exports = user;
