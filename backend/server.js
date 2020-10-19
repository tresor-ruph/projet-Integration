const express = require("express");
const cors = require("cors");
const mysql = require('mysql');
const app = express();

const session = require('express-session')
var Sync = require('sync');

const bodyParser = require('body-parser')
var corsOptions = {
  origin: "http://localhost:8081"
};


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
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     
  extended: true
})); 


app.use(session({secret: "its a secret!"}));
//app.use(express.json());       
//app.use(express.urlencoded());

app.use('/',require('./routes/routes'));
//app.use('/auth',require('./routes/au'));

app.get('/Mail', (req,res) =>{
  var rechsql = 'SELECT Mail from Utilisateurs';
  var spotted = '';
  var Mail = req.param('Mail',null);
  db.query(rechsql, function (err, result, fields) {
    //if (err) {throw err;}else{
    
    for(var i = 0;i<result.length;i++){
      if(result[i].Mail==Mail){
          console.log(result[i].Mail);
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
    var Mail = req.body.Mail;
    var password = req.body.motdepasse;
      
      console.log( req.body );
      console.log("passse direct ici");
      var sql = 'INSERT INTO Utilisateurs(Nom , Prenom , Adresse , CodePostal,Mail,password) VALUES ? ';
      var values = [[nom,prenom,adresse,codePostal,Mail,password]];
      db.query(sql,[values]);
      req.session.email = Mail;
      res.json({ message: "inscription finie" });
  });

  app.get('/appli',(req,res)=>{
    if(req.session.email){
    res.json({ message: "entrée dans l'appli" });
    }else{
      res.json({ message: "vous n'êtes pas autorisé à etre ici" });
    }
  });


  app.get('/login',(req,res) => {
    // faire la verif de password
    var password = req.param('password',null);
    var Mail = req.param('Mail',null);
    var sql = 'SELECT password from Utilisateurs where Mail = "'+Mail+'"';
    console.log(sql);
    db.query(sql, function (err, result, fields) {
    console.log(result[0].password);
    if(password == result[0].password){
      req.session.email = Mail;
      return res.redirect('/appli');
    }else{
      res.json({message: 'erreur de mot de passe'});
    }
  })
  });

  app.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
