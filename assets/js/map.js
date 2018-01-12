// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

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

	var image = 'assets/images/rutgers-icon.jpg';

	var marker = new google.maps.Marker({
	  position: uluru,
	  title : "Your location",
	  map: map,
	  icon: image
	});

	var geocoder = new google.maps.Geocoder();

}


function getCooridinates(){
	let address = localStorage.getItem('input-address');

}
