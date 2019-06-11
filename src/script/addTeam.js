const csvToJson = require("csvtojson");
const teamModel = require("../model/Team");
const fs = require("fs");

//module.exports  = {
    addTeam= () => {
        const csvPathFile = "../../assets/stat/short_name_team.csv";
        csvToJson({
                delimiter: ";"
            }
        ).fromFile(csvPathFile).then((result) => {
            console.log(result);
            result.forEach((row) => {
                if (row.name && row.name !== "")
                    row.name = row.name.toLowerCase();
                teamModel.add(row)
                    .then(() => {
                    console.log("succesFull");
                })
                    .catch(() => {
                    console.error("Err");
                });
            })
        }).catch((err) => {
            console.log(err);
        });
    },

    addLogo= () => {
        const teamImageFoler = "../../assets/images/nba_image";
        fs.readdirSync(teamImageFoler).forEach(file => {
            if (fs.lstatSync(teamImageFoler + "/" + file).isFile()) {
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
    }

//};
//addTeam();
addLogo();