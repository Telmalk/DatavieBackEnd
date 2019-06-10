const seasonModel = require("../model/Season");

module.exports = {
    addSeason: () => {
        let seasonBegin = 2010;
        let seasonEnd = 11;

        for (seasonBegin; seasonBegin < 2019; seasonBegin++) {
            seasonModel.add(seasonBegin.toString(10) + "-" + seasonEnd.toString(10))
                .then(() => {
                    console.log("Success")
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
};

addSeason = () => {
    let seasonBegin = 2010;
    let seasonEnd = 11;

    for (seasonBegin; seasonBegin < 2019; seasonBegin++) {
        seasonModel.add(seasonBegin.toString(10) + "-" + seasonEnd.toString(10))
            .then(() => {
                console.log("Success")
            })
            .catch((err) => {
                console.log(err);
            });
        seasonEnd++;
    }
};

addSeason();