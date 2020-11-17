module.exports = (app) => {
  const contacts = require("../controller/contacts.controller");
  const userController = require("../controller/user.controller");

  //get all contacts
  app.get("/contacts/", contacts.findAll);
  //get the contacts with userIds
  /*
        this is just for a test.
        the appropriate route should be /contacts/:userId 
        after changing the route make sure the parameter userId match in user.model and user.controller
    **/
  app.get("/users", userController.findAll);
  app.get("/users/:id/", userController.findOne);
  app.put("/updateData/", userController.update)
  app.get("/contacts/:email/", contacts.findOne);
  app.get("/group/:Id", contacts.findGroups);
  app.get("/groupUsers/:Id", contacts.findGroupUsers);
  app.get("/chat/:senderId/:recieverId/", contacts.findRoom);
  app.get("/chatconv/:userId/", contacts.findConversRoom);

  app.post("/chat/addroom/", contacts.createChat )
  app.post("/group/addGroup/", contacts.creategroup )
  app.post("/group/addSingleGroup/", contacts.addGroup )
  app.delete("/group/:userId/", contacts.leaveGroup);
  app.delete("/group/all/:userId/", contacts.removeGroup);


};
