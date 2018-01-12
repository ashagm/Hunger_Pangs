$(document).ready(function(){
	$("#results-page").hide();

	$("#add-btn").on('click', function (event) {
		event.preventDefault();
		$("#results-page").show(); 
		
		if($('#user-input').val() === ''){
			return false;
		} else {
			$('html,body').animate({
				scrollTop: $("#results-page").offset().top},
				'slow');
		}
	});
});
