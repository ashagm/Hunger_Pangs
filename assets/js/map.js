//get the Div of map view
let map;
let mapDiv = document.getElementById("map");
let latitude = 40.730813;
let longitude = -74.065983;

let numOfResults = 10;

//initialize the map
function initMap() {

	let uluru = {
		lat: latitude, 
		lng: longitude
	};

	map = new google.maps.Map(mapDiv, {
		zoom: 12,
		center: uluru
	});
}

function drawInitMap(){

	let inputAddress = localStorage.getItem('input-address');
	// console.log('****drawInitMap****', inputAddress);

	let uluru = {
		lat: latitude, 
		lng: longitude
	};

	map = new google.maps.Map(mapDiv, {
		zoom: 14,
		center: uluru
	});

	var geocoder = new google.maps.Geocoder();

	geocoder.geocode(
		{
		'address': inputAddress
		}, function(results, status) {
			if (status === 'OK') {
				map.setCenter(results[0].geometry.location);

				var marker = new google.maps.Marker({
				  map: map,
				  position: results[0].geometry.location,
				  icon: 'assets/images/home-icon.png'
				});
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
    });

}

function displayMarkers(yelpResponse){
	// console.log('In displayMarkers', yelpResponse.businesses);

	for(let i=0; i< numOfResults; i++){
		var latitude_business = yelpResponse.businesses[i].coordinates.latitude;
		var longitude_business = yelpResponse.businesses[i].coordinates.longitude;

		paintMarker(latitude_business, longitude_business);
	}		
}

function paintMarker(latitude, longitude){
	// console.log("in paint markers", latitude, longitude);

	var marker = new google.maps.Marker({
		map: map,
		position: {
			lat: latitude, 
			lng: longitude
		},
		icon: 'assets/images/food-icon-1.png'
	});
}

function zoomToLocation(latitude, longitude){
	var center = new google.maps.LatLng(latitude, longitude);
 	 map.setCenter(center);
 	 map.setZoom(20);
}

//todo- delete later - only for yelp testing

function getYelpResults(){

		let userLocation = localStorage.getItem("input-address");
		const queryURL = "https://api.yelp.com/v3/businesses/search?location=" + userLocation + "&limit=10&radius=1610&term=food&open_now=true";
		const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';
		
		$.ajax({
			url: proxyUrl + queryURL,
			headers: {
				authorization: 'Bearer ' + "OZscrgovCzS7QRiOySG6zhu4i9R9LMeQLYN-EtOXvZ8WdyiYup_NGlDDPq-50il_VHt1nd3QPmN0Oq8xW7JkvGuiucxkFmzqJ2Bmh6G7BghJIPIi0CBy3UxsZwJYWnYx"
			}
		}).done(response => {
			displayMarkers(response); //Added by Asha, keep this to send yelp response to map.js file
			const results = response.businesses;

			for (let i = 0; i < 3; i++) {

				let newDiv = $('<div>');
				newDiv.css("background-color", "#000");
				newDiv.append("<h5>" + results[i].name + "</h5>");
				newDiv.append(results[i].distance);
				newDiv.append(results[i].phone);
				newDiv.append(results[i].rating);
				newDiv.append("<p class='direction' data-lat =" + results[i].coordinates.latitude + " data-long=" + results[i].coordinates.longitude + ">Location</p>");
		
				// newDiv.append(restaurantImg);
				newDiv.append("<br>")

				$('#content-results').append(newDiv);
			}

		}).catch(error => {
			console.error(error);
		});

	}



