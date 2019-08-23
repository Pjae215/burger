// Dependencies and Variables
let express = require("express");
let exphbs = require("express-handlebars");

let app = express();

//To use the static content from the "public" directory
app.use(express.static("public"));

//To use express for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//To connect server to handlebars and set the view to the default layout 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

