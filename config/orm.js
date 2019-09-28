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
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
// Create function to insert string into a single row in the target table
  create: function(table, cols, vals, cb) {

		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    
    console.log(vals.length);
		console.log(queryString);

//Executes db query and returns callback
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

//Update table function
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

};
// Export the orm object for the model file (burger.js).
module.exports = orm;
