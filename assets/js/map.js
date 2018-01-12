
let latitude = 40.730813;
let longitude = -74.065983;

let uluru = {
	lat: latitude, 
	lng: longitude
};

//get the Div of map view
let mapDiv = document.getElementById("map");

//initialize the map
function initMap() {

	let map = new google.maps.Map(mapDiv, {
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
