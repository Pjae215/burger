//Dependencies and Variables
var orm = require("../config/orm.js");

//Creating the burger object
var burger = {

  selectAll: function(cb) {
    console.log('burger model select all')
    orm.selectAll('burgers', function(res) {
        cb(res);
    });
},
// The variables cols and vals are arrays.
insertOne: function(cols, vals, cb) {
    console.log('burger model insert one')
    orm.insertOne('burgers', cols, vals, function(res) {
        cb(res);
    });
},
updateOne: function(objColVals, condition, cb) {
    console.log('burger model update one')
    orm.updateOne('burgers', objColVals, condition, function(res) {
        cb(res);
    });
},
deleteOne: function(condition, cb) {
    console.log('burger model delete one')
    orm.deleteOne('burgers', condition, function(res) {
        cb(res);
    });
}
};
  // Export the database functions for the controller file (burgers_controller.js).
  module.exports = burger;