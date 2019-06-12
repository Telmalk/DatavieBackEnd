const request = {
    BAD_REQUEST: "Une erreur est survenue",
    PAGE_NOT_FOUND: "Page introuvable",
    ELEMENT_NOT_FOUND: "Element introuvable",
    SERVER_ERROR: "Une erreur est survenue",
    PLAYER_NOT_FOUND: "Player Not Found",
    RESPONSE_OK: "OK",
    IMAGE_NOT_FOUND: "Image Not Found",
    INVALID_PARAMETER: "Invalid Parameter"
};

const route = {
    // Player Info
    SEARCH_PLAYER: "/search/:year/:player",
    PLAYER_STAT: "/player/:id_player_stat"

};

const host = {
    HOST: "http://localhost",
    PORT: "8080",
    IMAGE_URL: "images/nba_image/"
};

const error = {
    NOT_FOUND: "Not Found",
    INVALID_PARAMETER: "Invalid parameters",
    PLAYER_NOT_FOUND: "Player Not Found"
};

exports.request = request;
exports.route = route;
exports.host = host;
exports.error = error;