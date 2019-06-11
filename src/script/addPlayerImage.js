const playerModel = require("../model/Players");
const fs = require("fs");

const renameFileAndDir = () => {
    const picturePlayers = "../../assets/images/nba_image";
    fs.readdirSync(picturePlayers).forEach((dir) => {
        let dirPath = picturePlayers + "/" + dir;
        if (fs.lstatSync(dirPath).isDirectory()) {
            console.log(dirPath);
            let renameDir = dir.replace(" ", "_");
            fs.rename(dirPath, picturePlayers + "/" +  renameDir, (err, res) => {
                if (err)
                    console.log(err);
                if (res)
                    console.log(res);
            });
        }
    })
};

const addPicturePlayer = () => {
    const picturePlayers = "../../assets/images/nba_image";
    fs.readdirSync(picturePlayers).forEach(dir => {
        let dirPath  = picturePlayers + "/" + dir;
        if (fs.lstatSync(dirPath).isDirectory()) {
            fs.readdirSync(dirPath).forEach((teamDir) => {
                let teamDirPath = dirPath + "/" + teamDir;
                if (fs.lstatSync(teamDirPath).isDirectory()) {
                    fs.readdirSync(teamDirPath).forEach((playerPicture) => {
                        let playerPicturePath = teamDirPath + "/" + playerPicture;
                        if (fs.lstatSync(playerPicturePath).isFile()) {
                            if (playerPicture !== ".DS_Store" && playerPicture !== "Icon_") {
                                let tokenPath = playerPicturePath.split("/");
                                let year = tokenPath[5];
                                let team = tokenPath[6].trim().toLowerCase();
                                let playerPicture = tokenPath[7].trim().toLowerCase();
                                let playerWithoutExtenion = playerPicture.split(".");
                                playerModel.selectByPlayerName(playerWithoutExtenion[0])
                                    .then((result) => {
                                        playerPicture = year + "/" + team.replace(" ", "_") + "/" + playerPicture.replace(" ", "_");
                                        playerModel.addPicture(playerPicture, result.id_player)
                                            .then(() => {
                                                console.log(playerPicture);
                                            })
                                    });
                            }
                        }
                    })
                }
            })
        }
    })
};

addPicturePlayer();

//renameFileAndDir();