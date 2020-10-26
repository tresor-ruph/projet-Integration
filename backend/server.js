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



var sessionMidleware = {secret: "its a secret!",saveUninitialized: true,resave: false};


//app.use(session({unset: 'keep',secret: "its a secret!",saveUninitialized: true,resave: true,cookie: { secure: false,maxAge: 60000 }}));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use(session(sessionMidleware));
//app.use('/auth',require('./routes/au'));
app.get('/Mail', (req,res) =>{
  var rechsql = 'SELECT Mail from Utilisateurs';
  var spotted = '';
  var Mail = req.param('Mail',null);
  db.query(rechsql, function (err, result, fields) {
    //if (err) {throw err;}else{
    
    for(var i = 0;i<result.length;i++){
      if(result[i].Mail==Mail){
          spotted = result[i].Mail;
          return res.status(400).json({
            status: 'error',
            error: 'email deja utilisé',
          });
          //res.json({message: "email deja utilisé"});
      }
  }
  res.json({message: 'ok'});
})
  });
app.post('/auth',(req, res) => {

  
	  var nom = req.body.nom;
    var prenom = req.body.prenom;
    var adresse = req.body.adresse;
    var codePostal = req.body.codePostal;
    var Mail = req.body.mail;
    var password = req.body.password;
    

	

    /*
   const saltRounds = 10;
   const myPlaintextPassword = password;
   var h = '';

   bcrypt.genSalt(saltRounds, function(err, salt) {
     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
         console.log(hash);
         h=hash;
     });
   });

*/


var rechsql = 'SELECT Mail from Utilisateurs';
  var spotted = true;
  db.query(rechsql, function (err, result, fields) {
    
    for(var i = 0;i<result.length;i++){
      if(result[i].Mail==Mail){
          spotted = false;
          /*
          res.status(400).json({
            status: 'error',
            error: 'email deja utilisé',
            message: 'error' 
          });*/
      }
  }
if(spotted){

  var sql = 'INSERT INTO Utilisateurs(Nom , Prenom , Adresse , CodePostal,Mail,password) VALUES ? ';
  var values = [[nom,prenom,adresse,codePostal,Mail,password]];
  db.query(sql,[values]);
  //req.session.email = Mail;
  var rechid = 'SELECT Id from Utilisateurs where Mail = "'+Mail+'"';
  db.query(rechid, function (err, resu, fields) {
    console.log(resu);
  if(resu == undefined){
    res.json({ message: 'erreur interne'});
  }else{
    res.json({ message: 'inscription finie', id : resu[0].Id });
  }
  });

}else{
  res.json({ message: 'error' });
}

})



      
  });

  

  app.post('/login',(req,res) => {
    var password = req.body.password;
    var Mail = req.body.mail;

    
    
    var sql = 'SELECT * from Utilisateurs where Mail = "'+Mail+'"';
    db.query(sql, function (err, result, fields) {
if(result[0] == undefined){
  res.json({message: 'erreur'});
}else{
      
/*
bcrypt.compare(result[0].password, password, function(err, re) {
  console.log(result[0].password);
  console.log(re);
  
  */

      //if(re){
        //req.body.session = Mail;
        //req.session.email = Mail;
        //console.log(req.session);
        
        res.json({message: "entrée dans l'appli" , id : result[0].Id, hash: result[0].password});
        //return res.redirect(307,'/appli');
      //}else{
        //res.json({message: 'erreur'});
      //}
    
//});

}
  })
  });









  app.use((req,res,next)=>{
    console.log('()((()()()()()()(()))))');
    if(!req.body.id){
      const err = new Error("nope");
      err.statusCode = 401;
      next(err);
    }
    next();

  })



  app.post('/appli',(req,res)=>{
    var sql = 'SELECT * from Utilisateurs where id = "'+req.body.id+'"';
    db.query(sql, function (err, result, fields) {
      if(result[0] == undefined){
        res.json({message: 'erreur'});
      }else{
          if(req.body.id){
            res.json({ message: "entrée dans l'appli" , utilisateur: result[0].Mail });
          }else{
            res.json({ message: "vous n'êtes pas autorisé à etre ici" });
          }
  }});

  });


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





