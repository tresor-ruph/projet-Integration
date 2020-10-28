const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');

const bcrypt = require('bcrypt');
const session = require('express-session')
var cookieParser = require('cookie-parser')
const app = express();

const cors = require("cors");
/*
var corsOptions = {
  origin: "http://localhost:8080",
  'Access-Control-Allow-Credentials': '*'
};
app.use(cors(corsOptions));
**/
app.use(cors());



const db = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net' ,
    user: 'sql7343279',
    password: 'lm5ksRt97g',
    database: 'sql7343279'
});



db.connect( (err) =>{
    if(err){
        console.log(err);
    }else{
        console.log("connection établie")
    }
} );

//app.use(express.urlencoded({extended: false}));



//var sessionMidleware = {secret: "its a secret!",saveUninitialized: true,resave: false};


//app.use(session({unset: 'keep',secret: "its a secret!",saveUninitialized: true,resave: true,cookie: { secure: false,maxAge: 60000 }}));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
//app.use(session(sessionMidleware));
app.use('/auth',require('./routes/au'));
app.use('/login',require('./routes/log'));








  app.post('/appli',(req,res,next)=>{
    console.log('()((()()()()()()(()))))');
    if(!req.body.id){
      const err = new Error("nope");
      err.statusCode = 401;
      next(err);
    }
    next();

  })



  app.use('/appli',require('./routes/appli'));
 

/*

  app.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});
*/
app.use('/',require('./routes/routes'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});





