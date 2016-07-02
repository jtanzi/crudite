

$(document).ready(function() {
  $("#recipe_list_body").hide();
})

$("#recipe_list_item").mouseover(function() {
  $("#recipe_list_body").slideDown(500, function(){
    //Animation complete
  });
});
