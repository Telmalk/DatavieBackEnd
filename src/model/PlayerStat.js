const conn = require("../helpers/connection").connection;

module.exports = {
    add: (dataPlayerStat) => {
        return new Promise((resolve, reject) => {
            let sql = `
                INSERT INTO
                  player_stat
                SET
                  post = ?,
                  points = ?,
                  three_point_attempts = ?,
                  three_points = ?,
                  minute_played = ?,
                  match_played = ?,
                  two_point_attempts = ?,
                  two_points = ?,
                  field_goal_attempts = ?,
                  field_goal = ?,
                  free_throw_attempts = ?,
                  free_throw = ?,
                  offensive_rebound = ?,
                  defensive_rebound = ?,
                  three_points_percent = ?,
                  field_goal_pourcent = ?,
                  two_point_percent = ?,
                  turnover = ?,
                  assist = ?,
                  game_started = ?,
                  block = ?,
                  steal = ?,
                  efficient_field_goal_pourcent = ?,
                  personal_fault = ?,
                  id_team = ?,
                  id_player = ?,
                  id_season = ?;
            `;

            conn.query(sql, [
                dataPlayerStat.post || 0,
                dataPlayerStat.points || 0,
                dataPlayerStat.three_point_attempts || 0,
                dataPlayerStat.three_points || 0,
                dataPlayerStat.minute_played || 0,
                dataPlayerStat.match_played || 0,
                dataPlayerStat.two_point_attempts || 0,
                dataPlayerStat.two_points || 0,
                dataPlayerStat.field_goal_attempts || 0,
                dataPlayerStat.field_goal || 0,
                dataPlayerStat.free_throw_attempts || 0,
                dataPlayerStat.free_throw || 0,
                dataPlayerStat.offensive_rebound || 0,
                dataPlayerStat.defensive_rebound || 0,
                dataPlayerStat.three_points_percent || 0,
                dataPlayerStat.field_goal_pourcent ||0,
                dataPlayerStat.two_point_percent || 0,
                dataPlayerStat.turnover || 0,
                dataPlayerStat.assist || 0,
                dataPlayerStat.game_started || 0,
                dataPlayerStat.block || 0,
                dataPlayerStat.steal || 0,
                dataPlayerStat.efficient_field_goal_pourcent || 0,
                dataPlayerStat.personal_fault || 0,
                dataPlayerStat.id_team || 0,
                dataPlayerStat.id_player || 0,
                dataPlayerStat.id_season || 0
            ],(err, playerStatInsertData) => {
                if (err) {
                    console.log(err);
                    return reject("Invalid parameters");
                }
                return resolve(playerStatInsertData);
            }) ;
        })
    },
    search: (playerName, season) => {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT
                    p.id_player,
                    p.name,
                    p.picture,   
                    s.id_season,
                    s.season_year
                FROM
                     player_stat
                INNER JOIN player p on player_stat.id_player = p.id_player
                INNER JOIN season s on player_stat.id_season = s.id_season
                WHERE
                  p.name
                LIKE
                  CONCAT('%', ?, '%')
                AND
                    s.season_year = ?;
            `;
            conn.query(sql, [playerName, season], (err, player) => {
                if (err)
                    return reject(err);
                if (player.length === 0)
                    return reject("Not found");
                return resolve(player);
            })
        })
    }
}