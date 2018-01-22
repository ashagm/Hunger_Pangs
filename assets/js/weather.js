function getWeather(){

	let inputAddress = localStorage.getItem("input-address");
	let queryURL = "http://api.wunderground.com/api/8df60d93e424fab6/geolookup/conditions/q/" + inputAddress + ".json";

	$.ajax({
		url : queryURL,				
		dataType : "jsonp",
		success : function(parsed_json) {
			let location = parsed_json['location']['city'];
			let temp_f = parsed_json['current_observation']['temp_f'];
			// console.log("Current temperature in " + location + " is: " + temp_f);
			// console.log(parsed_json['current_observation']['icon']);
			let weather = "<span class='weather'><img src='" + parsed_json['current_observation']['icon_url'] + "'><br>" + temp_f + " °f</span>"
			$("#div-weather").html(weather);
		}
	});
 }