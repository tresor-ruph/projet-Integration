module.exports = app =>{

    const contacts = require('./../controller/user.controller');
    //get user with id = id
    app.get("/contacts/", contacts.findAll);

    const demande = require('./../controller/ajoutDem');
    //get user with id = id
    app.get("/demande/all", demande.findAll);
    app.post("/demandeE/", demande.create);
    app.get("/demande/:categorie/:codeP", demande.findOne);
    app.get("/demandeU/:userId", demande.findOneUI);
    app.get("/demandeD/:userId", demande.findDescri);
};