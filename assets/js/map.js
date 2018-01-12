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

var geocoder;
var map;

function initialize() {
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(40.731102, -74.064569);
	var mapOptions = {
  		zoom: 8,
  		center: latlng
	}

	map = new google.maps.Map(mapDiv, mapOptions);
}

function codeAddress() {
var address = document.getElementById('address').value;
geocoder.geocode( { 'address': address}, function(results, status) {
  if (status == 'OK') {
    map.setCenter(results[0].geometry.location);
    var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
    });
  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }
});
}

