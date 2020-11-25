const sql = require('./db');

const demande = function(user) {
    this.id = demande.id
}

demande.findDemande = (id, result) => {
    sql.query(`select * from Demande inner join Utilisateurs on Demande.userId=Utilisateurs.Id where not userId = ${id} `  , (err,res) => {
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

demande.findProposition = (id, result) => {
    sql.query(`select * from Proposition inner join Demande on Proposition.idDem = Demande.idDemande inner join Utilisateurs on Proposition.idServeur = Utilisateurs.Id WHERE Proposition.idDemandeur = ${id}`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
            
    });
};

demande.findPropositionA = (id, result) => {
    sql.query(`select * from PropositionConfirme inner join Demande on PropositionConfirme.idDemande = Demande.idDemande inner join Utilisateurs on PropositionConfirme.idServeur = Utilisateurs.Id WHERE PropositionConfirme.idDemandeur = ${id}`, (err,res) => {
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
    sql.query(`select * from Demande inner join Utilisateurs on Demande.userId=Utilisateurs.Id WHERE categorie = ${categorie}  `, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
            
    });
};

demande.findDemandeFilterCode = (codeP, result) => {
    sql.query(`select * from Demande inner join Utilisateurs on Demande.userId=Utilisateurs.Id WHERE CodePostal = ${codeP}  `, (err,res) => {
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
    sql.query(`select * from Demande inner join Utilisateurs on Demande.userId=Utilisateurs.Id WHERE userId = ${userId}`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
    });
};


demande.supprimerDemande = (idDemande, result) => {
    sql.query(`delete from Demande where idDemande = ${idDemande}`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
    });
}

demande.supprimerPropos = (idProposition, result) => {
    sql.query(`delete from Proposition where idProposition = ${idProposition}`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
    });
}

demande.supprimerProposA = (idProposition, result) => {
    sql.query(`delete from PropositionConfirme where idPropositionConfirme = ${idProposition}`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
    });
}



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

demande.confPropo = (propos, result) => {
    var requete = "INSERT INTO PropositionConfirme(idServeur, idDemande, idDemandeur) VALUES ? ";
    var values = [[propos.idServeur , propos.idDemande, propos.idDemandeur]];
    sql.query(requete, [values]);
    result (null, 'Demande envoyée')
};

module.exports = demande;