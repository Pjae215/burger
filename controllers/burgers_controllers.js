//Dependencies and Variables
var express = require("express");
var router = express.Router();
var burgers = require("../models/burger.js");

//Get route for getting data from client
router.get("/", function(req, res) {
  burgers.all(function(data) {
    var hbsObject = {
      burgers: data
    };

    console.log(hbsObject);
//Handlebars dispay
    res.render("index", hbsObject);
  });
});
//Post route for posting client data to database and creating the PM key
router.post("/burgers", function(req, res) {

  burgers.create([
     "burger_name"
   ], [
     req.body.burger_name
   ], function(result) {
     
res.json({id: result.insertId });
    
   });
 });

//Put route for updating the availability of each ID
router.put("/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.update({
    devoured: true}, 
    condition, function(result) {
    res.redirect('/');
  });
});

//Export of file to use as dependencies

module.exports = router;