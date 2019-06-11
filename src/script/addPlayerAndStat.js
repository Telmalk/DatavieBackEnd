const csvToJson = require("csvtojson");
const playerModel = require("../model/Players");

const players = [];


const splitPlayer = (playerName) => {
    const player = playerName.split("\\");
    return player[0].trim().toLowerCase();
};

const switchKeyPlayer = (originKey) => {
    return goodKey = {
        name: splitPlayer(originKey.player),
        birth_year: new Date().getFullYear() - originKey.age,
        college: originKey.college ? originKey.college : "N/A",
        weight: originKey.weight ? originKey.weight : 103,
        height: originKey.height ? originKey.height : 207
    }
};

const weithAndHeight = (playerArray) => {
    return new Promise((resolve, reject) => {
        const csvPathFile = "../../asssets/stat/Players.csv";
        csvToJson({
            delimiter: ","
        }).fromFile(csvPathFile)
            .then((result) => {
                let cpt = 0;
                result.forEach((player) => {
                    cpt++;
                    for (let i = 0; i < playerArray.length; i ++) {
                        if (splitPlayer(player.Player) === splitPlayer(playerArray[i].player)) {
                            playerArray[i].weight = player.weight;
                            playerArray[i].height = player.height;
                            playerArray[i].college = player.collage;
                        }
                    }
                    if (cpt === result.length)
                        return resolve(playerArray);
                })
            })
    })
};

const addTeam = () => {
    return new Promise((resolve, reject) => {
        const csvPathFile = "../../assets/stat/All-stats-v1.csv";
        csvToJson({
                delimiter: ";"
            }
        ).fromFile(csvPathFile)
            .then((result) => {
                let cpt = 0;
                result.forEach((player) => {
                    cpt++;
                    if (player.player !== "") {
                        let inArray = false;
                        for (let i = 0; i < players.length; i++) {
                            if (splitPlayer(player.player) === splitPlayer(players[i].player))
                                inArray = true;
                        }
                        if (!inArray) {
                            players.push(player);
                        }
                        if (cpt === result.length) {
                            return resolve(players);
                         }
                    }
                });
            }).catch((err) => {
            console.log(err);
        });
    });
};

addTeam()
    .then((play) => {
        weithAndHeight(play)
            .then((completePlayer) => {
                completePlayer.forEach((player) => {
                    player =  switchKeyPlayer(player);
                    playerModel.add(player)
                        .then(() => console.log("ok"))
                        .catch((err) => console.log(err));
                })
            })
    });


