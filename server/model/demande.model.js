const sql = require('./db');

const demande = function(user) {
    this.id = demande.id
}

demande.findDemande = (result) => {
    sql.query("select * from Demande inner join Utilisateurs on Demande.userId=Utilisateurs.Id"  , (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
            
    });
};


demande.findDemandeFilter = (categorie, codeP,  result) => {
    sql.query(`select * from Demande inner join Utilisateurs on Demande.userId=Utilisateurs.Id WHERE categorie = ${categorie} and CodePostal = ${codeP}`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
            
    });
};

demande.findDemandeFilterT = (categorie, result) => {
    sql.query(`select * from Demande WHERE categorie = ${categorie} and `, (err,res) => {
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

demande.findDemandeDescriptif = (userId, result) => {
    sql.query(`select * from Demande WHERE idDemande = ${userId}`, (err,res) => {
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
    var requete = "INSERT INTO Demande(categorie, descriptif, userId) VALUES ? ";
    var values = [[Newdemande.categorie , Newdemande.descriptif, Newdemande.userId]];
    sql.query(requete, [values]);
    result (null, 'Demande envoyée')
};

module.exports = demande;