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
  validationEmail: (emailV, result) => {
    var jwt = require('jsonwebtoken');
    var decoded = jwt.verify(emailV, '8376806802b688bf4d8ab6dc2762d91e');
    //var pageValidation = '<!doctype html><html><head><meta charset="utf-8"><title>Vérification réussie</title></head><body style="background-color: #ded7ba"><table style="position: absolute; left: 35%; top: 40%; font-size: 30px; "><tr><th>Vérification réussie !</th></tr><tr><th>Vous pouvez vous connecter.</th></tr></table></body></html>'
    console.log(emailV);
    sql.query(`update Utilisateurs set EmailVerif = true where Mail = "${decoded.data}"`,
      (err, res) => {
        if (err) {
          console.log("error : ", err);
          result(null, err);
          return;
        }
        console.log("data successfully updated");
        result(null, "Validation réussie ! Vous pouvez désormais vous connecter sur l'application."); 
      });
  },
  suppCompte: (mail, result) => {
    var jwt = require('jsonwebtoken');
    var decoded = jwt.verify(mail, '8376806802b688bf4d8ab6dc2762d91e');
    sql.query(`delete from Utilisateurs where Mail = "${decoded.data}"`,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      console.log("data successfully removed");
      result(null, "Votre compte a été supprimé."); 
    });
  },
  findMailMdp: (mail, result) => {
    sql.query(`SELECT Mail, password FROM Utilisateurs WHERE Mail = "${mail}"`, (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  }
};