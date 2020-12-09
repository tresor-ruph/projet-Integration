const reinitmdp = require("../model/reinit.model");

module.exports = (app) => {
  const contacts = require("../controller/contacts.controller");
  const userController = require("../controller/user.controller");
  const demande = require('./../controller/ajoutDem');
  const connexion = require('./../controller/connexion');
  const reinitmdp= require('./../controller/reinit.controller')
  const notation = require('./../controller/notation');
  //get all contacts
  app.get("/contacts/", contacts.findAll);
  //get the contacts with userIds
  /*
        this is just for a test.
        the appropriate route should be /contacts/:userId 
        after changing the route make sure the parameter userId match in user.model and user.controller
    **/
  app.get("/users", userController.findAll);
  app.get("/users/attente", demande.findAllAttente);
  app.post("/users/confirmation", demande.createUser1);
  app.get("/users/:id/", userController.findOne);
  app.put("/updateData/", userController.update);
  app.get("/contacts/:email/", contacts.findOne);
  app.get("/group/:Id", contacts.findGroups);
  app.get("/groupUsers/:Id", contacts.findGroupUsers);
  app.get("/chat/:senderId/:recieverId/:verif", contacts.findRoom);
  app.get("/chatconv/:userId/", contacts.findConversRoom);
  app.post("/chat/addroom/", contacts.createChat )
  app.post("/service/addService/", contacts.createService )

  app.post("/group/addGroup/", contacts.creategroup )
  app.post("/group/addSingleGroup/", contacts.addGroup)
  app.delete("/group/:userId/", contacts.leaveGroup);
  app.delete("/group/all/:userId/", contacts.removeGroup);
  app.get("/demande/all/:id", demande.findAll);
  app.get("/demande/allAt/", demande.findAllAttente);

  app.post("/demandeE/", demande.create);
  app.post("/propositionE/", demande.createPropos);
  app.get("/demande/:categorie/:codeP", demande.findOne);
  app.get("/demandeCat/:categorie", demande.findOneCat);
  app.get("/demandeCode/:codeP", demande.findOneCode);
  app.get("/demandeU/:userId", demande.findOneUI);
  app.get("/demandeD/:userId", demande.findDescri);
  app.get("/reinitmdpR/:mail", reinitmdp.cibleUser);
  app.get("/reinitmdpAll/", reinitmdp.findAllUsers);  
  app.post("/reinitmdpU/", reinitmdp.resetPassword);

  app.delete("/demandeS/:idDemande", demande.delete);
  app.delete("/proposS/:idProposition", demande.deletePropos);
  app.delete("/proposSA/:idProposition", demande.deleteProposA);
  app.get("/propositionG/:id", demande.findPropo);
  app.get("/propositionA/:id", demande.findPropoA);
  app.post("/notation", notation.access)
  app.post("/ajoutNotation", notation.ajout)
  app.post("/rating", notation.rating)
  app.post("/login", connexion.access)
  app.post("/auth", connexion.create)
  app.get("/emailVerif/:email", userController.updateEmail)
  app.delete("/supp/:email",userController.suppCompte);
  app.get("/usersMM/:mail/", userController.findMM );
};
