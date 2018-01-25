function getWeather(){

	let inputAddress = localStorage.getItem("input-address");
	
	inputAddress = inputAddress.split(" ");
	let inputLength = inputAddress.length;
	let queryURL = "";
	// http://api.wunderground.com/api/YOUR_API_KEY/conditions/q/THE_DESIRED_STATE/THE_DESIRED_CITY.json
	
	if(inputLength > 2){
		queryURL = "https://api.wunderground.com/api/8df60d93e424fab6/conditions/q/" + inputAddress[2]  + "/" + inputAddress[0] + " "
		+ inputAddress[1] + ".json";
	}else if(inputLength == 2){
		queryURL = "https://api.wunderground.com/api/8df60d93e424fab6/conditions/q/" + inputAddress[1] + "/"
		+ inputAddress[0] + ".json";
	}else {
		queryURL = "https://api.wunderground.com/api/8df60d93e424fab6/conditions/q/" 
		+ inputAddress + ".json";
	}

	console.log("weather", encodeURI(queryURL));

	$.ajax({
		url : encodeURI(queryURL),				
		dataType : "jsonp",
		success : function(parsed_json) {
			console.log(parsed_json);
			// let location = parsed_json['location']['city'];
			let temp_f = parsed_json['current_observation']['temp_f'];
			// console.log("Current temperature in " + location + " is: " + temp_f);
			// console.log(parsed_json['current_observation']['icon']);
			let weather = "<span class='weather'><img src='" + parsed_json['current_observation']['icon_url'] + "'><br>" + temp_f + " °f</span>"
			$("#div-weather").html(weather);
		}
	});
 }