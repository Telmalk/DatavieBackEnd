const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const request = require("./src/helpers/constant").request;
const fs = require("fs");
const  route = require("./src/helpers/constant").route;
const playerController = require("./src/controller/PlayersController");
const playerStatController = require("./src/controller/PlayerStatController");
require("./src/helpers/response");

var dir = path.join(__dirname, 'assets/');

app = express();

const mime = {
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
};


app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    //res.setHeader("Content-Type", "application/json");

    next();
})
    .get("/images/*", function (req, res) {
        let file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
        let type = mime[path.extname(file).slice(1)] || 'text/plain';
        let s = fs.createReadStream(file);
        s.on('open',  () => {
            console.log("fdfd");
            res.set('Content-Type', type);
            s.pipe(res);
        });
        s.on('error',  () => {
            console.log(file);
            res.set('Content-Type', 'text/plain');
            res.status(404).end('Not found');
        });
    })

// Route
    .get("/test", (req, res) => {
        res.respond("OK", 200);
    })

    .get("/search/:year/:player", (req, res) => {
        playerController.search(req, res);
    })
    .get("/player/:id_player_stat", (req, res) => {
        playerStatController.toto(req, res);
    })

// 404
    .use((req, res, next) => {
        console.log(req.path);
      res.respond(request.PAGE_NOT_FOUND, 404);
    });

app.listen(8080);