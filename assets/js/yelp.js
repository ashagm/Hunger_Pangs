$(document).ready(function() {
	// Enter location - receive restuarant recommendations based on user input
	// See phone number, website, ratings
	// Integrate with Google maps using latitude/longitude inputs
	// ONLY places to eat, limit results to 10, within 1 mile of userLocation


	$('#user-input').submit(function(event) {
		let userLocation = $('#add-btn').val().trim();
		event.preventDefault();
	})

	const queryURL = "https://api.yelp.com/v3/businesses/search?location=" + userLocation;
	const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';
	
	console.log(userLocation);	

	$.ajax({
		url: proxyUrl + queryURL,
		headers: {
			authorization: 'Bearer ' + //insert Yelp api
	})

	.done(response => {
		console.log(response);
	})

	.catch(error => {
		console.error(error);
	});

})	