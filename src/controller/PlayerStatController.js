const playerStatModel = require("../model/PlayerStat");
const utils = require("../helpers/utils");
const asyncLib = require("async");

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
    },

    toto: (req, res) => {
        asyncLib.waterfall([
            (done) => {
                playerStatModel.selectStatPlayerBySeason(req.params.id_player_stat)
                    .then((playerStat) => {
                        done(null, playerStat)
                    })
                    .catch((err) => {
                        return done(err);
                    })
            },
            (playerStat, done) => {
                playerStatModel.totalPlayerInSeason(playerStat.id_season)
                    .then((nbPlayer) => {
                        return done(null, playerStat, nbPlayer);
                    })
                    .catch((err) => {
                        return (done(err));
                    })
            },
            (playerStat, nbPlayer, done) => {
                playerStatModel.rankMatchPlayed(playerStat.match_played, playerStat.id_season)
                    .then((rankMatchPlayed) => {
                        return done(null, playerStat, nbPlayer, rankMatchPlayed)
                    })
                    .catch((err) => {
                        return done(err);
                    })
            },
            (playerStat, nbPlayer, rankMatchPlayed, done) => {
                playerStatModel.rankMinutePlayed(playerStat.minute_played, playerStat.id_season)
                    .then((rankMinutePlayed) => {
                        return done(null, playerStat, nbPlayer, rankMatchPlayed, rankMinutePlayed)
                    })
                    .catch((err) => {
                        return done(err);
                    })
            },
            (playerStat, nbPlayer, rankMatchPlayed, rankMinutePlayed, done) => {
                playerStatModel.randAssist(playerStat.assist, playerStat.id_season)
                    .then((rankAssist) => {
                        return done(null, playerStat, nbPlayer, rankMatchPlayed, rankMinutePlayed, rankAssist);
                    })
                    .catch((err) => {
                        return done(err);
                    })
            },
            (playerStat, nbPlayer, rankMatchPlayed, rankMinutePlayed, rankAssit, done) => {
                playerStatModel.rankPoint(playerStat.points, playerStat.id_season)
                    .then((rankPoint) => {
                        return done(null, playerStat, nbPlayer, rankMatchPlayed, rankMinutePlayed, rankAssit, rankPoint)
                    })
                    .catch((err) => {
                        return done(err);
                    })
            }

            ], (err, playerStat, nbPlayer, rankMatchPlayed, rankMinutePlayed, rankAssit, rankPoint) => {
            if (err)
                return res.respond("Bad request", 400);
            playerStat.picture = utils.makeImgaeUrl(playerStat.picture);
            playerStat.logo = utils.makeImgaeUrl(playerStat.logo);
            playerStat.totalPlayer = nbPlayer;
            playerStat.rankMatchPlayed = rankMatchPlayed;
            playerStat.rankMinutePlayed = rankMinutePlayed;
            playerStat.rankAssit = rankAssit;
            playerStat.rankPoint = rankPoint;
            return res.respond(playerStat, 200);

        })
    }
}