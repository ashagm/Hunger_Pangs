//get the Div of map view
let map;
let marker;
let infowindow;

//defualt values in case
let latitude = 40.730813;
let longitude = -74.065983;

let mapCenter;

let searchResultsList = [];
let mapCanvas = document.getElementById("map");

let inputAddress;
let numOfResults = 10;

//initialize the map
function initMap() {

	mapCenter = {
		lat: latitude, 
		lng: longitude
	};

	mapOptions = {
		zoom: 14,
		center: mapCenter
	}

	map = new google.maps.Map(mapCanvas, mapOptions);
}

//convert input address into lat/long and display on the map
function drawInitMap(){	

	initMap();
	inputAddress = localStorage.getItem('input-address');

	getLatLong(inputAddress, function(latlng){

		map.setCenter(
		{
			lat: latlng.latitude,
			lng: latlng.longitude
		});

		createMarker({
						lat: latlng.latitude,
						lng: latlng.longitude
					 }, 
					"YOU ARE HERE! @ " + inputAddress, 
					12, 
					'assets/images/home-icon-2.png',
					90, 
					google.maps.Animation.BOUNCE);

		});
}

//get points of yelp results
function displayMarkers(yelpResponse){

	console.log("**Yelp Results**", numOfResults, yelpResponse);

	for(let i = 0; i < numOfResults; i++){
		let latitude_business = yelpResponse[i].coordinates.latitude;
		let longitude_business = yelpResponse[i].coordinates.longitude;

		let infoText = yelpResponse[i].name +'--' + yelpResponse[i].price;

		createMarker(
			{
				lat: latitude_business, 
				lng: longitude_business
			},
			infoText			, 
			22, 
			'assets/images/food-icon-3.png', 
			80,
			google.maps.Animation.DROP);
												
	}		
}

//show markers with infowindows
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

    //on mouseover show info
    google.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.setContent("<p class='infotext'>" + txt + "</p>"); 
        infowindow.open(map, this);
    });

    //on mouseout remove info
    google.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close(map, this);
    });

    //on click, zoom in and time out after 3 secs
    google.maps.event.addListener(marker,'click',function() {
    	var pos = map.getZoom();
    	var center = map.getCenter();
    	map.setZoom(18);
    	map.setCenter(this.getPosition());
    	window.setTimeout(
    		function() {
    			map.setZoom(pos);
    			map.setCenter(center);
    		},3000);
  	});

    marker.setMap(map);
    marker.MyZoom = zoom; 
}

//zoom the map given a latitude and longitude
function zoomToLocation(latitude, longitude, zoom){
	var center = new google.maps.LatLng(latitude, longitude);
 	 map.setCenter(center);
 	 map.setZoom(zoom); 	 
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
