const sql = require('./db');

const demande = function(user) {
    this.id = demande.id
}

demande.findDemande = (id, result) => {
    sql.query(`select * from demande inner join utilisateurs on demande.userId = utilisateurs.Id where not userId = ${id}`  , (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);   
    });
};


demande.findAttente = (result) => {
    sql.query(`select * from utilisateursattente`  , (err,res) => {
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
    sql.query(`select * from demande inner join utilisateurs on demande.userId=utilisateurs.Id WHERE categorie = ${categorie} and CodePostal = ${codeP}`, (err,res) => {
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
    sql.query(`select * from proposition inner join demande on proposition.idDem = demande.iddemande inner join utilisateurs on proposition.idServeur = utilisateurs.Id WHERE proposition.iddemandeur = ${id}`, (err,res) => {
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
    sql.query(`select * from propositionconfirme inner join demande on propositionconfirme.iddemande = demande.iddemande inner join utilisateurs on propositionconfirme.idServeur = utilisateurs.Id WHERE propositionconfirme.iddemandeur = ${id}`, (err,res) => {
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
    sql.query(`select * from demande inner join utilisateurs on demande.userId=utilisateurs.Id WHERE categorie = ${categorie}  `, (err,res) => {
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
    sql.query(`select * from demande inner join utilisateurs on demande.userId=utilisateurs.Id WHERE CodePostal = ${codeP}  `, (err,res) => {
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
    sql.query(`select * from demande inner join utilisateurs on demande.userId=utilisateurs.Id WHERE userId = ${userId}`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
    });
};


demande.supprimerDemande = (iddemande, result) => {
    sql.query(`delete from demande where iddemande = ${iddemande}`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
    });
}

demande.supprimerAttente = (idUser, result) => {
    sql.query(`delete from utilisateursattente where Id = ${idUser}`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
    });
}

demande.supprimerPropos = (idproposition, result) => {
    sql.query(`delete from proposition where idproposition = ${idproposition}`, (err,res) => {
        if(err) {
            console.log("error : ", err);
            result (null ,err);
            return;
        }
            console.log("contacts :" , res);
            result (null, res);
    });
}

demande.supprimerProposA = (idproposition, result) => {
    sql.query(`delete from propositionconfirme where idpropositionconfirme = ${idproposition}`, (err,res) => {
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
    sql.query(`select * from demande WHERE iddemande = ${userId}`, (err,res) => {
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
    var requete = "INSERT INTO demande(categorie, descriptif, userId) VALUES ? ";
    var values = [[Newdemande.categorie , Newdemande.descriptif, Newdemande.userId]];
    sql.query(requete, [values]);
    result (null, 'demande envoyée')
};


demande.createUser2 = (newUser, result) => {
    var requete = "INSERT INTO utilisateurs(Nom , Prenom , Adresse , CodePostal, dateNaissance, ScannerDoc, Mail, password) VALUES ? ";
    var values = [[newUser.Nom, newUser.Prenom, newUser.Adresse, newUser.CodePostal, newUser.dateNaissance, newUser.ScannerDoc, newUser.Mail, newUser.password]];
    sql.query(requete, [values], (err, res) => {
        if (err){
            result (null, err)
            return
        }
        else{
            result (null, 'utilisateur confirmé')  
        }
    });
};


demande.confPropo = (propos, result) => {
    var requete = "INSERT INTO propositionconfirme(idServeur, iddemande, iddemandeur) VALUES ? ";
    var values = [[propos.idServeur , propos.iddemande, propos.iddemandeur]];
    sql.query(requete, [values]);
    result (null, 'demande envoyée')
};

module.exports = demande;