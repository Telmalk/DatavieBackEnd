const fs = require("fs");

const testFolder = "../../assets/images/nba_image";

fs.readdirSync(testFolder).forEach(file => {
    console.log(file);
});
