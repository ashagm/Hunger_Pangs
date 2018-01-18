// //Route Display 

function calcRoute() {
		start = directionsLatLng
		end = "161 Newkirk Street, Jersey City, NJ 07306"
	let request = {
		origin: start,
		destination: end,
		travelmode: google.maps.travelmode.TRANSIT
	};


function getDirectionsLocation() {
	//console.log("getDirectionsLocation");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showDirectionsPosition);
	} else {
		z.innerHTML = "Geolocation is not supported by this browser.";

	}
}
	directionsService.route(request, function(result, status){
		if(status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
		});
}
$("#.btn-direction").on("click", function(event) {
	pDistance();

})

// let directionsDisplay;
// let directionsService = new google.maps.DirectionsService();
// let directionsMap;
// const z = document.getElementByID("Get Directions!");
// let start;


// function showDirectionsPosition(position) {
// 	console.log("showMapPosition");
// 		directionsLatitiude = position.coords.latitude;
// 		directionsLongitude = position.coords.longitude;
// 		directionsLatLng = new google.maps.LatLng(directionsLatitude, directionsLongitude);
// 	getDirections();
// // }
// function getAddress() {
// 	console.log('getAddress')
// 		directionsDisplay = new google.maps.DirectionsRenderer();
		
// 		let directionsOptions = {
// 			zoom: 12,
// 			center: start
// 		}
// 		directionsMap = new google.maps.Map(document.getElementById("directions-canvas"), directionsOptions);
// 		directionsDisplay.setMap(directionsMap);
// }

