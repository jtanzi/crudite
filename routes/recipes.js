//Routing module for recipes


//Declarations
var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

module.exports = function (app) {

  //***CRUD Operations***

  // Create
  app.get("/recipe/create", function(req, res) {
    res.render('recipe/create.jade');
  })

  app.post("/recipe/create", function(req, res, next) {
    var title = req.body.title;
    var author = req.body.author;
    var prep_time = req.body.prep_time;
    //TODO: Refactor code to use varying number of inputs for ingredients
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
    var instructions = req.body.instructions;

    Recipe.create({
      title: title,
      author: author,
      prep_time: prep_time,
      ingredients : [ing_1_num + " " + ing_1_units + " " + ing_1_thing,
        ing_2_num + " " + ing_2_units + " " + ing_2_thing,
        ing_3_num + " " + ing_3_units + " " + ing_3_thing,
        ing_4_num + " " + ing_4_units + " " + ing_4_thing,
        ing_5_num + " " + ing_5_units + " " + ing_5_thing],
      contains: [ing_1_thing, ing_2_thing, ing_3_thing, ing_4_thing, ing_5_thing],
      instructions: instructions
     }, function (err, recipe) {
       if (err) return next(err);
       console.log("Created new recipe: " + title);
       res.redirect('/recipe/' + recipe.id );
    });
  })



  // Read
  app.get("/recipe/:id", function (req, res, next) {
    var id = req.params.id;
    //console.log(id);
    var ObjectID = require('mongodb').ObjectID; //Convert id as string to ObjectID for mongoDB query

    Recipe.findOne({_id: new ObjectID(id)}, function (err, recipe) {
      if (err) return next(err);

      if (!recipe) return next(); // 404
      //console.log('%s', recipe.title);
      //console.log('%s', recipe.instructions);
      res.render('recipe/view.jade', { recipe: recipe });
    })
  })


  // Update
  app.get("/recipe/update/:id", function(req, res) {
    var id = req.params.id;
    //console.log("Update record " + id);
    res.render('recipe/edit.jade', {
      recipe: Recipe.findById(id)
    });
  })

  app.post("/recipe/update/:id", function(req, res, next) {
    var title = req.body.title;
    console.log("Put received for recipe " + title);
    Recipe.edit(req, function(err) {
      if (err) return next(err);
      res.redirect("/recipe/"+ req.params.id);
    })
  })

  // Delete
  app.post("/recipe/delete/:id", function(req, res) {
    var id = req.params.id;
    console.log("Delete request for " + id);
    Recipe.remove({_id: id }, function(err, removed) {
      if(!err) {
        console.log("Deleting " + removed + "records");
      } else {
        console.log("Error: " + err);
      }
    });
    res.redirect('/');
  })


}