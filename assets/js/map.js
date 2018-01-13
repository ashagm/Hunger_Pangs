//get the Div of map view
let map;
let mapDiv = document.getElementById("map");

//defualt values in case
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

//zoom to the input location 
function drawInitMap(){

	let inputAddress = localStorage.getItem('input-address');

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

	for(let i = 0; i < numOfResults; i++){
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
		icon: 'assets/images/food-icon.png'
	});
}

function zoomToLocation(latitude, longitude){
	var center = new google.maps.LatLng(latitude, longitude);
 	 map.setCenter(center);
 	 map.setZoom(20);
}

function getLatLong(address){

	var latLongObj = {};
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode(
		{
		'address': address
		}, function(results, status) {
			if (status === 'OK') {
				return latLongObj ={
					latitude : results[0].geometry.location.lat(),
					longitude : results[0].geometry.location.lng()
				}
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
    });

}

function getAddress(latitude, longitude){

	var latlng = new google.maps.LatLng(latitude, longitude);
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log("results", results, results[0].formatted_address);
            return results[0].formatted_address;
        }else{
        	alert(status);
        }
    });
}

// function showDirection(origin, destination){
// 	var origin1 = new google.maps.LatLng(55.930385, -3.118425);
// 	var origin2 = 'Greenwich, England';
// 	var destinationA = 'Stockholm, Sweden';
// 	var destinationB = new google.maps.LatLng(50.087692, 14.421150);

// 	var service = new google.maps.DistanceMatrixService();
// 	service.getDistanceMatrix(
// 	{
// 		origins: [origin1, origin2],
// 		destinations: [destinationA, destinationB],
// 		travelMode: 'DRIVING',
// 		transitOptions: TransitOptions,
// 		drivingOptions: DrivingOptions,
// 		unitSystem: UnitSystem,
// 		avoidHighways: Boolean,
// 		avoidTolls: Boolean,
// 	}, callback);

// 	function callback(response, status) {
// 	// See Parsing the Results for
// 	// the basics of a callback function.
// 	}

// }

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
				newDiv.append("<p class='direction' data-lat =" + results[i].coordinates.latitude + " data-long=" + results[i].coordinates.longitude + ">Directions</p>");
				// newDiv.append(restaurantImg);
				newDiv.append("<br>")

				$('#content-results').append(newDiv);
			}

		}).catch(error => {
			console.error(error);
		});

	}



