const csvToJson = require("csvtojson");
const teamModel = require("../model/Team");
const fs = require("fs");

module.exports  = {
    addTeam: () => {
        const csvPathFile = "C:\\Users\\cleme\\Desktop\\testCSVnodejs\\DataNba\\StatTeam\\short_name_team.csv";
        csvToJson({
                delimiter: ";"
            }
        ).fromFile(csvPathFile).then((result) => {
            console.log(result);
            result.forEach((row) => {
                row.name = row.name.toLowerCase();
                row.name = row.name.replace(" ", "");
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

    addLogo: () => {
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

};