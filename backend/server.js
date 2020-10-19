const express = require('express');
const bodyParser = require('body-parser');
const cors= require("cors");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true}));


app.get("/", (req, res) => {
    res.json({message :  "welcome to helprecover api"})
})

const routes = require('./routes/user.route')(app);

app.listen(process.env.PORT || '3000', () => {
    console.log(`the server is running on ${process.env.PORT || '3000'}`);
});

app.use(cors());



app.post('/ajoutDem',(req,res)=>{
    var idDemande= req.body.idService;
    var userName=req.body.userName;
    var categorie= req.body.categorie;
    var descriptif = req.body.descriptif;

    console.log(req.body);
    var requete = "INSERT INTO Demande(userName, categorie, descriptif) VALUES ? ";
    var values = [[idDemande,userName,categorie ,descriptif]];
    db.query(requete, [values] );

    res.json({text : ' Demande postée '});
})