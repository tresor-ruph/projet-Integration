const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();
app.use(cors())

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));



app.get("/", (req, res) => {
    res.json({message :  "welcome to helprecover api"})
})

const routes = require('./routes/user.route')(app);

app.listen(process.env.PORT || '3000', () => {
    console.log(`the server is running on ${process.env.PORT || '3000'}`);
});