const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql');
//const dotenv = require('dotenv');
const app = express();
//dotenv.config({ path: './env'})
const bodyParser = require('body-parser')
var corsOptions = {
  origin: "http://localhost:8081"
};



app.use(cors(corsOptions));
/*
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: process.env.HOST ,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
*/


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
//si besoin
//app.use(express.urlencoded({extended: false}));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded());

app.use('/',require('./routes/routes'));
//app.use('/auth',require('./routes/au'));
app.post('/auth',(req, res) => {
    var nom = req.param('nom',null);
    var prenom = req.param('prenom',null);
    var adresse = req.param('adresse',null);
    var codePostal = req.param('codePostal',null);
    var Mail = req.param('Mail',null);

    var rechsql = 'SELECT Mail from Utilisateurs';
    var spotted = "";

    db.query(rechsql, function (err, result, fields) {
      if (err) {throw err;}else{
      console.log('ensuite il viens la');
      for(var i = 0;i<result.length;i++){
        if(result[i].Mail==Mail){
            console.log(result[i].Mail);
            spotted = result[i].Mail;
        }
    }
    console.log('==for====');
    console.log(spotted);
    console.log('===for===');
    console.log('et fini ici');
  }
    });
    console.log('======');
    console.log(spotted);
    console.log('======');
    console.log('passe d abord par la');
    if(spotted == ""){
      console.log("passse direct ici");
      var sql = 'INSERT INTO Utilisateurs(Nom , Prenom , Adresse , CodePostal,Mail) VALUES ?';
      var values = [[nom,prenom,adresse,codePostal,Mail]];
      db.query(sql,[values]);
      res.json({ message: "inscription finie" });
    }else{
      res.json({message: "email deja utilisé"});
    }
  });
//require("./app/routes/routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//const db = require("./app/models");
//db.sequelize.sync();



