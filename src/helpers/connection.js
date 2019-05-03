const mysql = require("mysql");

const connection = mysql.createConnection({
   host: "localhost",
   user: "user",
   password: "123",
   database: "nba_stats"
});

connection.connect((err) => {
   if (err) {
       console.error("Error connecting " + err.stack);
       return err;
   } else {
       console.log("connection good");
   }
});

exports.connection = connection;