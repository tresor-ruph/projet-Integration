module.exports = (app) => {
  const contacts = require("./../controller/user.controller");
  //get all contacts
  app.get("/contacts/", contacts.findAll);
  //get the contacts with userIds
  /*
        this is just for a test.
        the appropriate route should be /contacts/:userId 
        after changing the route make sure the parameter userId match in user.model and user.controller
    **/
  app.get("/contacts/:email", contacts.findOne);
  app.get("/chat/:senderId/:recieverId", contacts.findRoom)

  app.post("/chat/addroom", contacts.createChat )


};
