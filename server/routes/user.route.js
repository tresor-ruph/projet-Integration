module.exports = (app) => {
  const contacts = require("../controller/contacts.controller");
  const userController = require("../controller/user.controller");
  const demande = require('./../controller/ajoutDem');
  const connexion = require('./../controller/connexion');
  //get all contacts
  app.get("/contacts/", contacts.findAll);
  //get the contacts with userIds
  /*
        this is just for a test.
        the appropriate route should be /contacts/:userId 
        after changing the route make sure the parameter userId match in user.model and user.controller
    **/
  app.get("/users", userController.findAll);
  app.get("/users/:id", userController.findOne);
  app.put("/updateData", userController.update)
  app.get("/contacts/:email", contacts.findOne);
  app.get("/chat/:senderId/:recieverId", contacts.findRoom)
  app.post("/chat/addroom", contacts.createChat )
  app.post("/auth", connexion.create)
  app.post("/login", connexion.access)
  
    //get user with id = id
  app.get("/demande/all", demande.findAll);
  app.post("/demandeE/", demande.create);
  app.get("/demande/:categorie/:codeP", demande.findOne);
  app.get("/demandeCat/:categorie", demande.findOneCat);
  app.get("/demandeCode/:codeP", demande.findOneCode);
  app.get("/demandeU/:userId", demande.findOneUI);
  app.get("/demandeD/:userId", demande.findDescri);
  app.delete("/demandeS/:idDemande", demande.delete);

};
