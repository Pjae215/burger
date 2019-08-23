// Dependencies and Variables
let mysql = require("mysql");

//To establish connection to database
let connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "paula",
    database: "burgers_db"
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId + "on port# " + port);
  });
  
//To export the connection function
module.exports = connection;