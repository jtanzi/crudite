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
    contains: { type: Array, "default": [] },
    category: String
})

//Edit function
schema.statics.edit = function(req, callback) {
  var id = req.params.id;
  console.log("recipe schema function call: " + id);
  var body = req.body;
  console.log(body);
  var num = 0;
  ingArray = [];
  containsArray = [];
  for (var key in body) {

   // console.log(num);
   if (body.hasOwnProperty(key) && key.substring(0,4) == 'ing_') {
     // console.log(!body[key]);
     if(key == 'ing_' + num + '_num' && body[key]) {
       var ingObject = {};
       ingObject.num = body[key];
     }
     if(key == 'ing_' + num + '_units') {
       console.log(key);
       if(body[key]) {
         console.log(body[key]);
         ingObject.unit = body[key];
       }
       else {
         ingObject.unit = '';
       }
     }
     if(key == 'ing_' + num + '_thing' && body[key]) {
       ingObject.thing = body[key];
       containsArray.push(body[key]);
       num++;
       ingArray.push(ingObject);
     }
    }
  }
  var update = {};
  update.title = req.body.title;
  console.log(update.title);
  update.author = req.body.author;
  console.log(update.author);
  console.log(ingArray);
  update.ingredients = ingArray; 
  update.prep_time = req.body.prep_time;
  update.instructions = req.body.instructions;
  update.contains = containsArray;
  update.category = req.body.category;  //TODO

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
