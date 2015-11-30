//Recipe model definition

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Schema definition
var schema = mongoose.Schema({
    title: { type: String, trim: true },
    author: { type: String, trim: true },
    ingredients: { type: Array, "default": [] },
    prep_time: { type: Number, default: 15 }, //minutes
    instructions: String,
    contains: { type: Array, "default": [] }
})

//Edit function - TODO: Fix failure to pull parameters from form
schema.statics.edit = function(req, callback) {
  var id = req.params.id;
  console.log("recipe schema function call; " + id);

  var update = {};
  update.title = req.params.title;
  update.author = req.params.author;
  //update.ingredients = req.params.ingredients;
  update.prep_time = req.params.prep_time;
  update.instructions = req.params.instructions;

  this.update({_id: id}, update, function(err, numAffected) {
    if (err) return callback(err);

    if (0 === numAffected) {
      return callback(new Error('No match for recipe id'));
    }

    callback();
  })
}

//Export Recipe module to make available to others
var Recipe = mongoose.model('Recipe', schema);
module.exports = Recipe;
