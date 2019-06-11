const request = {
    BAD_REQUEST: "Une erreur est survenue",
    PAGE_NOT_FOUND: "Page introuvable",
    ELEMENT_NOT_FOUND: "Element introuvable",
    SERVER_ERROR: "Une erreur est survenue",
    RESPONSE_OK: "OK"
};

const route = {
    // Players
    PLAYER_ADD: "/player/add",
    PLAYER_LIST: "api/player/list/:id",
    ALL_PLAYER: "/api/players/listall",

    // Player Info
    PLAYER_INFO_ADD: "/player/info/add",
    PLAYER_INFO_LIST: "/api/player/info/:id",

    // Teams
    TEAMS_ADD: "/team/add",
    TEAM_LIST: "/api/team/list/:id",
    TEAM_LIST_ALL: "/api/teams/listall",

    // Season
    SEASON_ADD: "/season/add",
    SEASON_LIST: "/api/season/list/:year",
    SEASON_LIST_ALL: "/api/seasons/listall",

};

const host = {
    HOST: "http://localhost",
    PORT: "8080",
    IMAGE_URL: "images/nba_image/"
};

exports.request = request;
exports.route = route;
exports.host = host;