//Dependencies and Variables
var connection = require("../config/connection.js");

//Function to loop through question marks (or unknown entries)a return as a string
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

//Function converts object key/value pairs to SQL syntax then pushes string to the array
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];
  
    if (Object.hasOwnProperty.call(ob, key)) {
    
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }

//Translates array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  // Display all burgers in the db.
  selectAll: function(table, cb) {
    var queryString = "SELECT * FROM " + table + ";";

    connection.query(queryString, function(err, result) {
        if (err) {
            throw err;
        }
        cb(result);
    });
},
// Add a burger to the db.
insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
        if (err) {
            throw err
        }
        cb(result);
    });
},
// Set burger devoured status to true.
updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function(err, result) {
        if (err) {
            throw err
        }
        cb(result);
    });
},
// Delete a burger from the db.
deleteOne: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function(err, result) {
        if (err) {
            throw err
        }
        cb(result);
    });
}

};


// Export the orm object for the model file (burger.js).
module.exports = orm;
