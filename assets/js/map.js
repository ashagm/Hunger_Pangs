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
	console.log('****drawInitMap****', inputAddress);

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
	console.log('In displayMarkers', yelpResponse.businesses);

		for(let i=0; i< numOfResults; i++){
			var latitude_business = yelpResponse.businesses[i].coordinates.latitude;
			var longitude_business = yelpResponse.businesses[i].coordinates.longitude;

			paintMarker(latitude_business, longitude_business);
		}		
}

function paintMarker(latitude, longitude){
	console.log("in paint markers", latitude, longitude);

	var marker = new google.maps.Marker({
		map: map,
		position: {
			lat: latitude, 
			lng: longitude
		},
		icon: 'assets/images/food-icon-1.png'
	});

}


