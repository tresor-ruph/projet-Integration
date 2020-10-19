module.exports = app =>{

    const contacts = require('./../controller/user.controller');
    //get all contacts 
    app.get("/contacts/", contacts.findAll);
    //get the contacts with userId
    /*
        this is just for a test.
        the appropriate route should be /contacts/:userId 
        after changing the route make sure the parameter userId match in user.model and user.controller
    **/
    app.get("/contacts/:name", contacts.findOne)
    app.post("/addUser",  function(req, res){
        req.header('Access-Control-Allow-Origin','*')
        console.log(req.body)
        contacts.create
    });

};