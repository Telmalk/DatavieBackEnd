const playerStatModel = require("../model/PlayerStat");

module.exports = {
    search: (req, res) => {
        req.params.player = req.params.player.replace("_", " ");
        playerStatModel.search(req.params.player, req.params.year)
            .then((player) => {
                for (let i = 0; i < player.length; i++) {
                    player[i].picture = "http://localhost:8080/images/nb_image/" + player[i].picture;
                }
                res.respond(player, 200);
            })
            .catch((err) => {
                console.log(req.params);
                res.respond(err, 404);
            })
    }

};