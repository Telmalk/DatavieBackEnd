const conn = require("../helpers/connection").connection;
const error = require("../helpers/constant").error;

module.exports = {
    add: (dataTeam) => {
        return new Promise((resolve, reject) => {
            let sql = `
                INSERT INTO
                  team
                SET 
                  name = ?,
                  short_name = ?,
                  logo = ?;
            `;
            conn.query(sql, [dataTeam.name, dataTeam.short_name, dataTeam.logo || null], (err, dataInsertTeam) => {
                if (err)
                    return reject(error.INVALID_PARAMETER);
                return resolve(dataInsertTeam);
            })
        })
    },

    addLogo: (imgName, idTeam) => {
        return new Promise((resolve, reject) => {
            let sql = `
                UPDATE
                  team
                SET
                  logo = ?
                WHERE
                  id_team = ?;
            `;
            conn.query(sql, [imgName, idTeam], (err, update) => {
                if (err)
                    return reject(err);
                if (update.affectedRows === 0)
                    return reject(error.NOT_FOUND);
                return resolve(update);
            })
        })
    },

    selectByTeam: (team) => {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT
                    id_team, 
                    name,
                    short_name,
                    logo                  
                FROM
                  team
                WHERE
                  short_name = ?;
            `;
            conn.query(sql, [team], (err, team) => {
                if (err)
                    return reject(err);
                if (typeof team === "undefined" || team.length === 0) {
                    return reject(error.NOT_FOUND);
                }
                return resolve(team[0])
            })
        })
    }
};