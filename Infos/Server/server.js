const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require("mysql");


var db_config = {
  host: "eu-cdbr-west-03.cleardb.net",
  user: "b500a81222d1e2",
  password: "c3276b49",
  database: "heroku_a43966f528611e5"
};

var con

function handleDisconnect() {
  con = mysql.createConnection(db_config); 

  con.connect(function(err) {              
    if(err) {                                    
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }
    else 
    console.log("Connected !");                                    
  });  
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

// middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json());
app.use(cors());

// Pour les ressources de la base de données

app.get("/users", (req, res) => {
  let rq = "SELECT * FROM Utilisateurs ORDER BY id desc";
  con.query(rq, (err, result, fields) => {
    if (err) {
      throw err;
    } else {
      console.log("hey hey");
      res.status(200).json(result);
    }
  });
});

app.get("/users/:id", (req, res) => {
  let rq = "SELECT * FROM Utilisateurs where id = ? ";
  con.query(rq, [req.params.id], (err, result, fields) => {
    if (err) {
      throw err;
    } else {
      res.header("Access-Control-Allow-Origin","*");
      res.status(200).json(result);
    }
  });
});

//Obtenir toutes les offres
app.get("/offres", (req, res) => {
  let rq = "SELECT * FROM Offre ORDER BY idDemande asc";
  con.query(rq, (err, result, fields) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
});

app.get("/offres/:id", (req, res) => {
  let rq = "SELECT * FROM Offre where idOffre = ?";
  con.query(rq, [req.params.id], (err, result, fields) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
});

//Obtenir toutes les demandes
app.get("/demandes", (req, res) => {
  let rq = "SELECT * FROM Demande ORDER BY idDemande desc";
  con.query(rq, (err, result, fields) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
});

app.get("/demandes/:id", (req, res) => {
  let rq = "SELECT * FROM Demande where idDemande = ?";
  con.query(rq, [req.params.id], (err, result, fields) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
});

//Ajouter un utilisateur
app.post("/addUser", (req, res) => {
  console.log(req.body);
  var sql =
    "INSERT INTO Utilisateurs(Nom,Prenom,Adresse,CodePostal,ScannerDoc,PhotoProfil) values (" +
    "'" +
    req.body.name +
    "'" +
    "," +
    "'" +
    req.body.surname +
    "'" +
    "," +
    "'" +
    req.body.adresse +
    "'" +
    "," +
    "'" +
    req.body.code +
    "'" +
    "," +
    "'" +
    req.body.scanner +
    "'" +
    "," +
    "'" +
    req.body.photo +
    "'" +
    ")";
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);
    }
  });
});

//Ajouter une demande
app.post("/addRequest", (req, res) => {
  console.log(req.body);
  var sql =
    "INSERT INTO Demande(userId,Titre,Description,Statut) values (" +
    "'" +
    req.body.user +
    "'" +
    "," +
    "'" +
    req.body.titre +
    "'" +
    "," +
    "'" +
    req.body.description +
    "'" +
    "," +
    "'" +
    req.body.statut +
    "'" +
    ")";
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);
    }
  });
});

//Ajouter une offre
app.post("/addOffer", (req, res) => {
  console.log(req.body);
  var sql =
    "INSERT INTO Offre(idOffre,idDemande) values (" +
    req.body.demande +
    "," +
    req.body.offre +
    ")";
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);
    }
  });
});

//actualiser les données d'un user
app.post("/updateData", cors(), (req, res) => {
  let sql = "Update Utilisateurs set Nom=?,Prenom=?,CodePostal=?,Adresse=?,PhotoProfil=? where Id=?";
  con.query(sql, [req.body.Nom,req.body.Prenom,req.body.CodePostal,req.body.Adresse,req.body.Photo,req.body.userId], (err, result) => {

    if (err) throw err;
    else 
    {
      res.header("Access-Control-Allow-Origin","*");
      res.status(200).json(result);
    }

  });
});

//supprimer une demande
app.delete("/deleteRequest", (req, res) => {
  let sql = "delete from Demande where idDemande = ?";
  con.query(sql, [req.body.idDemande], (err, result) => {
    if (err) throw err;
    else {
      res.header("Access-Control-Allow-Origin","*");
      res.status(200).json(result);
    }
  });
});

app.listen(3000, () => {
  console.log("server on");
});
