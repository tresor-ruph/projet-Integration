const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./routes/user.route');

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json());
app.use(cors());


app.use("/", routes)

var port = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`The server is running on ${process.env.PORT || '3000'}`);
});