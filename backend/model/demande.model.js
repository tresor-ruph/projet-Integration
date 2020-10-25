const sql = require('./db');

const demande = function(user) {
    this.id = demande.id
}

demande.findDemande = (result) => {
    sql.query("select * from Demande"  , (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
            
    });
};


demande.findDemandeFilter = (categorie, result) => {
    sql.query(`select * from Demande WHERE categorie = ${categorie}`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
            
    });
};


demande.findDemandeFilterU = (userId, result) => {
    sql.query(`select * from Demande WHERE userId = ${userId}`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
    });
};


demande.createDemande = (Newdemande, result) => {
    var requete = "INSERT INTO Demande(userName, categorie, descriptif, userId) VALUES ? ";
    var values = [[Newdemande.userName, Newdemande.categorie , Newdemande.descriptif, Newdemande.userId]];
    sql.query(requete, [values]);
    result (null, 'Demande envoyée')
};

module.exports = demande;