module.exports = app =>{

    const contacts = require('./../controller/user.controller');
    //get user with id = id
    app.get("/contacts/", contacts.findAll);
};