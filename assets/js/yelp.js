$(document).ready(function() {
	// Enter location - receive restuarant recommendations based on user input
	// See phone number, website, ratings
	// Integrate with Google maps using latitude/longitude inputs

	const userLocation = 
	const queryURL = "https://api.yelp.com/v3/businesses/search?location=" + userLocation;
	const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';

	$.ajax({
		url: proxyUrl + queryURL,
		headers: {
			authorization: 'Bearer ' + "OZscrgovCzS7QRiOySG6zhu4i9R9LMeQLYN-EtOXvZ8WdyiYup_NGlDDPq-50il_VHt1nd3QPmN0Oq8xW7JkvGuiucxkFmzqJ2Bmh6G7BghJIPIi0CBy3UxsZwJYWnYx"
		}
	})

	.done(response => {
		console.log(response);
	})

	.catch(error => {
		console.error(error);
	});

})	