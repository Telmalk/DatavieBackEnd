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
                    id_player_stat,
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
    },

    selectStatPlayerBySeason: (id_playerStat) => {
        return new Promise((resolve, reject) => {
            let sql = `
              SELECT id_player_stat,
                     post,
                     points,
                     three_point_attempts,
                     three_points,
                     minute_played,
                     match_played,
                     two_point_attempts,
                     two_points,
                     field_goal_attempts,
                     field_goal,
                     free_throw_attempts,
                     free_throw,
                     offensive_rebound,
                     defensive_rebound,
                     three_points_percent,
                     field_goal_pourcent,
                     efficient_field_goal_pourcent,
                     two_point_percent,
                     turnover,
                     personal_fault,
                     assist,
                     game_started,
                     block,
                     steal,
                     p.id_player,
                     ps.id_team,
                     ps.id_season,
                     p.name,
                     birth_year,
                     college,
                     height,
                     weight,
                     picture,
                     ps.id_season,
                     s.season_year,
                     t.name,
                     t.short_name,
                     t.logo
              FROM player_stat AS ps
                     INNER JOIN player p on ps.id_player = p.id_player
                     INNER JOIN season s on ps.id_season = s.id_season
                     INNER JOIN team t on ps.id_team = t.id_team
              WHERE id_player_stat = ?;
            `;
            // 14102
            conn.query(sql, [id_playerStat], (err, result) => {
                if  (err)
                    return reject(err);
                return resolve(result[0]);
            })
        });
    },

    totalPlayerInSeason: (id_season) => {
        return new Promise((resolve, reject) => {
                let sql = `
                    SELECT
                      COUNT(id_player_stat) AS totalPlayers
                    FROM
                      player_stat
                    WHERE
                      id_season = ?;
                `;
                conn.query(sql, [id_season], (err, nbPlayer) => {
                    if (err) {
                        return reject(err);
                    }
                    if (nbPlayer.length === 0)
                        return reject("No player found");
                    return resolve(nbPlayer[0].totalPlayers);
                })
        })
    },

    rankMatchPlayed: (nbMatchPlayed, idSeason) => {
        return new Promise((resolve, reject) => {
            let sql = `
              SELECT COUNT(match_played) AS rankMatchsPlayed
              FROM player_stat
              WHERE match_played > ?
                AND id_season = ?;
            `;
            conn.query(sql, [nbMatchPlayed, idSeason], (err, rankMatchPlayed) => {
                if (err)
                    return reject(err);
                if (rankMatchPlayed.length === 0)
                    return resolve(1);
                return resolve(rankMatchPlayed[0].rankMatchsPlayed);
            })
        });
    },

    rankMinutePlayed: (nbMinutePlayed, idSeason) => {
        return new Promise((resolve, reject) => {
            let sql = `
              SELECT COUNT(minute_played) AS rankMinutesPlayed
              FROM player_stat
              WHERE minute_played > ?
                AND id_season = ?;
            `;
            conn.query(sql, [nbMinutePlayed, idSeason], (err, rankMinutePlayed) => {
                if (err)
                    return reject(err);
                if (rankMinutePlayed.length === 0)
                    return resolve(1);
                return resolve(rankMinutePlayed[0].rankMinutesPlayed);
            })
        })
    },

    randAssist: (nbAssist, id_season) => {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT
                  COUNT(assist) AS rankAssits
                FROM
                  player_stat
                WHERE
                  assist > ?
                AND
                    id_season = ?;
            `;
            conn.query(sql, [nbAssist, id_season], (err, rankAssist) => {
                if (err)
                    return reject(err);
                if (rankAssist[0].rankAssits === 0)
                    return resolve(1);
                return resolve(rankAssist[0].rankAssits);
            })
        })
    },

    rankPoint: (nbPoints, id_season) => {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT
                  COUNT(points) AS rankPoints
                FROM
                  player_stat
                WHERE
                  points > ?
                AND
                  id_season = ?;
            `;
            conn.query(sql, [nbPoints, id_season], (err, rankPoints) => {
                if (err)
                    return reject(err);
                if (rankPoints.length === 0)
                    return resolve(1);
                console.log(rankPoints[0].rankPoints);
                return resolve(rankPoints[0].rankPoints);
            })
        })
    }
};