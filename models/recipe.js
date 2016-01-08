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

//Edit function
schema.statics.edit = function(req, callback) {
  var id = req.params.id;
  console.log("recipe schema function call: " + id);
  var ing_1_num = req.body.ing_1_num;
  var ing_1_units = req.body.ing_1_units;
  var ing_1_thing = req.body.ing_1_thing;
  var ing_2_num = req.body.ing_2_num;
  var ing_2_units = req.body.ing_2_units;
  var ing_2_thing = req.body.ing_2_thing;
  var ing_3_num = req.body.ing_3_num;
  var ing_3_units = req.body.ing_3_units;
  var ing_3_thing = req.body.ing_3_thing;
  var ing_4_num = req.body.ing_4_num;
  var ing_4_units = req.body.ing_4_units;
  var ing_4_thing = req.body.ing_4_thing;
  var ing_5_num = req.body.ing_5_num;
  var ing_5_units = req.body.ing_5_units;
  var ing_5_thing = req.body.ing_5_thing;
  var update = {};
  update.title = req.body.title;
  console.log(update.title);
  update.author = req.body.author;
  console.log(update.author);
  update.ingredients = [ing_1_num + " " + ing_1_units + " " + ing_1_thing,
    ing_2_num + " " + ing_2_units + " " + ing_2_thing,
    ing_3_num + " " + ing_3_units + " " + ing_3_thing,
    ing_4_num + " " + ing_4_units + " " + ing_4_thing,
    ing_5_num + " " + ing_5_units + " " + ing_5_thing];
  update.prep_time = req.body.prep_time;
  update.instructions = req.body.instructions;
  update.contains = [ing_1_thing, ing_2_thing, ing_3_thing, ing_4_thing, ing_5_thing];

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
