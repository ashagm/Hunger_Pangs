$(document).ready(function() {
	// Enter location - receive restuarant recommendations based on user input
	// See phone number, website, ratings
	// Integrate with Google maps using latitude/longitude inputs
	// ONLY places to eat, limit results to 10, within 1 mile of userLocation


	let userLocation =  $('#add-btn').on('click', function(event) {
		event.preventDefault();		
		$('#user-input').val().trim();
	})

	const queryURL = "https://api.yelp.com/v3/businesses/search?location=" + userLocation + "limit=10radius=1610categories=restaurants,all";
	const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';
	
	console.log(userLocation);
	console.log(queryURL);	

	$.ajax({
		url: proxyUrl + queryURL,
		headers: {
			authorization: 'Bearer ' + "OZscrgovCzS7QRiOySG6zhu4i9R9LMeQLYN-EtOXvZ8WdyiYup_NGlDDPq-50il_VHt1nd3QPmN0Oq8xW7JkvGuiucxkFmzqJ2Bmh6G7BghJIPIi0CBy3UxsZwJYWnYx"
		}
	})

	.done(response => {
		console.log(response);
		const results = response.data;

		for (let i = 0; i < results.length; i++) {
			const restaurantName = results[i].businesses.name;
			const restuarantDistance = results[i].businesses.distance;
			const restuarantPhone = results[i].businesses.phone;
			const restaurantRating = results[i].businesses.rating;
			const restaurantImg = $('<img>');
			restaurantImg.addClass('restaurant-img');
			$('#content-results').append(restaurantName);
			$('#content-results').append(restuarantDistance);
			$('#content-results').append(restuarantPhone);
			$('#content-results').append(restaurantRating);
			$('#content-results').append(restaurantImg);
		};
	});

	.catch(error => {
		console.error(error);
	});

})	