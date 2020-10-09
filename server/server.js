const express = require('express');
const bodyParser = require('body-parser');

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