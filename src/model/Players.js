    const conn = require("../helpers/connection").connection;

module.exports = {
    add: (playerData) => {
        return new Promise((resolve, reject) => {
            let sql = `
                INSERT INTO
                  player
                SET 
                  name = ?,
                  birth_year = ?,
                  college = ?,
                  height = ?,
                  weight = ?
            `;
            conn.query(sql, [
                playerData.name,
                playerData.birth_year,
                playerData.college,
                playerData.height,
                playerData.weight
            ], (err, resultInsertPlayer) => {
                if (err) {
                    console.log(err);
                    return reject("Invalid parameters");
                }
                return resolve(resultInsertPlayer);
            })
        });
    },

    selectByPlayerName: (playerName) => {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT
                  id_player
                FROM
                  player
                WHERE
                  name = ?;
            `;

            conn.query(sql, [playerName], (err, player) => {
                if (err)
                    return reject("Bad parameters");
                if (player[0] === "" || typeof player[0] === "undefined")
                    return resolve("not exist");
                return resolve(player[0]);
            })
        });
    }

};