//Dependencies and Variables
var express = require("express");
var exphbs = require ("express-handlebars");
var app = express();
var port = process.env.PORT || 8080;

//For Express to parse JSON 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars as the view engine and static content from the public folder
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// // Override with POST having ?_method=DELETE
// app.use(methodOverride('_method'));

//Routes for server access
var routes = require('./controllers/burgers_controllers.js');
app.use(routes); //('/')

//Set up for server to listen to client requests
app.listen(port, function() {
  console.log("listening on port: ", port);
});