//get the Div of map view
let map;
let uluru;
let mapDiv = document.getElementById("map");

//defualt values in case
let latitude = 40.730813;
let longitude = -74.065983;

let numOfResults = 10;

//initialize the map
function initMap() {

	uluru = {
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

	uluru = {
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

//zoom the map given a latitude and longitude
function zoomToLocation(latitude, longitude){
	var center = new google.maps.LatLng(latitude, longitude);
 	 map.setCenter(center);
 	 map.setZoom(18);
}

//function to convert a given address to latitude and longitude
function getLatLong(address, callback){

	// var latLongObj = {};
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode(
		{
		'address': address
		}, function(results, status) {
			if (status === 'OK') {
				callback(
					{
						latitude : results[0].geometry.location.lat(),
						longitude : results[0].geometry.location.lng()
					});
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
    });

}

//function to convert an address to latitude and longitude
function getAddress(latitude, longitude, callback){

	var latlng = new google.maps.LatLng(latitude, longitude);
    var geocoder = new google.maps.Geocoder();

    let address = "";

    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            address =  results[0].formatted_address;
            console.log("**getAddress**", address);
        	callback(address);
        }else{
        	alert(status);
        }

    });
}

function calculateTimeDistance(origin, destination){

	console.log("**calculateTimeDistance**", origin, destination);

	var service = new google.maps.DistanceMatrixService();
	
	service.getDistanceMatrix(
	{
		origins: [origin],
		destinations: [destination],
		travelMode: google.maps.TravelMode.WALKING,
		unitSystem: google.maps.UnitSystem.IMPERIAL,
		avoidHighways: true,
		avoidTolls: true,
	}, callback);

	function callback(response, status) {
		console.log('**calculateTimeDistance-response**', status, response);

		return {
			duration : response.rows[0].elements[0].duration.text,
			distance : response.rows[0].elements[0].distance.text
		}
	}

}

//todo- delete later - only for yelp testing
// function getYelpResults(){

// 		let userLocation = localStorage.getItem("input-address");
// 		const queryURL = "https://api.yelp.com/v3/businesses/search?location=" + userLocation + "&limit=10&radius=1610&term=food&open_now=true";
// 		const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';
		
// 		$.ajax({
// 			url: proxyUrl + queryURL,
// 			headers: {
// 				authorization: 'Bearer ' + yelpAPI
// 			}
// 		}).done(response => {
// 			displayMarkers(response); //Added by Asha, keep this to send yelp response to map.js file
// 			const results = response.businesses;

// 			for (let i = 0; i < 3; i++) {
// 				let newDiv = $('<div>');
// 				newDiv.css("background-color", "#000");
// 				newDiv.append("<h5>" + results[i].name + "</h5>");
// 				newDiv.append(results[i].distance);
// 				newDiv.append(results[i].phone);
// 				newDiv.append(results[i].rating);
// 				newDiv.append("<p class='direction' data-lat =" + results[i].coordinates.latitude + " data-long=" + results[i].coordinates.longitude + ">Location</p>");
// 				newDiv.append("<p class='direction' data-lat =" + results[i].coordinates.latitude + " data-long=" + results[i].coordinates.longitude + ">Directions</p>");
// 				// newDiv.append(restaurantImg);
// 				newDiv.append("<br>")

// 				$('#content-results').append(newDiv);
// 			}

// 		}).catch(error => {
// 			console.error(error);
// 		});

// 	}



