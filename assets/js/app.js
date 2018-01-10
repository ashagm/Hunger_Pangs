$(document).ready(function(){
  $("#results-page").hide();
});

$("#add-btn").on('click', function (event) {
    event.preventDefault();
   $("#results-page").show(); 
  $('html,body').animate({
    scrollTop: $("#results-page").offset().top},
  'slow');
});