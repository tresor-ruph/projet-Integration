module.exports = app =>{

    const contacts = require('./../controller/user.controller');
    //get user with id = id
    app.get("/contacts/", contacts.findAll);

    const demande = require('./../controller/ajoutDem');
    //get user with id = id
    app.get("/demande/", demande.findAll);
    app.post("/demandeE/", demande.create);
};