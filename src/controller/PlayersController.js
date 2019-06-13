const playerStatModel = require("../model/PlayerStat");
const utils = require("../helpers/utils");

module.exports = {
    search: (req, res) => {
        req.params.player = req.params.player.replace("_", " ");
        playerStatModel.search(req.params.player, req.params.year)
            .then((player) => {
                for (let i = 0; i < player.length; i++) {
                    player[i].picture =  utils.makeImgaeUrl(player[i].picture);
                    player[i].logo = utils.makeImgaeUrl(player[i].logo);
                }
                res.respond(player, 200);
            })
            .catch((err) => {
                res.respond(err, 404);
            })
    }

};