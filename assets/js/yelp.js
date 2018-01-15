	// Enter location - receive restuarant recommendations based on user input
	// See phone number, website, ratings
	// Integrate with Google maps using latitude/longitude inputs
	// ONLY places to eat, limit results to 10, within 1 mile of userLocation

function getYelpResults(){

	let userLocation = localStorage.getItem("input-address");
	const queryURL = "https://api.yelp.com/v3/businesses/search?location=" + userLocation + "&limit=10&radius=1610&term=food&open_now=true";
	const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';

	$('#content-results').empty();
	
	$.ajax({
		url: proxyUrl + queryURL,
		headers: {
			authorization: 'Bearer ' + yelpAPI
		}
	}).done(response => {
		displayMarkers(response); 
		const results = response.businesses;

		for (let i = 0; i < results.length; i++) {
			const restaurantName = results[i].name;
			const restaurantDistance = results[i].distance;
			const restaurantDistanceMiles = (restaurantDistance * 0.0006213).toFixed(2);
			const pDistance = $("<p>").text("Distance: " + restaurantDistanceMiles + " miles");
			const restaurantPhone = results[i].phone;
			// restaurantPhone.text((\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$);
			const pPhone = $("<p>").text("Phone: " + restaurantPhone);
			const restaurantRating = results[i].rating;
			const pRating = $("<p>").text("Yelp rating: " + restaurantRating);
			const restaurantImg = $('<img>');
			restaurantImg.addClass('restaurant-img');
			restaurantImg.attr("src", results[i].image_url);
			$('#content-results').append(restaurantName);
			$('#content-results').append(pDistance);
			$('#content-results').append(pPhone);
			$('#content-results').append(pRating);
			$('#content-results').append("<p class='direction' data-lat =" + results[i].coordinates.latitude + " data-long=" + results[i].coordinates.longitude + ">Get Directions!</p>");
			// $('#content-results').append(restaurantImg);
		};

	}).catch(error => {
		console.error(error);
	});

}


//code below commented out for now incase it is required again.

	// let userLocation;

	// $('#add-btn').on('click', function(event) {
	// 	event.preventDefault();		
	// 	let userLocation = $('#user-input').val().trim();
	// 	console.log(userLocation);

	// 	const queryURL = "https://api.yelp.com/v3/businesses/search?location=" + userLocation + "&limit=10&radius=1610&term=food&open_now=true";
	// 	const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';	
	// 	$('#content-results').empty();

	// 	$.ajax({
	// 		url: proxyUrl + queryURL,
	// 		headers: {
	// 		authorization: 'Bearer ' + yelpAPI
	// 	}
	// })

	// 	.done(response => {
	// 		console.log(response);
	// 		const results = response.businesses;

	// 		displayMarkers(response); //Added by Asha, keep this to send yelp response to map.js file

	// 		for (let i = 0; i < results.length; i++) {
	// 			const restaurantName = results[i].name;
	// 			const restaurantDistance = results[i].distance;
	// 			const restaurantDistanceMiles = (restaurantDistance * 0.0006213).toFixed(2);
	// 			const pDistance = $("<p>").text("Distance: " + restaurantDistanceMiles + " miles");
	// 			const restaurantPhone = results[i].phone;
	// 			const pPhone = $("<p>").text("Phone: " + restaurantPhone);
	// 			const restaurantRating = results[i].rating;
	// 			const pRating = $("<p>").text("Yelp rating: " + restaurantRating);
	// 			const restaurantImg = $('<img>');
	// 			restaurantImg.addClass('restaurant-img');
	// 			restaurantImg.attr("src", results[i].image_url);
	// 			$('#content-results').append(restaurantName);
	// 			$('#content-results').append(pDistance);
	// 			$('#content-results').append(pPhone);
	// 			$('#content-results').append(pRating);
	// 			// $('#content-results').append(restaurantImg);
	// 		};
	// 	})

	// 	.catch(error => {
	// 		console.error(error);
	// 	});	

	// });