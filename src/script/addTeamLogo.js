const fs = require("fs");
const teamModel = require("../model/Team");

addLogo= () => {
    const teamImageFolder = "../../assets/images/nba_image";
    fs.readdirSync(teamImageFolder).forEach(file => {
        if (fs.lstatSync(teamImageFolder + "/" + file).isFile()) {
            const withoutExtension = file.split(".");
            teamModel.selectByTeam(withoutExtension[0])
                .then((team) => {
                    console.log(team);
                    teamModel.addLogo(file, team.id_team)
                        .then((update) => {
                            console.log(update);
                            console.log("Add Log Success")
                        })
                        .then((err) => {
                            console.log(err);
                        })
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        console.log(file);
    });
};

addLogo();