const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const request = require("./src/helpers/constant").request;
const  route = require("./src/helpers/constant").route;
require("./src/helpers/response");

app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Content-Type", "application/json");
    next();
})

// Route


// 404

    .use((req, res, next) => {
       res.respond(request.PAGE_NOT_FOUND, 404);
    });

app.listen(8080);