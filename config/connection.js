// Set up MySQL connection.
var mysql = require("mysql");
var connection = null;

if (process.env.database) {
  connection = mysql.createConnection({
    host: process.env.dbhost,

    // Your port; if not 3306
    port: process.env.dbport,

    // Your username
    user: process.env.dbuser,

    // Your password
    password: process.env.pw,
    database: process.env.database
  });
} else {
  var creds = require("../creds.json");

  connection = mysql.createConnection({
    host: creds.host,

    // Your port; if not 3306
    port: creds.port,

    // Your username
    user: creds.user,

    // Your password
    password: creds.pw,
    database: creds.database
  });
}

// Make connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
