const sql = require("./db");

module.exports = {

  findUsers: (result) => {
    sql.query("select * from Utilisateurs", (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  },

  findById: (id, result) => {
    sql.query(`SELECT * FROM Utilisateurs WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  },

  updateUser: (newData, result) => {
    const nom = `'${newData.Nom}'`;
    const prenom = `'${newData.Prenom}'`;
    const code = `'${newData.CodePostal}'`;
    const adresse = `'${newData.Adresse}'`;
    const photo = `'${newData.Photo}'`;
    const userId = `'${newData.userId}'`;

    console.log(newData);
    sql.query(`Update Utilisateurs set Nom = ${nom},Prenom = ${prenom},CodePostal = ${code},Adresse = ${adresse} ,PhotoProfil= ${photo} where Id= ${userId}`,
      (err, res) => {
        if (err) {
          console.log("error : ", err);
          result(null, err);
          return;
        }
        console.log("data successfully updated");
        result(null, res);
      });
  },
};