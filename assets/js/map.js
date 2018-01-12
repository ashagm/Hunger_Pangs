
let latitude = 40.730813;
let longitude = -74.065983;

let uluru = {
	lat: latitude, 
	lng: longitude
};

let numOfResults = 10;
//get the Div of map view
let map;
let mapDiv = document.getElementById("map");

//initialize the map
function initMap() {

	map = new google.maps.Map(mapDiv, {
	  zoom: 14,
	  center: uluru
	});

	var image = 'assets/images/rutgers-icon.jpg';

	var marker = new google.maps.Marker({
	  position: uluru,
	  title : "Your location",
	  map: map,
	  icon: image
	});

	getCoordinates(map);	

}


function getCoordinates(resultsMap){
	let address = localStorage.getItem('input-address');
	console.log('getCooridinates', address);

	var geocoder = new google.maps.Geocoder();

	 geocoder.geocode(
	 	{
	 		'address': address
	 	}, function(results, status) {
          if (status === 'OK') {
          	console.log(results[0]);
            resultsMap.setCenter(results[0].geometry.location);

            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
    });
}

function displayMarkers(yelpResponse){
	console.log('In displayMarkers', yelpResponse);

	$.each(yelpResponse, function(key, value){
		console.log("businesses", yelpResponse.businesses);

		for(let i=0; i< numOfResults; i++){
			var latitude_business = yelpResponse.businesses[i].coordinates.latitude;
			var longitude_business = yelpResponse.businesses[i].coordinates.longitude;
			// console.log(latitude_business, longitude_business);
			paintMarkers(latitude_business, longitude_business);
		}		
	});
}

function paintMarkers(latitude, longitude){
	console.log("in paint markers", latitude, longitude);
	// var map = new google.maps.Map(document.getElementById('map'), {
	// 	  zoom: 8,
	// 	  center: uluru
	// });

	var marker = new google.maps.Marker({
		map: map,
		position: {
			lat: latitude, 
			lng: longitude
		}
		// icon: {
		// 	url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
		// 	anchor: new google.maps.Point(10, 10),
		// 	scaledSize: new google.maps.Size(10, 17)
		// }
	});

}


