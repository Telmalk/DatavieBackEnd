const fs = require("fs");
const playerModel = require("../model/Players");
const playerStatModel = require("../model/PlayerStat");
const seasonModel = require("../model/Season");
const teamModel = require("../model/Team");
const asyncLib = require("async");
const csvToJson = require("csvtojson");

const changeKey = (playerStat) => {
      return {

      }
};

const adddStatPlayer = () => {
    const csvPathFile = "../../assets/stat/All-stats-v1.csv";
    csvToJson({
        delimiter: ";"
    }).fromFile(csvPathFile)
        .then((result) => {
            result.forEach((playerStat) => {
                if (playerStat.player !== "") {
                    seasonModel.select(playerStat.year)
                        .then((season) => {
                            playerStat.id_season = season.id_season;
                            //console.log(season);
                            teamModel.selectByTeam(playerStat.tm)
                                .then((team) => {
                                    playerStat.id_team = team.id_team;
                                    let playerToken = playerStat.player.split("\\");
                                    let player = playerToken[0].trim().toLowerCase();
                                    playerModel.selectByPlayerName(player)
                                        .then((playerInfo) => {
                                              playerStat.id_player = playerInfo.id_player;
                                             //console.log(idTeam);
                                             playerStatModel.add(playerStat)
                                                 .then((result) => {
                                                     console.log(result);
                                                     console.log("success");
                                                 })
                                                 .catch((err) => {
                                                     //console.log(playerStat);
                                                     console.log(err);
                                                 })
                                        })
                                        .catch((err) => {
                                        })
                                })
                                .catch((err) => {
                                    //console.log(err);
                                })
                        })
                }
            })
        })
};

adddStatPlayer();