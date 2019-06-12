const csvToJson = require("csvtojson");
const teamModel = require("../model/Team");

const addTeam= () => {
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
};

addTeam();
