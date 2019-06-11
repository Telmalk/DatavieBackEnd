const host = require("./constant").host;

module.exports = {
    makeImgaeUrl: (imgUrl) => {
        return host.HOST + ":" + host.PORT + "/" + host.IMAGE_URL + imgUrl;
    },
};