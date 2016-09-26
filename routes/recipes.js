//Routing module for recipes


//Declarations
var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');
const INGREDIENT_COUNT = 20;

module.exports = function (app) {

  //***CRUD Operations***

  // Create
  app.get("/recipe/create", function(req, res) {
    res.render('recipe/create.jade');
  })

  app.post("/recipe/create", function(req, res, next) {
     var body = req.body;
    var num = 1;
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
          if(body[key]) {
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
    var title = req.body.title;
    var author = req.body.author;
    var prep_time = req.body.prep_time;
    var instructions = req.body.instructions;
    var category = req.body.category;

    Recipe.create({
      title: title,
      author: author,
      prep_time: prep_time,
      ingredients : ingArray,
      contains: containsArray,
      instructions: instructions,
      category: category
     }, function (err, recipe) {
       if (err) return next(err);
       console.log("Created new recipe: " + title);
       res.redirect('/recipe/' + recipe.id );
    });
  })



  // Read
  app.get("/recipe/:id", function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    //var ObjectID = require('mongodb').ObjectID; //Convert id as string to ObjectID for mongoDB query

    //Recipe.findOne({_id: new ObjectID(id)}, function (err, recipe) {
    Recipe.findById(id, function (err, recipe) {
      if (err) return next(err);

      if (!recipe) return next(); // 404
      //console.log('%s', recipe.title);
      //console.log('%s', recipe.instructions);
      res.render('recipe/view.jade', { recipe: recipe });
    })
  })
  
  // Planner 
  app.get("/recipe/planner/:id", function (req, res, next) {
    var id = req.params.id;
    Recipe.findById(id, function (err, recipe) {
      if(!recipe) {
        res.send(err);
        return next(err);
      } 
      res.send(recipe);
    })
  })


  // Update
  app.get("/recipe/update/:id", function(req, res) {
    var id = req.params.id;
    var ingredients = Recipe.findById(id).ingredients;
    console.log("ingredients" + ingredients);
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

//Search
  app.post("/search", function(req, res) {
    Recipe.find({
      "$text": {
        "$search": req.body.query
        }
      },
      {
       document: 1,
       created: 1,
       _id: 1,
       textScore: {
         $meta: "textScore"
       }
     },
     {
   sort: {
     textScore: {
       $meta: "textScore"
      }
    }
    }).toArray(function(err, items) {
      res.send(pagelist(items));
    });
  });
  
}
