$(document).ready(function(){
	$("#results-page").hide();

	$("#add-btn").on('click', function (event) {
		event.preventDefault();
		$("#results-page").show(); 
		
		if($('#user-input').val() === ''){
			return false;
		} else {
			localStorage.clear();
      		localStorage.setItem("input-address", $('#user-input').val());

			$('html,body').animate({
				scrollTop: $("#results-page").offset().top},
				'slow');
			
			$('#page-input').val(localStorage.getItem("input-address"));

			drawInitMap(); //todo - not doing here keeps the map blank
			getYelpResults();
			// getYelpSearchResults();
		}
	});

	$("#back2Top").click(function(event) {
		event.preventDefault();
		localStorage.clear();
		$("html, body").animate({ 
			scrollTop: 0 }, "slow");
		return false;
	});

	$("#page-btn").on('click', function(event){
		event.preventDefault();

		if($('#page-input').val() === ''){
			return false;
		} else {
			localStorage.clear();
      		localStorage.setItem("input-address", $('#page-input').val());

			drawInitMap(); 
			getYelpResults();
			// getYelpSearchResults();
		}

	});

	$("#content-results").on('click', '.direction', function(){
		let latitude = $(this).attr('data-lat');
		let longitude = $(this).attr('data-long');

		let directionsId = $(this).siblings('div').attr('id');

		let origin = localStorage.getItem("input-address");
				
		getAddress(latitude, longitude, function(destination){
			getDirections(origin, destination, directionsId);
		});

	});

	$("#number-menu .dropdown-item").on('click', function(event){
		event.preventDefault();
		$("#selected-value").text($(this).text()); 
		numOfResults = $(this).text();
		drawInitMap(); 
		getYelpResults();
		// getYelpSearchResults();
	});

	$("#food-menu .dropdown-item").on('click', function(event){
		event.preventDefault();
		$("#selected-food").text($(this).text()); 
		localStorage.setItem("input-category", $(this).text());
		drawInitMap(); 
		getYelpResults();
		// getYelpSearchResults();
	});
	
});
