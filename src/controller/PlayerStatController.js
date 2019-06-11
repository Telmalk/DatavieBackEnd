const playerStatModel = require("../model/PlayerStat");
const utils = require("../helpers/utils");
module.exports = {
    playerStat: (req, res) => {
        playerStatModel.selectStatPlayerBySeason(req.params.id_player_stat)
            .then((playerStat) => {
                playerStat.picture = utils.makeImgaeUrl(playerStat.picture);
                playerStat.logo = utils.makeImgaeUrl(playerStat.logo);
                res.respond(playerStat, 200);
            })
            .catch((err) => {
                res.respond(err, 400);
            })
    }
}