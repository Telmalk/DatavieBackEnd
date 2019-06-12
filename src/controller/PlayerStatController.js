const playerStatModel = require("../model/PlayerStat");
const utils = require("../helpers/utils");
const asyncLib = require("async");

module.exports = {
    playerStat: (req, res) => {
        if (isNaN(req.params.id_player_stat)) {
            return res.respond("Invalid Parameters", 400)
        }
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
            },
            (playerStat, nbPlayer, rankMatchPlayed, rankMinutePlayed, rankAssit, rankPoint, done) => {
                playerStatModel.selectAllPointOfCareer(playerStat.player_name)
                    .then((nbPointCarrier) => {
                        return done(null, playerStat, nbPlayer, rankMatchPlayed, rankMinutePlayed, rankAssit, rankPoint, nbPointCarrier)
                    })
                    .catch((err) => {
                        console.log(err);
                        return done(err);
                    })
            },
            (playerStat, nbPlayer, rankMatchPlayed, rankMinutePlayed, rankAssit, rankPoint, nbPointCarrier, done) => {
                playerStatModel.rankDefensiveRebound(playerStat.offensive_rebound, playerStat.id_season)
                    .then((rankOffensiceRebound) => {
                        return done(null, playerStat, nbPlayer, rankMatchPlayed, rankMinutePlayed, rankAssit,
                            rankPoint, nbPointCarrier, rankOffensiceRebound);

                    })
                    .catch((err) => {
                        return done(err)
                    })
            },
            (playerStat, nbPlayer, rankMatchPlayed, rankMinutePlayed, rankAssit,
                rankPoint, nbPointCarrier, rankOffensiceRebound, done) => {
                    playerStatModel.rankDefensiveRebound(playerStat.defensive_rebound, playerStat.id_season)
                        .then((rankDefensiveRebound) => {
                            return done(null, playerStat, nbPlayer, rankMatchPlayed, rankMinutePlayed, rankAssit,
                                rankPoint, nbPointCarrier, rankOffensiceRebound, rankDefensiveRebound);
                        })
            }

            ], (err, playerStat, nbPlayer, rankMatchPlayed,
                rankMinutePlayed, rankAssit, rankPoint, nbPointOfCarrier,
                rankOffensiveRebound, rankDefensiveRebound) => {
            if (err) {
                if (err === 'Not Found')
                    return res.respond(err, 404);
                return res.respond("Bad request", 400);
            }
            playerStat.picture = utils.makeImgaeUrl(playerStat.picture);
            playerStat.logo = utils.makeImgaeUrl(playerStat.logo);
            playerStat.totalPlayer = nbPlayer;
            playerStat.rankMatchPlayed = rankMatchPlayed;
            playerStat.rankMinutePlayed = rankMinutePlayed;
            playerStat.rankAssit = rankAssit;
            playerStat.rankPoint = rankPoint;
            playerStat.pointCarrier = nbPointOfCarrier;
            playerStat.rankDefensiveRebound = rankDefensiveRebound;
            playerStat.rankOffensiveRebound = rankOffensiveRebound;
            return res.respond(playerStat, 200);
        })
    }
};