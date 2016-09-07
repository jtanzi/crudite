var ingredientList = [];
const INGINPUTCOUNT = 20;


$(document).ready(function() {

  $('.recipe_list_body').hide();

  $('.category_list_item').on('click', function() {
    $(this).children('.recipe_list_body').slideToggle(300, function(){
      //Animation complete
    });
  });
  
  //Hide all but 5 ingredient input rows on create page
  $('.ing-input-wrapper').slice(5).hide();
  
  // Show 5 more ingredient rows when clicking Add More button
  var addIngRowNum = 5;
  $('#add_ing_rows').click( function() {
    console.log(addIngRowNum);
    var num = addIngRowNum;
    
    $('.ing-input-wrapper').slice(num, num + 5)
      .slideDown(300, function() {
        
    });
    addIngRowNum += 5;
    $("#add-more-wrapper").insertAfter("#ing10");
  });
})

function addIngInputRow() {
  // Define HTML to be added
  var id = 'ing' + ing_input_num;
  var html = "<div class='row'>  <div id='recipe-create-ing-input' class='col-md-8'>    <input id=" + id + " type='number' placeholder=' # of ' class='inginput1'/>    <select class='inginput2'>      <option value=''>-- Select Unit --</option>      <option>cups</option>      <option>tbsp</option>      <option>tsp</option>      <option>oz</option>      <option>lb(s)</option>      <option>kg</option>      <option>inch(es)</option>      <option>fl oz</option>    </select>    <input id='ing_1' type='text' placeholder=' Type ' class='inginput3'/>  </div></div>";
  console.log(html);
  // Append to the appropriate element
}



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
    url: '/recipe/planner/' + recipeId,
    context: document.body,
    dataType: 'json',
    success: function (data) {
      var ingArray = data.ingredients.map(function(item) {
        return item.thing;
      });
      var tempArray = ingredientList.concat(ingArray);
      var uniqueArray = tempArray.filter(function(item, pos) {
        return tempArray.indexOf(item) == pos;
      });
      for(var i = 0; i < uniqueArray.length; i += 1) {
        $('.grocery-list').append("<li class='list-group-item grocery-item'>" + uniqueArray[i] + '</li>');
      }
    },
    error: function (error) {
      console.log(error);
    }
  })
  

});
