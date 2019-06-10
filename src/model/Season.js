const conn = require("../helpers/connection").connection;

module.exports = {
    add: (seasonYear) => {
        return new Promise((resolve, reject) => {
            let sql = `
                INSERT INTO
                  season
                SET
                  season_year = ?;
            `;

            conn.query(sql, [seasonYear], (err, resultInsertSeason) => {
                if (err)
                    return reject("bad parameters");
                return resolve(resultInsertSeason);
            })
        })
    }
};