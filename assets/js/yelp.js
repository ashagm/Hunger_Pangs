	// Enter location - receive restuarant recommendations based on user input
	// See phone number, website, ratings
	// Integrate with Google maps using latitude/longitude inputs
	// ONLY places to eat, limit results to 10, within 1 mile of userLocation


	let userLocation;

	$('#add-btn').on('click', function(event) {
		event.preventDefault();		
		let userLocation = $('#user-input').val().trim();
		console.log(userLocation);

		const queryURL = "https://api.yelp.com/v3/businesses/search?location=" + userLocation + "&limit=10&radius=1610&term=food&open_now=true";
		const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';	
		$('#content-results').empty();

		$.ajax({
			url: proxyUrl + queryURL,
			headers: {
			authorization: 'Bearer ' + yelpAPI
		}
	})

		.done(response => {
			console.log(response);
			const results = response.businesses;

			displayMarkers(response); //Added by Asha, keep this to send yelp response to map.js file

			for (let i = 0; i < results.length; i++) {
				const restaurantName = results[i].name;
				const restaurantDistance = results[i].distance;
				const restaurantPhone = results[i].phone;
				const restaurantRating = results[i].rating;
				const restaurantImg = $('<img>');
				restaurantImg.addClass('restaurant-img');
				$('#content-results').append(restaurantName);
				$('#content-results').append(restaurantDistance);
				$('#content-results').append(restaurantPhone);
				$('#content-results').append(restaurantRating);
				$('#content-results').append(restaurantImg);
			};
		})

		.catch(error => {
			console.error(error);
		});	

	});