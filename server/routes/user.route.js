module.exports = app =>{

    const contacts = require('./../controller/user.controller');
    //get user with id = id
    app.get("/contacts/", contacts.findAll);


    app.get("/contacts/:name", contacts.findOne)
};