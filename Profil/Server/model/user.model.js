const sql = require("./db");

module.exports ={

findUsers:(result) => {
  sql.query("select * from Utilisateurs", (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
},

findById:(id, result) => {
  sql.query(`SELECT * FROM Utilisateurs WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
},


updateUser:(newData,result) => {

  nom = "'" + newData.Nom + "'";
  prenom = "'" + newData.Prenom + "'";
  code = "'" + newData.CodePostal + "'";
  adresse = "'" + newData.Adresse + "'";
  photo = "'" + newData.Photo + "'";
  userId= "'" +newData.userId + "'";

  console.log(newData);
  sql.query(`Update Utilisateurs set Nom = ${nom},Prenom = ${prenom},CodePostal = ${code},Adresse = ${adresse} ,PhotoProfil= ${photo} where Id= ${userId}`,
  (err,res) => {
    if (err) {
      console.log("error : ", err);
      result(null, err);
      return;
    }
    console.log("data successfully updated");
    result(null, res);
  })
}
}