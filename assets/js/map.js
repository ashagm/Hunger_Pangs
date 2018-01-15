//get the Div of map view
let map;
let marker;
let infowindow;
let mapCenter;
let mapCanvas = document.getElementById("map");

//defualt values in case
let latitude = 40.730813;
let longitude = -74.065983;

let numOfResults = 10;

//initialize the map
function initMap() {

	mapCenter = {
		lat: latitude, 
		lng: longitude
	};

	mapOptions = {
		zoom: 4,
		center: mapCenter
	}

	map = new google.maps.Map(mapCanvas, mapOptions);
}

//render map after an input value is entered
function drawInitMap(){

	let inputAddress = localStorage.getItem('input-address');

	mapCenter = {
		lat: latitude, 
		lng: longitude
	};

	mapOptions = {
		zoom: 14,
		center: mapCenter
	}

	map = new google.maps.Map(mapCanvas, mapOptions);

	var geocoder = new google.maps.Geocoder();

	geocoder.geocode(
		{
		'address': inputAddress
		}, function(results, status) {
			if (status === 'OK') {
				map.setCenter(results[0].geometry.location);
				createMarker(results[0].geometry.location, "YOU ARE HERE!", 12, 'assets/images/home-icon-2.png', 90, google.maps.Animation.BOUNCE);

			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
    });

}

//show points of yelp results
function displayMarkers(yelpResponse){

	console.log(yelpResponse.businesses);

	for(let i = 0; i < numOfResults; i++){
		var latitude_business = yelpResponse.businesses[i].coordinates.latitude;
		var longitude_business = yelpResponse.businesses[i].coordinates.longitude;

		// paintMarker(latitude_business, longitude_business);

		let infoText = yelpResponse.businesses[i].name +'--' + yelpResponse.businesses[i].price;

		createMarker(
			{
				lat: latitude_business, 
				lng: longitude_business
			},
			infoText
			, 
			22, 
			'assets/images/food-icon-3.png', 
			// yelpResponse.businesses[i].image_url,
			80,
			google.maps.Animation.DROP);
												
	}		
}

function createMarker(latlng, txt, zoom, image, size, anime) {

    infowindow = new google.maps.InfoWindow;

    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        animation: anime,
        icon: {
        	url: image,
        	scaledSize : new google.maps.Size(size, size),        	
        }
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent("<p class='infotext'>" + txt + "</p>"); 
        infowindow.open(map, this);
    });

    marker.setMap(map);
    marker.MyZoom = zoom; 
    // return marker; 
}

//zoom the map given a latitude and longitude
function zoomToLocation(latitude, longitude, zoom){
	var center = new google.maps.LatLng(latitude, longitude);
 	 map.setCenter(center);
 	 map.setZoom(zoom); 	 

 	 getAddress(latitude, longitude, function(address){
 	 	console.log("in zoomlocation" , address);
 	 });
}

//function to convert a given address to latitude and longitude
function getLatLong(address, callback){

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

    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        	callback(results[0].formatted_address);
        }else{
        	alert(status);
        }

    });
}

function paintMarker(latitude, longitude){
	console.log("in paint markers", latitude, longitude);
	marker = new google.maps.Marker({
		map: map,
		position: {
			lat: latitude, 
			lng: longitude
		},
		icon: {
			url : 'assets/images/food-icon-2.png',
			scaledSize : new google.maps.Size(70, 70)
		}
	});

}

function calculateTimeDistance(origin, destination){

	// console.log("**calculateTimeDistance**", origin, destination);

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

function drawRouteToDestination(destPoint){

	let destination = new google.maps.LatLng(destPoint.destLatitude,destPoint.longitude);

	getLatLong(localStorage.getItem('input-address'), function(response){
		console.log("drawRouteToDestination response", response.latitude);
		console.log("drawRouteToDestination response", response.longitude);

		var origin = new google.maps.LatLng(response.latitude, response.longitude);

		mapOptions = 
		{
			// center: origin, 
			zoom: 2
		};

		map = new google.maps.Map(mapCanvas,mapOptions);

		var flightPath = new google.maps.Polyline({
			path: [origin, destination],
			strokeColor: "#0000FF",
			strokeOpacity: 0.8,
			strokeWeight: 2
		});

		console.log(flightPath);

		flightPath.setMap(map)

		});

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



