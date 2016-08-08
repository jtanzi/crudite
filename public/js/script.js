var ingredientList = [];

$(document).ready(function() {
  $(".recipe_list_body").hide();

  $(".category_list_item").on("click", function() {
    $(this).children(".recipe_list_body").slideToggle(300, function(){
      //Animation complete
    });
  });
})

var drake = dragula({
  isContainer: function(el) {
    return el.classList.contains('dragula-container');
  },
  direction: 'vertical',
  copy: true,
  revertOnSpill: true,
  removeOnSpill: false
});

drake.on ('drop', function (el, target, source, sibling) {
  // console.log(el.getAttribute('data-recipeId'));
  var recipeId = el.getAttribute('data-recipeId');
  $.ajax({
    url: "/recipe/planner/" + recipeId,
    context: document.body,
    dataType: "json",
    success: function (data) {
      var ingArray = data.ingredients.map(function(item) {
        return item.thing;
      });
      var tempArray = ingredientList.concat(ingArray);
      var uniqueArray = tempArray.filter(function(item, pos) {
        return tempArray.indexOf(item) == pos;
      });
      for(var i = 0; i < uniqueArray.length; i += 1) {
        $('.grocery-list').append("<li class='list-group-item grocery-item'>" + uniqueArray[i] + "</li>");
      }
    },
    error: function (error) {
      console.log(error);
    }
  })
  

});
