//Dependencies and Variables
var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// // Create all our routes and set up logic within those routes where required.
// GET - selectAll
router.get('/', function(req, res) {
  res.redirect('/burgers');
});

router.get('/burgers', function(req, res) {
  burger.selectAll(function(data) {
      var hbsObject = {
          burgers: data
      };
      console.log(hbsObject);
      res.render('index', hbsObject);
  });
});


// Add new burger to the db.
router.post("/burgers", function(req, res) {
  burger.insertOne([
      "burger_name", "devoured"
  ], [
      req.body.burger_name, req.body.devoured
  ], function(result) {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
  });
});

// Set burger devoured status to true.
router.put("/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
      devoured: req.body.devoured
  }, condition, function(result) {
      if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404.
          return res.status(404).end();
      } else {
          res.status(200).end();
      }
  });
});

// Delete burger from db.
router.delete("/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);

  burger.deleteOne(condition, function(result) {
      if (result.affectedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404.
          return res.status(404).end();
      } else {
          res.status(200).end();
      }
  });
});


//Export for server to use

module.exports = router;