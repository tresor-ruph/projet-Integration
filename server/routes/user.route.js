module.exports = app =>{

    const user = require('./../controller/user.controller')
    //get user with id = id
    app.get("/user/:id",user.findOne)
};