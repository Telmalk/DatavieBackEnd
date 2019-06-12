const conn = require("../helpers/connection").connection;
const error = require("../helpers/constant").error;

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
                    return reject(error.INVALID_PARAMETER);
                return resolve(resultInsertSeason);
            })
        })
    },

    select: (year) => {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT
                  id_season, 
                  season_year
                FROM
                  season
                WHERE
                  season_year = ?;
            `;
            conn.query(sql, [year], (err, season) => {
                if (err)
                    return reject(err);
                return resolve(season[0]);
            })
        })
    }
};