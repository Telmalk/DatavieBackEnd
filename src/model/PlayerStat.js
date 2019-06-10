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
                  id_team = ?,
                  id_player = ?,
                  id_season = ?;
            `;

            conn.query(sql, [
                dataPlayerStat.post,
                dataPlayerStat.points,
                dataPlayerStat.three_point_attempts,
                dataPlayerStat.three_points,
                dataPlayerStat.minute_played,
                dataPlayerStat.two_point_attempts,
                dataPlayerStat.two_points,
                dataPlayerStat.field_goal_attemps,
                dataPlayerStat.field_goal,
                dataPlayerStat.free_throw_attempts,
                dataPlayerStat.free_throw,
                dataPlayerStat.offensive_rebound,
                dataPlayerStat.defensive_rebound,
                dataPlayerStat.three_points_percent,
                dataPlayerStat.field_goal_pourcent,
                dataPlayerStat.two_point_percent,
                dataPlayerStat.turnover,
                dataPlayerStat.assist,
                dataPlayerStat.game_started,
                dataPlayerStat.block,
                dataPlayerStat.id_team,
                dataPlayerStat.id_player,
                dataPlayerStat.season
            ],(err, playerStatInsertData) => {
                if (err)
                    return reject("Invalid parameters");
                return resolve(playerStatInsertData);
            }) ;
        })
    }
}