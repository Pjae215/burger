//Dependencies and Variables
var express = require("express");
var router = express.Router();
var burgers = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
// router.get('/', function(req, res){
// 	res.redirect('/burgers')
// });
router.get("/", function(req, res) {
  burgers.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers", function(req, res) {
  burgers.create([
     "burger_name"
   ], [
     req.body.burger_name
   ], function(result) {
     // Send back the ID of the new quote
     res.json({id: result.insertId });
    
   });
 });


router.put("/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.update({
    devoured: true}, 
    condition, function(result) {
    res.redirect('/');
  });
});



module.exports = router;