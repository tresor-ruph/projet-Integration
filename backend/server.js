const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql');
//const dotenv = require('dotenv');
const app = express();
//dotenv.config({ path: './env'})

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
app.use(express.urlencoded({extended: false}));

app.use('/',require('./routes/routes'));
app.use('/auth',require('./routes/au'));
//require("./app/routes/routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//const db = require("./app/models");
//db.sequelize.sync();



