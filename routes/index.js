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
    Recipe.find({}, {"title": "title", "category": "category"}).exec(function(err, recipes) {
      if (err) return next(err);
      // console.log(recipes);
      var categories = ["entree", "salads", "soups/stews", "slow cooker", "raw", "desserts", "snacks"];
      plannerArray = [];
      var a = categories.length;
      var i = 0;
      for(i = 0; i < a; i+=1 ) {
        arrayItem = {
          category: categories[i],
          recipes: []
          };
        arrayItem.recipes = recipes.filter( function(recipe) { return recipe.category == categories[i]; });
        plannerArray.push(arrayItem);
        };
        console.log(plannerArray);
      res.render('planner.jade', { categories: plannerArray } );
    });
});


  // Recipe CRUD operations
  recipes(app);

  // Error handling
  errors(app);
}
