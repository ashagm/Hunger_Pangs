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
	  zoom: 18,
	  center: uluru
	});

	var marker = new google.maps.Marker({
	  position: uluru,
	  title : "Your location",
	  map: map
	});

	var geocoder = new google.maps.Geocoder();

}
