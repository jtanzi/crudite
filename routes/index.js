//Index routing module for home page

var errors = require('./errors');
var mongoose = require('mongoose');
var recipes = require('./recipes');
var Recipe = mongoose.model('Recipe');

module.exports = function (app) {

  // home page
  app.get('/', function (req, res, next) {
    Recipe.find({}, {"title":"title", "ingredients":"ingredients", "instructions":"instructions"}).limit(10).exec(function(err, recipes){
      if (err) return next(err);
      //Output recipes to webpage
      res.render('home.jade', { recipes: recipes, scripts: ['scripts/script.js'] });
    })
  })

  //Planner
  app.get('/planner', function(req, res, next) {
    Recipe.find({category: "soups/stews"}, {"title": "title"}).exec(function(err, recipes) {
      if (err) return next(err);
      res.render('planner.jade', { recipes: recipes } );
    })
  })


  // Recipe CRUD operations
  recipes(app);

  // Error handling
  errors(app);
}
