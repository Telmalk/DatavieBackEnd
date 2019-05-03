const http = require("http");

http.ServerResponse.prototype.respond = function (content, status) {
    if ('undefined' == typeof status) {
        if ('number' == typeof content || !isNaN(parseInt(content))) {
            status = parseInt(content);
            content = undefined;
        } else {
            status = 200;
        }
    }
    if (status != 200) { // error
        content = {
            "code":    status,
            "status":  http.STATUS_CODES[status],
            "message": content && content.toString() || null
        };
    }
    if ('object' != typeof content) { // wrap content if necessary
        content = {"result":content};
    }
    // respond with JSON data
    //this.setHeader("Content-Type", "application/json");
    this.status(status).send(content)
};