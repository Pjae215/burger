// Dependencies and Variables
var mysql = require("mysql");

// Set up MySQL connection for local access

  var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "paula",
    database: "burgers_db"
  });

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;