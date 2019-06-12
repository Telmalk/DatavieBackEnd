const csvTojson = require("csvtojson");
const playerStatModel = require("../model/PlayerStat");

const addPercent = () => {
    const csvPathFile = "../../assets/stat/all-stats-advanced.csv";
    csvTojson({
        delimiter: ";"
    }).fromFile(csvPathFile)
        .then((result) => {
            result.forEach((playerStat) => {
                let playerToken = playerStat.Player.split("\\");
                playerStat.Player = playerToken[0].trim().toLowerCase();
                playerStatModel.selectStatByYearAndPlayer(playerStat.season, playerStat.Player, playerStat.Tm)
                    .then((idPlayerStat) => {
                        playerStatModel.addPercentStealAndBlock(playerStat.steal_percent,
                            playerStat.defensive_rebound_percent, idPlayerStat.id_player_stat)
                            .then(() => {
                                ///console.log("succes")
                                console.log(idPlayerStat.id_player_stat);
                                //console.log(playerStat.steal_percent);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
        })
};

addPercent();