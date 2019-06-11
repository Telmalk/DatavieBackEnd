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

    addPicture: (pictureUrl, idPlayer) => {
        return new Promise((resolve, reject) => {
            let sql = `
                UPDATE
                  player
                SET
                  picture = ?
                WHERE
                  id_player = ?;
            `;

            conn.query(sql, [pictureUrl, idPlayer], (err, res) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(res);
            })
        })
    },

    selectByPlayerName: (playerName, season) => {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT
                  id_player,
                  name
                FROM
                  player
                WHERE
                  name = ?;
            `;

            conn.query(sql, [playerName], (err, player) => {
                //console.log(playerName);
                if (err)
                    return reject("Bad parameters");
                if (player[0] === "" || typeof player[0] === "undefined")
                    return reject("not exist");
                return resolve(player[0]);
            })
        });
    },

};