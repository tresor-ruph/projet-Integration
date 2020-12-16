const sql = require("./db");

const notif = function (notif) {
  this.id = notif.id;
};

notif.findToken= (id, result) => {
    sql.query(`select tokenNotif from Utilisateurs WHERE Id = ${id}`, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err)
        return;
      }
      console.log("Token :", res)
      result(null, res);
    });
  };


module.exports = notif
  